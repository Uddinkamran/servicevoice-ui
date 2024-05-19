import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
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

  const projectData = await fetchBusinessData(supabase)

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
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

      <Dashboard data = {projectData.businessData}></Dashboard>

    </div>
  );
}


async function fetchBusinessData(supabaseClient: SupabaseClient<any, "public", any>) {
  let { data: businessData, error } = await supabaseClient
    .from("projectsettings") 
    .select("*");

  if (error) {
    console.error("Error fetching business data:", error);
    return { error };
  }
  return { businessData: businessData![1] };
}
