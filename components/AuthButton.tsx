import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        Hey, {user.email}!
        <form action={signOut}>
          <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
            Logout
          </button>
        </form>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline  text-white bg-blue-600 hover:bg-blue-500"
    >
      Login
    </Link>
  );
}
