"use client";

import Link from "next/link";
import {
  Leaf,
  X,
  Linkedin,
  Instagram,
} from "lucide-react";
import { social_media } from "@/lib/list";

export function AfreFooter() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="hover:text-white">
                <Leaf className="h-6 w-6 text-green-500" />
                <span className="text-xl font-bold text-white">Afre</span>
              </Link>
            </div>
            <p className="text-sm">
              Afre is more than just a platform for markert access. We educate. We connect. We
              enrich.
            </p>
            <div className="flex gap-4 mt-4">
              {social_media.map((social) => (
                <a
                  target="_blank"
                  rel="noreferrer"
                  key={social.name}
                  href={social.link}
                  className="inline-flex items-center justify-center rounded-md h-10 w-10 text-stone-300 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  {social.name === "Linkedin" && <Linkedin className="h-5 w-5" />}
                  {social.name === "X" && <X className="h-5 w-5" />}
                  {social.name === "Instagram" && <Instagram className="h-5 w-5" />}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Our Focus</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#products" className="hover:text-white">
                  Cocoa
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-white">
                  Coffee
                </Link>
              </li>
              <li>
                <Link href="/#partner" className="hover:text-white">
                  Farmer Partnerships
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#vision" className="hover:text-white">
                  Our Vision
                </Link>
              </li>
              <li>
                <Link href="/#team" className="hover:text-white">
                  Our Team
                </Link>
              </li>
              {/*
                        <li>
                            <Link href="#" className="hover:text-white">
                            Careers
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-white">
                            Contact
                            </Link>
                        </li>
                        */}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <address className="not-italic text-sm space-y-2">
              <p>Email: support@afreglobal.com</p>
              {/*
                        <p>Lagos Office: 25 Marina Street, Lagos Island, Nigeria</p>
                        <p>Phone: +234 123 456 7890</p>
                        */}
            </address>
          </div>
        </div>
        <div className="border-t border-stone-700 mt-12 pt-6 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Afre. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
