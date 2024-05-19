import { createClient } from "@/utils/supabase/server";
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, updates } = body;
    const supabase = createClient();

    console.log(id)
    console.log(updates)

    const { data, error } = await supabase
      .from("projectsettings")
      .update(updates)
      .eq('id', id)
      .select();


    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update" },
      {
        status: 500,
      }
    );
  }
}
