import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { z } from "zod";
import { getSupabase } from "@/lib/supabase-server";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const { email, password } = loginSchema.parse(body);

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase connection not configured" },
        { status: 500 }
      );
    }
    
    // Find user by email in Supabase
    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();
    
    if (!user || fetchError) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await compare(password, user.password_hash);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Note: Schema doesn't have last_login column yet, so skipping update for now.
    // If you want to track last login, we should add that column to the users table.

    // Return user data formatted for frontend
    const userResponse = {
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.display_name,
      role: user.role,
      createdAt: user.created_at
    };
    
    return NextResponse.json({
      message: "Login successful",
      user: userResponse
    });

  } catch (error) {
    console.error("Login error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

