"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BusinessSelectionComponent() {
  const [selectedOption, setSelectedOption] = useState("join");
  const [businessName, setBusinessName] = useState("");
  const [password, setPassword] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessHours, setBusinessHours] = useState("");
  const [agentName, setAgentName] = useState("");
  const [existingBusinessName, setExistingBusinessName] = useState("");
  const [existingPassword, setExistingPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("BusinessSelectionComponent mounted");
    setSelectedOption("join");
  }, []);

  const handleOptionChange = (value: string) => {
    console.log("Option changed to:", value);
    setSelectedOption(value);
    setError("");
  };

  const handleSubmit = async () => {
    console.log("Submitting business selection");
    setError("");

    if (status !== "authenticated" || !session?.user?.id) {
      console.log("User not authenticated");
      setError("User not authenticated");
      return;
    }

    const endpoint = selectedOption === "create" ? "/api/business/create" : "/api/business/join";
    const body = selectedOption === "create" 
      ? { businessName, password, businessAddress, businessPhone, businessHours, agentName }
      : { businessName: existingBusinessName, password: existingPassword };

    console.log("Sending request to:", endpoint);
    console.log("Request body:", JSON.stringify(body, null, 2));

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, userId: session.user.id }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.message || "An error occurred");
      }

      const responseData = await response.json();
      console.log("Response data:", JSON.stringify(responseData, null, 2));

      console.log("Redirecting to dashboard");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setError(error instanceof Error ? error.message : "An error occurred. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Join or Create a Business
        </CardTitle>
        <CardDescription className="mt-2 text-gray-500 dark:text-gray-400">
          To access the dashboard, you can either join an existing business or
          create a new one.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-12">
        {error && <p className="text-red-500">{error}</p>}
        <RadioGroup value={selectedOption} onValueChange={handleOptionChange}>
          <div className="flex items-center gap-4">
            <RadioGroupItem id="join" value="join" />
            <Label className="text-sm font-medium" htmlFor="join">
              Join Existing Business
            </Label>
          </div>
          {selectedOption === "join" && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label className="text-sm font-medium" htmlFor="existing-business-name">
                  Business Name
                </Label>
                <Input
                  id="existing-business-name"
                  placeholder="Enter business name"
                  value={existingBusinessName}
                  onChange={(e) => setExistingBusinessName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-sm font-medium" htmlFor="existing-password">
                  Password
                </Label>
                <Input
                  id="existing-password"
                  type="password"
                  placeholder="Enter password"
                  value={existingPassword}
                  onChange={(e) => {
                    setExistingPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          )}
          <div className="flex items-center gap-4">
            <RadioGroupItem id="create" value="create" />
            <Label className="text-sm font-medium" htmlFor="create">
              Create New Business
            </Label>
          </div>
          {selectedOption === "create" && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label className="text-sm font-medium" htmlFor="business-name">
                  Business Name
                </Label>
                <Input
                  id="business-name"
                  placeholder="Enter business name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-sm font-medium" htmlFor="new-password">
                  Password
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-sm font-medium" htmlFor="business-address">
                  Business Address
                </Label>
                <Input
                  id="business-address"
                  placeholder="Enter business address"
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-sm font-medium" htmlFor="business-phone">
                  Business Phone
                </Label>
                <Input
                  id="business-phone"
                  placeholder="Enter business phone"
                  value={businessPhone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-sm font-medium" htmlFor="business-hours">
                  Business Hours
                </Label>
                <Input
                  id="business-hours"
                  placeholder="Enter business hours"
                  value={businessHours}
                  onChange={(e) => setBusinessHours(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-sm font-medium" htmlFor="agent-name">
                  Agent Name
                </Label>
                <Input
                  id="agent-name"
                  placeholder="Enter agent name"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                />
              </div>
            </div>
          )}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          className="bg-blue-500 text-white hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
