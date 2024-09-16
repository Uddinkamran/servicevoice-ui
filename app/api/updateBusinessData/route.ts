import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, updates } = body;

    const updatedBusiness = await prisma.business.update({
      where: { id: id },
      data: updates,
    });

    return NextResponse.json(updatedBusiness, { status: 200 });
  } catch (error) {
    console.error("Failed to update business:", error);
    return NextResponse.json(
      { error: "Failed to update" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
