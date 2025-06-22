"use client";

import {
  Avatar,
  AvatarFallback,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
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
import { SquarePen } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";

export interface UserPersonalInfo {
  name: string;
  email: string;
  phone: string;
}

interface PersonalInfoProps {
  personalInfo: UserPersonalInfo;
}

const formSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email("should be a valid email address"),
  phone: z.string().regex(/^\+?[\d\s\-().]{7,}$/, "should be a valid phone number"),
});

export default function PersonalInfo({ personalInfo }: PersonalInfoProps) {
  const [isEditingDisabled, setIsEditingDisabled] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: personalInfo.name,
      email: personalInfo.email,
      phone: personalInfo.phone,
    },
    mode: "onChange",
  });

  const formRef = useRef<HTMLFormElement>(null);

  const watchedName = form.watch("name");

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsEditingDisabled(true);
  }

  function handleEdit() {
    setIsEditingDisabled(false);
  }

  function handleCancel() {
    setIsEditingDisabled(true);
  }

  function displayCardActions() {
    return isEditingDisabled ? (
      <Button variant={"outline"} className={"gap-2"} size={"sm"} onClick={handleEdit}>
        <SquarePen size="14px" />
        Edit
      </Button>
    ) : (
      <div className={"flex flex-row gap-1"}>
        <Button
          variant={"default"}
          size={"sm"}
          className={"gap-2"}
          onClick={() => formRef.current?.requestSubmit()}
        >
          Save
        </Button>
        <Button variant={"outline"} size={"sm"} onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Personal information</CardTitle>
          <CardDescription>Your Name, phone and email</CardDescription>
          <CardAction>{displayCardActions()}</CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex items-center gap-4 ">
            <Avatar className="rounded-lg h-16 w-16">
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h3 className="text-lg font-medium text-gray-900">{watchedName}</h3>
              <p className="text-sm text-gray-500">{personalInfo.email}</p>
            </div>
          </div>
          <Form {...form}>
            <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="">
              <div className="w-full flex flex-row items-center gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className={"w-full max-w-full"}>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input disabled={isEditingDisabled} placeholder="john doe" {...field} />
                      </FormControl>
                      <div className="min-h-[20px]">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className={"w-full max-w-full"}>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input disabled placeholder="johndoe@mail.com" {...field} />
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem className={"w-full max-w-full"}>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isEditingDisabled}
                          placeholder="+234 8058493032"
                          {...field}
                        />
                      </FormControl>
                      <div className="min-h-[20px]">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                {/*empty div so that the phone field aligns properly with the name field*/}
                <div className="grid w-full max-w-full items-center gap-3"></div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
