import { createClient } from '@/utils/supabase/server';

export default async function ProjectSettings() {
  const supabase = createClient();
  const { data: projectSettings } = await supabase.from('projectsettings').select();

const { data, error } = await supabase
.from('projectsettings')
.select('*')
  console.log(projectSettings)

  return <pre>{JSON.stringify(projectSettings, null, 2)}</pre>
}