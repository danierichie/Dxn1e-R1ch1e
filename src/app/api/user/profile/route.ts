import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// In-memory database (in production, use a real database)
const users: any[] = [];

const updateProfileSchema = z.object({
  fullName: z.string().min(2).optional(),
  username: z.string().min(3).max(20).optional(),
  phone: z.string().optional(),
  avatar: z.string().optional(),
});

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const updateData = updateProfileSchema.parse(body);

    // In a real app, you'd get the user ID from the session/JWT token
    // For now, we'll use a mock user ID
    const userId = "1"; // This should come from authentication

    // Find and update user
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if username is already taken (if updating username)
    if (updateData.username) {
      const existingUser = users.find(u => u.username === updateData.username && u.id !== userId);
      if (existingUser) {
        return NextResponse.json(
          { error: "Username already taken" },
          { status: 409 }
        );
      }
    }

    // Update user
    users[userIndex] = {
      ...users[userIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    // Return updated user data (without password)
    const { password: _, ...userWithoutPassword } = users[userIndex];
    
    return NextResponse.json({
      message: "Profile updated successfully",
      user: userWithoutPassword
    });

  } catch (error) {
    console.error("Profile update error:", error);
    
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

export async function GET(request: NextRequest) {
  try {
    // In a real app, you'd get the user ID from the session/JWT token
    const userId = "1"; // This should come from authentication

    // Find user
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      user: userWithoutPassword
    });

  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
