"use client"

import Image  from "next/image";
import Link from "next/link";
import { Button } from "@repo/ui/button";
import { Coffee, Leaf, X, Menu, ChevronRight, MapPin, Linkedin, Instagram, Mail, Phone, Milk, Bean, Apple, Banknote} from "lucide-react"
import { useState } from "react"


export default function Home() {
    return (
        <div>
            <Header />
        </div>
    );
}

function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Leaf className="h-6 w-6 text-green-600" />
                    <span className="text-xl font-bold">Afre</span>
                </Link>
                <nav className="hidden md:flex gap-6">
                    <Link href="#vision" className="text-sm font-medium hover:text-green-600 transition-colors">
                        Our Vision
                    </Link>
                    <Link href="#products" className="text-sm font-medium hover:text-green-600 transition-colors">
                        Products
                    </Link>
                    <Link href="#about" className="text-sm font-medium hover:text-green-600 transition-colors">
                        About Us
                    </Link>
                    <Link href="#sustainability" className="text-sm font-medium hover:text-green-600 transition-colors">
                        Sustainability
                    </Link>
                    <Link href="#team" className="text-sm font-medium hover:text-green-600 transition-colors">
                        Team
                    </Link>
                    <Link href="#partner" className="text-sm font-medium hover:text-green-600 transition-colors">
                        Partner
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <a
                        href="#contact"
                        className="hidden md:inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                        Contact Us
                    </a>
                    <a
                        href="#partner"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors"
                    >
                        Partner With Us
                    </a>
                    <MobileNav />
                </div>
            </div>
        </header>
    )
}

function MobileNav() {
    const [open, setOpen] = useState(false)

    return (
        <div className="md:hidden">
            <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 w-10 hover:bg-accent hover:text-accent-foreground"
                aria-label="Open menu"
            >
                <Menu className="h-5 w-5" />
            </button>
            {open && (
                <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
                    <div className="fixed right-0 top-0 h-full w-3/4 bg-background p-6 shadow-lg">
                        <div className="flex justify-end">
                            <button
                                onClick={() => setOpen(false)}
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 w-10 hover:bg-accent hover:text-accent-foreground"
                                aria-label="Open menu"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <nav className="mt-8 flex flex-col gap-6">
                            <Link href="#vision" className="text-lg font-medium hover:text-green-600 transition-colors" onClick={() => setOpen(false)}>
                                Our Vision
                            </Link>
                            <Link href="#products" className="text-lg font-medium hover:text-green-600 transition-colors" onClick={() => setOpen(false)}>
                                Products
                            </Link>
                            <Link href="#about" className="text-lg font-medium hover:text-green-600 transition-colors" onClick={() => setOpen(false)}>
                                About Us
                            </Link>
                            <Link href="#sustainability" className="text-lg font-medium hover:text-green-600 transition-colors" onClick={() => setOpen(false)}>
                                Sustainability
                            </Link>
                            <Link href="#team" className="text-lg font-medium hover:text-green-600 transition-colors" onClick={() => setOpen(false)}>
                                Team
                            </Link>
                            <Link href="#partner" className="text-lg font-medium hover:text-green-600 transition-colors" onClick={() => setOpen(false)}>
                                Partner
                            </Link>
                            <a
                                href="#contact"
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors"
                                onClick={() => setOpen(false)}
                            >
                                Contact Us
                            </a>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    )
}
