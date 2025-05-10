"use client"

import Image from "next/image";
import Link from "next/link";
import { Coffee, Leaf, X, Menu, ChevronRight, MapPin, Linkedin, Instagram, Mail, Phone, Milk, Bean, Apple, Banknote } from "lucide-react"
import { useState } from "react"

const social_media = [
    {
        name: "Instagram",
        link: "https://www.instagram.com/afreglobal?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    },
    {
        name: "Linkedin",
        link: "https://www.linkedin.com/company/afreglobal/",
    }
]

export default function Home() {
    return (
        <div>
            <Header />
            <main className="flex-1">
                <HeroSection />
                <MissionVisionSection />
                <ProductsSection />
                <AboutSection />
                <TeamSection />
                <PartnerSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
}

function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    {/* <Leaf className="h-6 w-6 text-[#075b23]" /> */}
                    <span className="text-xl font-bold text-[#075b23]">Afre</span>
                </Link>
                <nav className="hidden md:flex gap-6">
                    <Link href="#vision" className="text-sm font-medium hover:text-[#075b23] transition-colors">
                        Our Vision
                    </Link>
                    <Link href="#products" className="text-sm font-medium hover:text-[#075b23] transition-colors">
                        Products
                    </Link>
                    <Link href="#about" className="text-sm font-medium hover:text-[#075b23] transition-colors">
                        About Us
                    </Link>
                    <Link href="#team" className="text-sm font-medium hover:text-[#075b23] transition-colors">
                        Team
                    </Link>
                    <Link href="#partner" className="text-sm font-medium hover:text-[#075b23] transition-colors">
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
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 bg-[#075b23] text-white hover:bg-green-700 transition-colors"
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
                            <Link href="#vision" className="text-lg font-medium hover:text-[#075b23] transition-colors" onClick={() => setOpen(false)}>
                                Our Vision
                            </Link>
                            <Link href="#products" className="text-lg font-medium hover:text-[#075b23] transition-colors" onClick={() => setOpen(false)}>
                                Products
                            </Link>
                            <Link href="#about" className="text-lg font-medium hover:text-[#075b23] transition-colors" onClick={() => setOpen(false)}>
                                About Us
                            </Link>
                            <Link href="#team" className="text-lg font-medium hover:text-[#075b23] transition-colors" onClick={() => setOpen(false)}>
                                Team
                            </Link>
                            <Link href="#partner" className="text-lg font-medium hover:text-[#075b23] transition-colors" onClick={() => setOpen(false)}>
                                Partner
                            </Link>
                            <a
                                href="#contact"
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-[#075b23] text-white hover:bg-green-700 transition-colors"
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

function HeroSection() {
    return (
        <section className="relative py-20 md:py-32">
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-green-900/90 to-amber-900/90">
                <Image
                    src="/CocoaFarm1.jpeg"
                    alt="Nigerian farmland"
                    fill
                    className="object-cover mix-blend-overlay"
                    priority
                />
            </div>
            <div className="container relative z-10 flex flex-col items-center text-center">
                <p className="mt-6 max-w-3xl text-3xl text-gray-200">
                    Afre is a digital platform where farmers and buyers connect directly. But it is more than just that!
                </p>
                <h1 className="max-w-6xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                    We Educate. We Connect. We Enrich.
                </h1>
                <div className="mt-10 flex flex-wrap gap-4 justify-center">
                    <a
                        href="#vision"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium h-11 px-8 py-2 bg-[#075b23] text-white hover:bg-green-700 transition-colors"
                    >
                        Our Vision <ChevronRight className="ml-2 h-4 w-4" />
                    </a>
                    <a
                        href="#partner"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium h-11 px-8 py-2 bg-white/10 text-white hover:bg-white/20 transition-colors border border-white"
                    >
                        Partner With Us
                    </a>
                </div>
            </div>
        </section>
    )
}

function MissionVisionSection() {
    return (
        <section id="vision" className="py-20 bg-gradient-to-br from-amber-50 to-green-50">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Mission</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Our mission is to give farmers more than just a place to sell. We are here to help them learn, grow better crops, and earn what they truly deserve.
                        For buyers, we open the door to more options, direct sourcing and better prices.
                    </p>
                </div>
                <div className="grid gap-12 md:grid-cols-2 items-center">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Better Access to Market</h3>
                        <p className="text-lg text-muted-foreground mb-6">
                            For farmers, Afre aims to provide direct access to trusted buyers-no middlemen, no hidden prices and the ability to earn more.
                        </p>
                        <p className="text-lg text-muted-foreground mb-6">
                            For Buyers, Afre connects directly with verified farmers to get quality products, traceability, and better pricing.
                        </p>

                        <h3 className="text-2xl font-bold mb-4">Technology-Driven Support</h3>
                        <p className="text-lg text-muted-foreground mb-6">
                            For farmers, Afre aims to provide access to AI tools helping farmers detect crop issues, get soil and planting advice,
                            and track weather patterns - making it easier to farm sustainably and reduce waste.
                        </p>
                        <p className="text-lg text-muted-foreground">
                            For Buyers, Afre aims to provide access to AI tools that help improve user experience by suggesting products based on preferences and purchasing history.
                        </p>
                    </div>
                    <div className="relative h-[500px] rounded-lg overflow-hidden">
                        <Image
                            src="/agricultureVision.jpeg"
                            alt="Nigerian agriculture vision"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

function ProductsSection() {
    const products = [
        {
            name: "Unroasted Cocoa Beans",
            description:
                "Experience the true flavour of quality cocoa beans sourced from the heart of Nigeria's rich cocoa growing regions.",
            image: "/cocoa.jpeg",
            icon: <Leaf className="h-10 w-10 text-amber-600" />,
            link: "#cocoa",
        },
        {
            name: "Green Coffee Beans",
            description:
                "Access green coffee beans grown in the lush, fertile lands of Nigeria, offering a distinct flavour profile that stands out in the coffee world.",
            image: "/coffee.jpeg",
            icon: <Coffee className="h-10 w-10 text-amber-800" />,
            link: "#coffee",
        },
    ]

    return (
        <section id="products" className="py-20">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Focus Areas</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Discover the high-potential agricultural products we&apos;re developing with African farmers.
                    </p>
                </div>
                {/* Change width
                    */}
                <div className="grid gap-8 md:grid-cols-2 w-45">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-b from-white to-amber-50/30 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 border border-amber-100"
                        >
                            <div className="relative h-48">
                                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                            </div>
                            <div className="p-6">
                                <div className="mb-4">{product.icon}</div>
                                <h3 className="text-xl font-bold">{product.name}</h3>
                                <p className="mt-2 text-muted-foreground">{product.description}</p>
                                {/*<a
                                href={product.link}
                                className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                                >
                                Learn More
                                </a>
                                */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function AboutSection() {
    return (
        <section id="about" className="py-20 bg-stone-50">
            <div className="container">
                <div className="grid gap-12 md:grid-cols-2 items-center">
                    <div className="relative h-[400px] rounded-lg overflow-hidden">
                        <Image src="/AfreLogoGreenBG.JPG" alt="Nigerian farmers" fill className="object-cover" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Story</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Afre&apos;s platform was born from the CEO&apos;s 2021 experience
                            importing cocoa beans from his grandfather&apos;s Nigerian
                            farm to Canada, where he witnessed firsthand how
                            middlemen and exporters capture most profits while
                            farmers who do the actual work earn significantly
                            less. This revelation highlighted a widespread problem
                            affecting millions of African farmers who struggle with
                            limited market access, insufficient funding, inadequate
                            market information, and inability to meet global standards.
                        </p>
                        <p className="mt-4 text-lg text-muted-foreground">
                            To address these challenges, Afre created an all-in-one
                            platform that empowers farmers by connecting them
                            directly with buyers, providing access to microfinance
                            institutions, and offering training on sustainable
                            farming practices to help them qualify for international
                            certifications. Operating on a freemium model that
                            generates revenue through service fees, subscriptions,
                            partnerships, and advertising, Afre is starting with
                            Nigerian farmers before expanding across Africa and eventually globally.
                        </p>
                        {/*
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="flex flex-col p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                                <span className="text-3xl font-bold text-green-700">200+</span>
                                <span className="text-sm text-green-800">Farmer Partnerships in Development</span>
                            </div>
                            <div className="flex flex-col p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                                <span className="text-3xl font-bold text-green-700">3</span>
                                <span className="text-sm text-green-800">Focus Crops</span>
                            </div>
                            <div className="flex flex-col p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                                <span className="text-3xl font-bold text-green-700">100%</span>
                                <span className="text-sm text-green-800">Sustainable Practices</span>
                            </div>
                            <div className="flex flex-col p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                                <span className="text-3xl font-bold text-green-700">5,000+</span>
                                <span className="text-sm text-green-800">Hectares in Development</span>
                            </div>
                        </div>
                        */}
                    </div>
                </div>
            </div>
        </section>
    )
}

function SustainabilitySection() {
    return (
        <section id="sustainability" className="py-20 bg-gradient-to-br from-green-100 to-emerald-50">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Commitment to Sustainability</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        We believe in responsible farming that protects the environment and supports local communities.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="bg-gradient-to-br from-white to-green-50 p-6 rounded-lg shadow-sm border border-green-100">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <Leaf className="h-6 w-6 text-green-700" />
                        </div>
                        <h3 className="text-xl font-bold text-green-800">Eco-Friendly Farming</h3>
                        <p className="mt-2 text-green-700">
                            We promote organic farming methods that minimize environmental impact and preserve soil health for future
                            generations.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-white to-green-50 p-6 rounded-lg shadow-sm border border-green-100">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <MapPin className="h-6 w-6 text-green-700" />
                        </div>
                        <h3 className="text-xl font-bold text-green-800">Community Support</h3>
                        <p className="mt-2 text-green-700">
                            We invest in local communities through education programs, healthcare initiatives, and infrastructure
                            development.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-white to-green-50 p-6 rounded-lg shadow-sm border border-green-100">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <Banknote className="h-6 w-6 text-green-700" />
                        </div>
                        <h3 className="text-xl font-bold text-green-800">Fair Trade Practices</h3>
                        <p className="mt-2 text-green-700">
                            We ensure farmers receive fair compensation for their products, creating sustainable livelihoods and
                            economic stability.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

function TeamSection() {
    const team = [
        {
            name: "Daniel Afe",
            title: "Co-Founder & CEO",
            bio: "Daniel, a Nigerian-Canadian with economics education from Saskatchewan and Dundee universities, combines his business expertise, policy analysis experience, community leadership roles, and passion for innovation to lead Afre in its mission to transform farmers' livelihoods across Africa.",
            image: "/DanielAfe.webp",
        },
        {
            name: "Damilare-Oluwa Adeniyi",
            title: "Co-Founder & CTO",
            bio: "Damilare leverages his dual background in Engineering Physics and Computer Science from the University of Saskatchewan, along with his experience developing next-generation chip design software at Siemens EDA, to apply first-principles problem-solving approaches to Afre's platform development while pursuing his passion for hardware-software integration.",
            image: "/Damilare.webp",
        },
    ]

    return (
        <section id="team" className="py-20">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Team</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Meet the passionate experts behind Afre&apos;s mission to transform African agriculture.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-b from-white to-green-50 p-6 rounded-lg border border-green-100 text-center hover:shadow-lg transition-shadow"
                        >
                            <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                                <Image src={member.image} alt={member.name} fill className="object-cover" />
                            </div>
                            <h3 className="text-xl font-bold">{member.name}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{member.title}</p>
                            <p className="text-muted-foreground">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function PartnerSection() {
    return (
        <section id="partner" className="py-20 bg-gradient-to-br from-amber-800 to-amber-900 text-white">
            <div className="container text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Partner With Afre</h2>
                <p className="mt-4 text-lg max-w-2xl mx-auto">
                    Join us in our mission to bring premium products the global market while improving farmers livelihoods.
                </p>
                <div className="mt-10 grid md:grid-cols-3 gap-8">
                    <div className="bg-gradient-to-br from-white/10 to-transparent p-6 rounded-lg border border-white/20 hover:bg-white/10 transition-colors">
                        <h3 className="text-xl font-bold mb-3">Investors</h3>
                        <p className="mb-4">
                            Support our growth as we build sustainable agricultural infrastructure and partnerships.
                        </p>
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 border border-white text-white hover:bg-white/20 transition-colors"
                        >
                            Investment Opportunities
                        </a>
                    </div>
                    <div className="bg-gradient-to-br from-white/10 to-transparent p-6 rounded-lg border border-white/20 hover:bg-white/10 transition-colors">
                        <h3 className="text-xl font-bold mb-3">Distributors</h3>
                        <p className="mb-4">
                            Connect with us to discuss future distribution of premium African agricultural products.
                        </p>
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 border border-white text-white hover:bg-white/20 transition-colors"
                        >
                            Distribution Partnerships
                        </a>
                    </div>
                    <div className="bg-gradient-to-br from-white/10 to-transparent p-6 rounded-lg border border-white/20 hover:bg-white/10 transition-colors">
                        <h3 className="text-xl font-bold mb-3">Farmers</h3>
                        <p className="mb-4">Join our network of farmers committed to sustainable practices and premium quality.</p>
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 border border-white text-white hover:bg-white/20 transition-colors"
                        >
                            Farmer Programs
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

function ContactSection() {
    return (
        <section id="contact" className="py-20">
            <div className="container">
                <div className="grid gap-12 md:grid-cols-2 items-center">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Get In Touch</h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Interested in learning more about Afre or exploring partnership opportunities? We&apos;d love to hear from you.
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
                        <form className="space-y-4">
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
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Your name"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075b23] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Your name"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075b23] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Your message"
                                    rows={4}
                                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075b23] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
    )
}

function Footer() {
    return (
        <footer className="bg-stone-900 text-stone-300">
            <div className="container py-12">
                <div className="grid gap-8 md:grid-cols-4">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Leaf className="h-6 w-6 text-green-500" />
                            <span className="text-xl font-bold text-white">Afre</span>
                        </div>
                        <p className="text-sm">
                            Afre is more than just a platform for markert access.
                            We educate. We connect. We enrich.
                        </p>
                        <div className="flex gap-4 mt-4">
                            {social_media.map((social, index) => (
                                <a
                                    target="_blank"
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
                                <Link href="#products" className="hover:text-white">
                                    Cocoa
                                </Link>
                            </li>
                            <li>
                                <Link href="#products" className="hover:text-white">
                                    Coffee
                                </Link>
                            </li>
                            <li>
                                <Link href="#partner" className="hover:text-white">
                                    Farmer Partnerships
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#about" className="hover:text-white">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#vision" className="hover:text-white">
                                    Our Vision
                                </Link>
                            </li>
                            <li>
                                <Link href="#team" className="hover:text-white">
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
    )
}
