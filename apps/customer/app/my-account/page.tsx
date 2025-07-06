"use client";

import PersonalInfo, { UserPersonalInfo } from "@/app/my-account/components/PersonalInfo";
import NotificationPreferences, {
  UserNotificationPreferences,
} from "@/app/my-account/components/NotificationPreferences";

const personalInfo: UserPersonalInfo = {
  name: "john doe",
  email: "johndoe@gmail.com",
  phone: "08055830293",
};

const notificationPreferences: UserNotificationPreferences = {
  sms_enabled: true,
  marketing_enabled: true,
};

export default function MyAccountPage() {
  return (
    <div className="min-h-screen pt-5 px-5">
      <PersonalInfo personalInfo={personalInfo} />
      <NotificationPreferences NotificationPreferences={notificationPreferences} />
    </div>
  );
}
