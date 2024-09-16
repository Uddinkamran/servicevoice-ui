"use client";

import { signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        Hey, {session.user?.email}!
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
        >
          Logout
        </button>
      </div>
    );
  }

  return null;
}
