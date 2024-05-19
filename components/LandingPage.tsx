import Link from "next/link";
import { JSX, SVGProps } from "react";
import ServiceVoiceLogoBlue from "./ServiceVoiceLogoBlue";
import ServiceVoiceLogoDark from "./ServiceVoiceLogoDark";

export function LandingPage() {
  return (
    <>
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 lg:py-16 xl:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-900 dark:text-gray-50">
                  Take Control of Your Voice Assistant
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  ServiceVoice is the ultimate AI Voice Assistant control panel
                  for your business. Customize, monitor, and optimize your voice
                  experience.
                </p>
              </div>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="/dashboard"
              >
                Take me to the Dashboard
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <MicIcon className="h-12 w-12 text-gray-900 dark:text-gray-50" />
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                    Advanced Features
                  </h3>
                  <p className="max-w-[400px] text-gray-500 dark:text-gray-400">
                    Enjoy lifelike sound, seamless interruptions, and calendar
                    integration for a truly intelligent voice assistant
                    experience.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <GaugeIcon className="h-12 w-12 text-gray-900 dark:text-gray-50" />
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                    Customization
                  </h3>
                  <p className="max-w-[400px] text-gray-500 dark:text-gray-400">
                    Tailor your voice assistant to your brand and customer
                    needs. Adjust the voice, tone, and personality to create a
                    unique experience.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <PieChartIcon className="h-12 w-12 text-gray-900 dark:text-gray-50" />
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                    Monitoring
                  </h3>
                  <p className="max-w-[400px] text-gray-500 dark:text-gray-400">
                    Track the performance and usage of your voice assistant with
                    detailed analytics. Gain insights to optimize your
                    conversational experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 ServiceVoice. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-900 dark:text-gray-50"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-900 dark:text-gray-50"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </>
  );
}

function GaugeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}

function OptionIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3h6l6 18h6" />
      <path d="M14 3h7" />
    </svg>
  );
}

function MicIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function PieChartIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  );
}
