import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  Switch,
} from "@repo/shared/ui";
import { z } from "zod";
import { Bell, Save } from "lucide-react";
import { useForm } from "react-hook-form";

export interface UserNotificationPreferences {
  email_enabled?: boolean;
  sms_enabled?: boolean;
  marketing_enabled?: boolean;
  order_updates_enabled?: boolean;
}

interface NotificationPreferencesProps {
  NotificationPreferences: UserNotificationPreferences;
}

const FormSchema = z.object({
  email_notifications: z.boolean().optional(),
  sms_notifications: z.boolean().optional(),
  marketing_communications: z.boolean().optional(),
  order_updates: z.boolean().optional(),
});

// Configuration for form fields
const NOTIFICATION_FIELDS = [
  {
    name: "email_notifications" as const,
    label: "Email notifications",
    description: "Receive order updates and promotional offers via email",
  },
  {
    name: "sms_notifications" as const,
    label: "SMS notifications",
    description: "Receive order updates and promotional offers via SMS",
  },
  {
    name: "marketing_communications" as const,
    label: "Marketing communications",
    description: "Receive promotional offers and product updates",
  },
  {
    name: "order_updates" as const,
    label: "Order updates",
    description: "Receive notifications about your order status",
  },
] as const;

export default function NotificationPreferences({
  NotificationPreferences,
}: NotificationPreferencesProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email_notifications: NotificationPreferences.email_enabled || false,
      sms_notifications: NotificationPreferences.sms_enabled || false,
      marketing_communications: NotificationPreferences.marketing_enabled || false,
      order_updates: NotificationPreferences.order_updates_enabled || false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row items-center gap-2">
            <Bell size={16} />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
              <div className="space-y-4">
                {NOTIFICATION_FIELDS.map((field) => (
                  <FormField
                    key={field.name}
                    control={form.control}
                    name={field.name}
                    render={({ field: formField }) => (
                      <FormItem className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>{field.label}</FormLabel>
                          <FormDescription>{field.description}</FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={formField.value}
                            onCheckedChange={formField.onChange}
                            className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-200"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <Button type="submit" className={"bg-green-600 gap-3"}>
                <Save /> Save preferences
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
