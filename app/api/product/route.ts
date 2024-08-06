import { NextResponse } from 'next/server';
import sendEmail from '../../../lib/send-email'; // Adjust the import based on your structure
import prisma from '@/lib/db';

export async function POST(req: Request) {
  const { url, currentPrice, lowestPrice, percentDrop } = await req.json();

  try {
    // Check if the product already exists
    const existingProduct = await prisma.product.findUnique({
      where: { url }
    });

    let product;
    let emailSubject: string;
    let emailText: string;

    if (existingProduct && lowestPrice < existingProduct.lowestPrice) {
      // If the product exists, check if the new lowest price is lower

      product = await prisma.product.update({
        where: { url },
        data: {
          currentPrice,
          lowestPrice,
          percentDrop
        }
      });
      emailSubject = 'Product Price Lowered';
      emailText = `The product price has been lowered:\nURL: ${url}\nCurrent Price: ${currentPrice}\nLowest Price: ${lowestPrice}\nPercent Drop: ${percentDrop}`;
    } else {
      // If the product does not exist, create a new one
      product = await prisma.product.create({
        data: {
          url,
          currentPrice,
          lowestPrice,
          percentDrop
        }
      });
      emailSubject = 'New Product Added';
      emailText = `A new product has been added:\nURL: ${url}\nCurrent Price: ${currentPrice}\nLowest Price: ${lowestPrice}\nPercent Drop: ${percentDrop}`;
    }

    // Send email
    await sendEmail('recipient@example.com', emailSubject, emailText); // Change to the user's email

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('Error processing product:', error); // Log the error
    return NextResponse.json(
      { error: 'Error processing product', details: error.message },
      { status: 500 }
    );
  }
}
