import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import { getSupabase } from "@/lib/supabase-server";

const signupSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(20),
  fullName: z.string().min(2),
  password: z.string().min(6),
  phone: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const { email, username, fullName, password, phone } = signupSchema.parse(body);

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase connection not configured" },
        { status: 500 }
      );
    }
    
    // Check if user already exists in Supabase
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("id, email, username")
      .or(`email.eq.${email},username.eq.${username}`)
      .single();
    
    if (existingUser) {
      const field = existingUser.email === email ? "email" : "username";
      return NextResponse.json(
        { error: `User with this ${field} already exists` },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    const insertData = {
      email,
      username,
      password_hash: hashedPassword,
      display_name: fullName,
      role: 'user'
    };
    // Create new user in Supabase 'users' table
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert(insertData)
      .select()
      .single();
    
    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to create user in database" },
        { status: 500 }
      );
    }

    // Return user data formatted for frontend
    const userResponse = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      fullName: newUser.display_name,
      role: newUser.role,
      createdAt: newUser.created_at
    };
    
    return NextResponse.json({
      message: "Signup successful",
      user: userResponse
    });

  } catch (error) {
    console.error("Signup error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

