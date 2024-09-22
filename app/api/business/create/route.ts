import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@/lib/auth';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  console.log("POST /api/business/create called");
  try {
    const body = await request.json();
    console.log("Request body:", JSON.stringify(body, null, 2));

    const { businessName, password, businessAddress, businessPhone, businessHours, agentName, userId } = body;

    console.log("Checking if user already has a business");
    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(userId, 10) },
      include: { business: true },
    });
    console.log("Existing user:", JSON.stringify(existingUser, null, 2));

    if (existingUser?.business) {
      console.log("User already has a business");
      return NextResponse.json({ error: 'User already has a business' }, { status: 400 });
    }

    const hashedPassword = hashPassword(password);
    const businessId = randomUUID();

    console.log("Creating new business");
    const business = await prisma.business.create({
      data: {
        id: businessId,
        businessname: businessName,
        password: hashedPassword,
        businessaddress: businessAddress,
        businessphone: businessPhone,
        businesshours: businessHours,
        agentname: agentName,
        User: {
          connect: { id: parseInt(userId, 10) }
        }
      },
    });
    console.log("Business created:", JSON.stringify(business, null, 2));

    console.log("Updating user");
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId, 10) },
      data: { haschosenbusiness: true, associatedbusiness: businessId },
    });
    console.log("User updated:", JSON.stringify(updatedUser, null, 2));

    return NextResponse.json({ success: true, businessId });
  } catch (error) {
    console.error('Error creating business:', error);
    return NextResponse.json({ error: 'Failed to create business' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}