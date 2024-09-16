import { signOut } from "next-auth/react";
import DeployButton from "./DeployButton";

export default function DashboardHeader() {
  return (
    <header className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-8xl flex justify-between items-center px-12 text-sm">
        <DeployButton />
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
        >
          Logout
        </button>
      </div>
    </header>
  );
}