import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyPassword } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  console.log("POST /api/business/join called");
  try {
    const body = await request.json();
    console.log("Request body:", JSON.stringify(body, null, 2));

    const { businessName, password, userId } = body;

    console.log("Finding business");
    const business = await prisma.business.findFirst({
      where: { businessName }
    });
    console.log("Business found:", JSON.stringify(business, null, 2));

    if (!business || !business.password) {
      console.log("Business not found or invalid password");
      return NextResponse.json({ message: "Business not found or invalid password" }, { status: 400 });
    }

    console.log("Provided password:", password);
    console.log("Stored hashed password:", business.password);
    const passwordMatch = verifyPassword(password, business.password);
    console.log("Password match:", passwordMatch);

    if (!passwordMatch) {
      console.log("Invalid password");
      return NextResponse.json({ message: "Invalid password" }, { status: 400 });
    }

    console.log("Updating user");
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId, 10) },
      data: { hasChosenBusiness: true, associatedBusiness: business.id }
    });
    console.log("User updated:", JSON.stringify(updatedUser, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error joining business:', error);
    return NextResponse.json({ message: "Error joining business" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}