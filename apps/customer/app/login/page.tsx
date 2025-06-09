"use client";

import { LoginForm } from "./components";
import Image from "next/image";

/**
 * Login page for the application.
 * Contains the login form and links for resetting password, go to sign-up page and go back to landing page.
 * The page should redirect to the landing page if user is already logged in.
 *
 * */
export default function LoginPage() {
  return (
    <div className="w-full min-h-screen flex flex-row">
      <div className="flex w-full md:w-3/5">
        <main className="my-auto py-3 px-2 w-full">
          <section className="px-5 md:px-10 w-full">
            <h1 className="text-3xl font-semibold py-8 w-full text-center">Login</h1>
            <LoginForm />
          </section>
        </main>
      </div>
      <div className="hidden md:flex bg-black w-full relative">
        <div className="relative left-0 z-10 w-2 bg-gradient-to-r from-white to-transparent" />
        <Image fill alt="login_image" loading="eager" src={"/login_pic1.png"} objectFit="cover" />
      </div>
    </div>
  );
}
