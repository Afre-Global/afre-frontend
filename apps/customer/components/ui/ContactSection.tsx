"use client";

import { X, Linkedin, Instagram, Mail } from "lucide-react";
import { social_media } from "@/lib/list";
import { useState } from "react";

export function ContactSection() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const apiUrl: string = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";
    const apiInquiryUrl: string = `${apiUrl}/landing_page/inquiry/`;
    const response = await fetch(apiInquiryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
      }),
    });

    setName("");
    setEmail("");
    setSubject("");
    setMessage("");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
  }

  return (
    <section id="contact" className="py-20">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Get In Touch</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Interested in learning more about Afre or exploring partnership opportunities?
              We&apos;d love to hear from you.
            </p>
            <div className="space-y-4">
              {/*
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#075b23]" />
                <p>Lagos Office: 25 Marina Street, Lagos Island, Nigeria</p>
              </div>
              */}
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#075b23]" />
                <p>support@afreglobal.com</p>
              </div>
              {/*
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#075b23]" />
                <p>+234 123 456 7890</p>
              </div>
              */}
            </div>
            <div className="flex gap-4 mt-6">
              {social_media.map((social, index) => (
                <a
                  target="_blank"
                  rel="noreferrer"
                  key={social.name}
                  href={social.link}
                  className="inline-flex items-center justify-center rounded-md h-10 w-10 border border-input hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label={social.name}
                >
                  {social.name === "Linkedin" && <Linkedin className="h-5 w-5" />}
                  {social.name === "X" && <X className="h-5 w-5" />}
                  {social.name === "Instagram" && <Instagram className="h-5 w-5" />}
                </a>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-white to-amber-50 p-6 rounded-lg shadow-md border border-amber-100">
            <h3 className="text-xl font-bold mb-4">Send Us a Message</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075b23] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075b23] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Your name"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075b23] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={subject}
                  onChange={handleSubjectChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="meassage" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your message"
                  rows={4}
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075b23] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={message}
                  onChange={handleMessageChange}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-[#075b23] text-white hover:bg-green-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
