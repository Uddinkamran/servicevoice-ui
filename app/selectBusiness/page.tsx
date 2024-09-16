import { auth } from "@/auth";
import { PrismaClient } from '@prisma/client';
import BusinessSelectionComponent from "@/components/BusinessSelectionComponent";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function SelectBusinessPage() {
  const session = await auth();

  if (!session) {
    // If there's no session, redirect to login
    return redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(session.user?.id || '', 10) },
    select: { associatedBusiness: true, hasChosenBusiness: true }
  });

  if (!user) {
    return redirect("/login");
  }

  if (user.hasChosenBusiness && user.associatedBusiness) {
    return redirect("/dashboard");
  }

  // Disconnect the prisma client
  await prisma.$disconnect();

  // Pass user data to the Client Component
  return <BusinessSelectionComponent />;
}