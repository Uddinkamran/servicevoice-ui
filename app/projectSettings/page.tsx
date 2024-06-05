import { createClient } from "@/utils/supabase/server";

export default async function ProjectSettings() {
  const supabase = createClient();
  const { data: projectSettings } = await supabase.from("Business").select("*");


  return <pre>{JSON.stringify(projectSettings, null, 2)}</pre>;
}
