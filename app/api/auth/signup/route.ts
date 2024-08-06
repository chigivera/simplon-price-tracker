// api/auth/route.ts
import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export default async function handler(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      const { email, password }: { email: string; password: string } =
        await req.json(); // Parse JSON body

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user in the database
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword // Store the hashed password
        }
      });

      return NextResponse.json(user, { status: 201 }); // Return the created user
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: 'User creation failed' },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { error: `Method ${req.method} Not Allowed` },
      { status: 405, headers: { Allow: 'POST' } }
    );
  }
}
