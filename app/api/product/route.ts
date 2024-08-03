import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { url, currentPrice, lowestPrice, percentDrop, userId } =
    await req.json();

  try {
    const product = await prisma.product.create({
      data: {
        url,
        currentPrice,
        lowestPrice,
        percentDrop
      }
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error); // Log the error
    return NextResponse.json(
      { error: 'Error creating product', details: error.message },
      { status: 500 }
    );
  }
}
