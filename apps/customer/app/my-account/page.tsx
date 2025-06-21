"use client";

import PersonalInfo, { UserPersonalInfo } from "@/app/my-account/components/PersonalInfo";

const personalInfo: UserPersonalInfo = {
  name: "john doe",
  email: "johndoe@gmail.com",
  phone: "08055830293",
};

export default function MyAccountPage() {
  return (
    <div className="min-h-screen pt-5 px-5">
      <PersonalInfo personalInfo={personalInfo} />
    </div>
  );
}
