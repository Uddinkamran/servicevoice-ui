import Link from "next/link";
import { auth } from "@/auth";

export default async function SignUpButton() {
  const session = await auth();

  if (session) {
    return null; // If user is authenticated, do not show Sign Up button
  }

  return (
    <Link
      href="/signup"
      className="py-2 px-3 flex rounded-md no-underline text-white bg-gray-700 hover:bg-gray-500"
    >
      Sign Up / Login
    </Link>
  );
}
