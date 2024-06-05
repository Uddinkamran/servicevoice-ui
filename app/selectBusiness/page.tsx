"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BusinessSelectionComponent from "@/components/BusinessSelectionComponent";
import DeployButton from "@/components/DeployButton";
import { createClient } from "@/utils/supabase/client";

export default function SelectBusinessPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUserBusinessChoice = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: userData, error } = await supabase
        .from("User")
        .select("hasChosenBusiness")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
        return;
      }

      if (userData?.hasChosenBusiness) {
        router.push("/dashboard");
      } else {
        setLoading(false);
      }
    };

    checkUserBusinessChoice();
  }, [router, supabase]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <DeployButton />
        </div>
      </nav>

      <div className="min-h-screen flex flex-col items-center mt-16">
        <BusinessSelectionComponent />
      </div>
    </div>
  );
}
