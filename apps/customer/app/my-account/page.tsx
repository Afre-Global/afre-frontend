"use client";

import PersonalInfo, { UserPersonalInfo } from "@/app/my-account/components/PersonalInfo";
import ShippingAddress, { Address } from "@/app/my-account/components/ShippingAddress";
import NotificationPreferences, {
  UserNotificationPreferences,
} from "@/app/my-account/components/NotificationPreferences";
import Orders from "./components/Order";
import { Order, OrderItem } from "./components/Order";
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

const notificationPreferences: UserNotificationPreferences = {
  sms_enabled: true,
  marketing_enabled: true,
};

const mockItems: OrderItem[] = [
  {
    id: "1",
    name: "Ethiopian Single Origin Coffee Beans",
    quantity: 1,
    price: 100.00,
  },
  {
    id: "2",
    name: "lekki cocoa powder",
    quantity: 1,
    price: 100.00,
  },
  {
    id: "3",
    name: "Ojuelegba Raw Cocoa Butter",
    quantity: 1,
    price: 100.00,
  },
];
const mockOrder: Order = {
  id: "1",
  orderNumber: "ORD-001",
  total: 300.00,
  placedDate: "1/14/2025",
  status: "Delivered",
  items: mockItems,
};

export default function MyAccountPage() {
  return (
    <div className="min-h-screen pt-5 px-5">
      <PersonalInfo personalInfo={personalInfo} />
      <ShippingAddress address={shippingAddress} />
      <Orders order={mockOrder} />
      <NotificationPreferences NotificationPreferences={notificationPreferences} />
    </div>
  );
}
