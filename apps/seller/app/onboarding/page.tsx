// "use client"
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { get_user_access_token } from "@/lib/api_utils";

export default async function OnboardingPage() {
  const access_token = await get_user_access_token();

  return (
    <div className="min-h-screen bg-green-100">
      <OnboardingFlow access_token={access_token} />
    </div>
  );
}
