"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
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
  const [newPassword, setNewPassword] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessHours, setBusinessHours] = useState("");
  const [agentName, setAgentName] = useState("");
  const [existingBusinessName, setExistingBusinessName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    setError(""); // Clear error when option changes
  };

  const handleSubmit = async () => {
    setError(""); // Clear any previous error

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userId = user?.id;

    if (selectedOption === "create") {
      if (!businessName || !newPassword) {
        setError("Please fill in the business name and password to create a new business.");
        return;
      }

      const { data: businessData, error: businessError } = await supabase
        .from("Business")
        .insert([{
          businessName: businessName,
          password: newPassword,
          businessAddress: businessAddress,
          businessPhone: businessPhone,
          businessHours: businessHours,
          agentName: agentName,
        }])
        .select()
        .single();

      if (businessError) {
        setError("Error creating business. Please try again.");
        console.error(businessError);
      } else {
        const { id: businessId } = businessData;

        const { error: userError } = await supabase
          .from("User")
          .update({ associatedBusiness: businessId, hasChosenBusiness: true })
          .eq("id", userId);

        if (userError) {
          console.log("User error: ", userError);
          setError("Error associating business with user. Please try again.");
          console.error(userError);
        } else {
          console.log("User updated successfully");
          router.push("/dashboard"); // Adjust this path as necessary
        }
      }
    } else {
      if (!existingBusinessName || !password) {
        setError("Please fill in all fields to join an existing business.");
        return;
      }

      const { data: businessData, error: businessError } = await supabase
        .from("Business")
        .select("*")
        .eq("businessName", existingBusinessName)
        .eq("password", password)
        .single();

      if (businessError || !businessData) {
        setError("Invalid business name or password. Please try again.");
        console.error(businessError);
      } else {
        const { id: businessId } = businessData;

        const { error: userError } = await supabase
          .from("User")
          .update({ associatedBusiness: businessId, hasChosenBusiness: true })
          .eq("id", userId);

        if (userError) {
          setError("Error associating business with user. Please try again.");
          console.error(userError);
        } else {
          router.push("/dashboard"); 
        }
      }
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
        <RadioGroup defaultValue="join" onValueChange={handleOptionChange}>
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
                <Label className="text-sm font-medium" htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
