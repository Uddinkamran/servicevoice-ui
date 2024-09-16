import { PrismaClient } from '@prisma/client';
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function ProjectSettings() {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(session.user?.id || '', 10) },
      select: { associatedBusiness: true }
    });

    if (!user || !user.associatedBusiness) {
      return <div>No associated business found</div>;
    }

    const projectSettings = await prisma.business.findUnique({
      where: { id: user.associatedBusiness },
    });

    
    return <pre>{JSON.stringify(projectSettings, null, 2)}</pre>;
  } catch (error) {
    console.error("Error fetching project settings:", error);
    return <div>Error fetching project settings</div>;
  } finally {
    await prisma.$disconnect();
  }
}
