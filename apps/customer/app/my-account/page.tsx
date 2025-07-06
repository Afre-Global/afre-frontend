"use client";

import PersonalInfo, { UserPersonalInfo } from "@/app/my-account/components/PersonalInfo";
import ShippingAddress, { Address } from "@/app/my-account/components/ShippingAddress";

const personalInfo: UserPersonalInfo = {
  name: "john doe",
  email: "johndoe@gmail.com",
  phone: "08055830293",
};

const shippingAddress: Address = {
  street: "something street",
  city: "saskatoon",
  state: "SK",
};

export default function MyAccountPage() {
  return (
    <div className="min-h-screen pt-5 px-5">
      <PersonalInfo personalInfo={personalInfo} />
      <ShippingAddress address={shippingAddress} />
    </div>
  );
}
