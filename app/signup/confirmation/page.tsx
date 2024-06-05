import DeployButton from "@/components/DeployButton";
import Link from "next/link";

export default function Confirmation() {
  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <DeployButton />
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center mt-32 px-8">
        <h1 className="text-2xl font-bold mb-2">Registration Successful!</h1>
        <p className="text-md mb-4">
          Check your email to complete the process.
        </p>
        <Link href="/" className="text-blue-500 hover:underline">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
