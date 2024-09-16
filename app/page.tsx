import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { LandingPage } from "@/components/LandingPage";
import ServiceVoiceLogoBlue from "@/components/ServiceVoiceLogoBlue";
import ServiceVoiceLogoDark from "@/components/ServiceVoiceLogoDark";
import SignUpButton from "@/components/SignUpButton";

export default async function Index() {
  

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <DeployButton />
          <div className="flex gap-4">
            <SignUpButton />
            <AuthButton />
          </div> 
        </div>
      </nav>

      <div >
        <LandingPage></LandingPage>
      </div>

    </div>
  );
}
