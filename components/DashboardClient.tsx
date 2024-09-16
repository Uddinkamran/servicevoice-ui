'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Dashboard } from "@/components/Dashboard";

export default function DashboardClient({ businessData }: { businessData: any }) {
  const router = useRouter();

  useEffect(() => {
    if (!businessData) {
      console.log("No business data, redirecting to selectBusiness");
      router.push("/selectBusiness");
    }
  }, [businessData, router]);

  if (!businessData) {
    return <div>Loading...</div>;
  }

  return <Dashboard data={businessData} />;
}
