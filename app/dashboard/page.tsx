import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Dashboard } from "@/components/Dashboard";
import { SupabaseClient } from "@supabase/supabase-js";

interface BusinessData {
  id: number;
  businessName: string;
  businessAddress: string;
  agentName: string;
  agentVoice: string;
  businessPhone: string | null;
  callsConnected: number | null;
  scheduledAppointments: number | null;
  canceledAppointments: number | null;
  rescheduledCalls: number | null;
  ROI: number | null;
  businessHours: string | null;
}

export default async function ProtectedPage() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: userBusinessData, error: userBusinessError } = await supabase
    .from("User")
    .select("associatedBusiness, hasChosenBusiness")
    .eq("id", user.id)
    .single();

  if (userBusinessError || !userBusinessData) {
    console.error("Error fetching user's associated business:", userBusinessError);
    return redirect("/error");
  }

  if (!userBusinessData.hasChosenBusiness) {
    return redirect("/selectBusiness");
  }

  const businessId = userBusinessData.associatedBusiness;

  const projectData = await fetchBusinessData(supabase, businessId);

  if (projectData.error) {
    console.error("Error fetching business data:", projectData.error);
    return redirect("/error");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-0 items-center">
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-8xl flex justify-between items-center px-10 text-sm">
            <DeployButton />
            <AuthButton />
          </div>
        </nav>
      </div>

      <Dashboard data={projectData.businessData[0]}></Dashboard>
    </div>
  );
}

async function fetchBusinessData(supabaseClient: SupabaseClient<any, "public", any>, businessId: number) {
  let { data: businessData, error } = await supabaseClient
    .from("Business")
    .select("*")
    .eq("id", businessId);

  if (error) {
    console.error("Error fetching business data:", error);
    return { error };
  }
  return { businessData };
}
