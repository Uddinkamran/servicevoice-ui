import { auth } from "@/auth";
import { PrismaClient } from '@prisma/client';
import DashboardClient from "@/components/DashboardClient"; // Client Component
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export default async function DashboardPage() {
  let redirectPath: string | null = null;

  try {
    console.log("Starting DashboardPage function");

    // Handle authentication
    const session = await auth();
    if (!session) {
      console.log("No session, redirecting to login");
      redirectPath = "/login";
      return;
    }

    // Fetch user data
    const user = await prisma.user.findUnique({
      where: { id: parseInt(session.user?.id || '', 10) },
      select: { associatedbusiness: true, haschosenbusiness: true }
    });

    if (!user) {
      redirectPath = "/login";
      return;
    }

    // Redirect if no business has been chosen
    if (!user.haschosenbusiness || !user.associatedbusiness) {
      console.log("User hasn't chosen a business, redirecting to selectBusiness");
      redirectPath = "/selectBusiness";
      return;
    }

    // Fetch business data
    const businessData = await prisma.business.findUnique({
      where: { id: user.associatedbusiness },
    });

    // Pass fetched business data to the Client Component
    return <DashboardClient businessData={businessData} />;

  } catch (error) {
    console.error("Error in DashboardPage:", error);
    redirectPath = "/";
    return;
  } finally {
    if (redirectPath) {
      redirect(redirectPath);
    }

    await prisma.$disconnect();
  }
}