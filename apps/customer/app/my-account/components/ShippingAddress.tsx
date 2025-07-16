import { z } from "zod";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@repo/shared/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import EditButton from "./EditButton";

export interface Address {
  street: string;
  city: string;
  state: string;
  zip?: string;
  country?: string;
}

interface ShippingAddressProps {
  address: Address;
}

const formSchema = z.object({
  street: z.string().min(2).max(100),
  city: z.string().min(2).max(100),
  state: z.string().min(2).max(100),
  zip: z.string().optional(),
  country: z.string().optional(),
});

export default function ShippingAddress({ address }: ShippingAddressProps) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country,
    },
    mode: "onChange",
  });

  const formRef = useRef<HTMLFormElement>(null);

  function onSave() {
    formRef.current?.requestSubmit();
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsEditing(false);
    console.log(values);
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
          <CardAction>
            <EditButton isEditing={isEditing} setIsEditing={setIsEditing} onSave={onSave} />
          </CardAction>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem className={"w-full max-w-full"}>
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <Input disabled={!isEditing} placeholder="123 main str" {...field} />
                    </FormControl>
                    <div className="min-h-[20px]">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <div className="w-full flex flex-row items-center gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className={"w-full max-w-full"}>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input disabled={!isEditing} placeholder="New york city" {...field} />
                      </FormControl>
                      <div className="min-h-[20px]">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className={"w-full max-w-full"}>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input disabled={!isEditing} placeholder="NY" {...field} />
                      </FormControl>
                      <div className="min-h-[20px]">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full flex flex-row items-center gap-4">
                <FormField
                  control={form.control}
                  name="zip"
                  render={({ field }) => (
                    <FormItem className={"w-full max-w-full"}>
                      <FormLabel>ZIP code</FormLabel>
                      <FormControl>
                        <Input disabled={!isEditing} placeholder="123454" {...field} />
                      </FormControl>
                      <div className="min-h-[20px]">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className={"w-full max-w-full"}>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input disabled={!isEditing} placeholder="USA" {...field} />
                      </FormControl>
                      <div className="min-h-[20px]">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
