// api/auth/[...nextauth]/route.ts
import { handlers } from '@/auth';
import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export const { GET, POST } = handlers;
