import { signIn } from "@/auth"
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const handleSignIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;

    const result = await signIn("resend", {
      email,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (result?.error) {
      return redirect("/login?message=Could not send login link");
    }

    return redirect("/verify-request");
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <SubmitButton
          formAction={handleSignIn}
          className="bg-blue-500 rounded-md px-4 py-2 text-foreground mb-2 text-white"
          pendingText="Sending Login Link..."
        >
          Send Login Link
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
