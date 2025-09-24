import { OnboardingFlow } from "@/components/account/onboarding-flow";
import { stackServerApp } from "@/stack";

export default async function OnboardingPage() {
  const user = await stackServerApp.getUser();
  const token = await user.getAuthJson();

  return (
    <div className="min-h-screen bg-green-100">
      <OnboardingFlow access_token={token.accessToken} />
    </div>
  );
}
