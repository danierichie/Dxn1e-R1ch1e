import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";

// File-based storage
const USERS_FILE = join(process.cwd(), 'data', 'users.json');

const getUsers = () => {
  try {
    if (existsSync(USERS_FILE)) {
      const data = readFileSync(USERS_FILE, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
};

const saveUsers = (users: any[]) => {
  try {
    const dataDir = join(process.cwd(), 'data');
    if (!existsSync(dataDir)) {
      // Create data directory if it doesn't exist
      require('fs').mkdirSync(dataDir, { recursive: true });
    }
    writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error saving users file:', error);
  }
};

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

    // Get users from file storage
    const users = getUsers();
    
    // Check if user already exists
    const existingUser = users.find((u: any) => u.email === email || u.username === username);
    
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email or username already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      username,
      fullName,
      phone: phone || "",
      password: hashedPassword,
      avatar: "",
      isVerified: false,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    // Save user to file
    users.push(newUser);
    saveUsers(users);

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = newUser;
    
    return NextResponse.json({
      message: "Signup successful",
      user: userWithoutPassword
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
