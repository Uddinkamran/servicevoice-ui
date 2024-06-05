"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { JSX, SVGProps } from "react";

interface BusinessData {
  id: number;
  businessName: string;
  businessAddress: string;
  agentName: string;
  agentVoice: string;
  businessPhone: string | null;
  callsConnected: number | null;
  scheduledAppointments: number | null;
  canceledAppointments: number | null;
  rescheduledCalls: number | null;
  ROI: number | null;
  businessHours: string | null;
}

interface DashboardProps {
  data: BusinessData[] | undefined;
}

export function Dashboard({ data }: DashboardProps | any) {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.includes("auth-token")); // Adjust according to your cookie name pattern

    if (token) {
      setIsLoggedIn(true);
      console.log("Logged in");
    } else {
      setIsLoggedIn(false);
      console.log("Not logged in");
    }
  };

  useEffect(() => {
    checkLoginStatus(); // Check login status on component mount
  }, []);

  const handleLogin = () => {
    checkLoginStatus(); // Check login status on login button click
    window.location.href = "https://alexirx-plmvtyamya-uc.a.run.app"; // Redirect to the Google login page
  };

  const handleSave = async () => {
    setIsBusinessInfoEditable(false);
    setIsAgentEditable(false);
    setIsPhoneEditable(false);

    const updates = {
      businessName: businessName,
      businessAddress: businessAddress,
      businessHours: businessHours,
      businessPhone: businessPhone,
      agentName: agentName,
    };

    try {
      const response = await fetch("api/updateBusinessData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data.id,
          updates: updates,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const result = await response.json();
      console.log("Save successful:", result);
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const [isBusinessInfoEditable, setIsBusinessInfoEditable] = useState(false);

  const [businessName, setBusinessName] = useState(
    data?.businessName || "Business Name"
  );
  const [businessAddress, setBusinessAddress] = useState(
    data?.businessAddress || "1234 Default Address"
  );
  const [businessHours, setBusinessHours] = useState(
    data?.businessHours || "9 AM - 5 PM every working day"
  );

  const [isAgentEditable, setIsAgentEditable] = useState(false);
  const [agentName, setAgentName] = useState(data?.agentName || "Ellie");
  const [agentVoice, setAgentVoice] = useState(
    data?.agentVoice || "ElevenLabs (Alice)"
  );

  const [isPhoneEditable, setIsPhoneEditable] = useState(false);
  const [businessPhone, setBusinessPhone] = useState(
    data?.businessPhone || "+1 413 1391 1333"
  );

  const [callsConnected, setCallsConnected] = useState(
    data?.callsConnected
  );

  const [scheduledAppointments, setScheduledAppointments] = useState(
    data?.scheduledAppointments 
  );

  const [canceledAppointments, setCanceledAppointments] = useState(
    data?.canceledAppointments 
  );

  const [rescheduledCalls, setRescheduledCalls] = useState(
    data?.rescheduledCalls 
  );

  const [ROI, setROI] = useState(data?.ROI );

  return (
    <section key="1" className="w-full min-h-screen">
      <main className="flex flex-col gap-2 p-4 md:gap-6 md:p-10">
        <div className="">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Using ServiceVoice, you were able to reach the following
                numbers:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">
                      Calls Connected
                    </CardTitle>
                    <PhoneCallIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{callsConnected}</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {/* +13.5% from last month */}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">
                      Scheduled Appointments
                    </CardTitle>
                    <CalendarCheckIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {scheduledAppointments}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {/* +9.7% from last month */}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">
                      Canceled Appointments
                    </CardTitle>
                    <CalendarXIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {canceledAppointments}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {/* -4.1% from last month */}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">
                      Rescheduled Calls
                    </CardTitle>
                    <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{rescheduledCalls}</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {/* +6.2% from last month */}
                    </p>
                  </CardContent>
                </Card>
                <Card className="w-full">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">
                      Return on Investment
                    </CardTitle>
                    <DollarSignIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${ROI}</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {/* +20.5% from last month */}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
        <section className="Settings">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Business Information
                </CardTitle>
                <BuildingIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4">
                  <Input
                    disabled={!isBusinessInfoEditable}
                    value={businessName}
                    placeholder="Business Name"
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                  <Input
                    disabled={!isBusinessInfoEditable}
                    value={businessAddress}
                    placeholder="Business Address"
                    onChange={(e) => setBusinessAddress(e.target.value)}
                  />
                  <Input
                    disabled={!isBusinessInfoEditable}
                    value={businessHours}
                    onChange={(e) => setBusinessHours(e.target.value)}
                    placeholder="Business Hours"
                  />
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={handleSave}
                      disabled={!isBusinessInfoEditable}
                    >
                      Save
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsBusinessInfoEditable(true)}
                      disabled={isBusinessInfoEditable}
                    >
                      Edit
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Agent Information
                </CardTitle>
                <PersonStandingIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4">
                  <Input
                    disabled={!isAgentEditable}
                    value={agentName}
                    placeholder="Agent Name"
                    onChange={(e) => setAgentName(e.target.value)}
                  />
                  <div className="relative">
                    <Select disabled>
                      <SelectTrigger className="text-gray-500 dark:text-gray-400">
                        <SelectValue placeholder="ElevenLabs (Alice)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem disabled value={"Hello"}>
                          Voice
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={handleSave}
                      disabled={!isAgentEditable}
                    >
                      Save
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAgentEditable(true)}
                      disabled={isAgentEditable}
                    >
                      Edit
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Business Phone (Forwarding)
                </CardTitle>
                <PhoneIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4">
                  <Input
                    disabled={!isPhoneEditable}
                    value={businessPhone}
                    onChange={(e) => setBusinessPhone(e.target.value)}
                    placeholder="Business Phone"
                  />
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={handleSave}
                      disabled={!isPhoneEditable}
                    >
                      Save
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsPhoneEditable(true)}
                      disabled={isPhoneEditable}
                    >
                      Edit
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Google Calendar Integration
                </CardTitle>
                <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4">
                  {isLoggedIn ? (
                    <p>You are already logged in</p>
                  ) : (
                    <Button onClick={handleLogin}>Log in with Google</Button>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </section>
  );
}

function BuildingIcon(
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
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function CalendarCheckIcon(
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  );
}

function CalendarIcon(
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function CalendarXIcon(
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="m14 14-4 4" />
      <path d="m10 14 4 4" />
    </svg>
  );
}

function DollarSignIcon(
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
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function LayoutDashboardIcon(
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
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}

function PersonStandingIcon(
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
      <circle cx="12" cy="5" r="1" />
      <path d="m9 20 3-6 3 6" />
      <path d="m6 8 6 2 6-2" />
      <path d="M12 10v4" />
    </svg>
  );
}

function PhoneCallIcon(
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      <path d="M14.05 2a9 9 0 0 1 8 7.94" />
      <path d="M14.05 6A5 5 0 0 1 18 10" />
    </svg>
  );
}

function PhoneIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
