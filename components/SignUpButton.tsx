import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SignUpButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return null; // If user is authenticated, do not show Sign Up button
  }

  return (
    <Link
      href="/signup"
      className="py-2 px-3 flex rounded-md no-underline text-white bg-gray-700 hover:bg-gray-500"
    >
      Sign Up
    </Link>
  );
}
