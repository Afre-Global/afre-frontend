"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Clock, ShoppingBag } from "lucide-react"

const BUYER_PLATFORM_URL = process.env.NEXT_PUBLIC_BUYER_PLATFORM_URL || "https://www.afreglobal.com/"
const BUYER_PLATFORM_URL_CONTACT = BUYER_PLATFORM_URL + "/#contact"
const SELLER_PLATFORM_URL = process.env.NEXT_PUBLIC_SELLER_PLATFORM_URL || "https://afreglobalseller.com/"
console.log("BUYER_PLATFORM_URL", BUYER_PLATFORM_URL)
console.log("BUYER_PLATFORM_URL_CONTACT", BUYER_PLATFORM_URL_CONTACT)
console.log("SELLER_PLATFORM_URL", SELLER_PLATFORM_URL)

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="sticky top-0 z-40 border-b bg-background">
				<div className="container flex h-16 items-center justify-between py-4">
					<div className="flex items-center gap-2 font-bold text-xl">
						<ShoppingBag className="h-6 w-6 text-[#075b23]" />
						<span className="text-[#075b23]">Afre</span>
						<span className="text-sm font-normal text-muted-foreground">for Sellers</span>
					</div>
					<nav className="flex items-center gap-4">
						<Link
							href={BUYER_PLATFORM_URL}
							className="text-sm font-medium hover:underline underline-offset-4"
							target="_blank"
							rel="noopener noreferrer"
						>
							Buyer Platform
						</Link>
						<Button
							variant="outline"
							size="sm"
							className="border-[#075b23] text-[#075b23] hover:bg-[#075b23] hover:text-white"
						>
							<Link href="#subcribe">Get Updates</Link>
						</Button>
					</nav>
				</div>
			</header>
			<main className="flex-1">
				<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center space-y-4 text-center">
							<div className="inline-flex items-center rounded-lg bg-[#075b23]/10 px-3 py-1 text-sm text-[#075b23]">
								<Clock className="mr-1 h-4 w-4" />
								<span>Coming Soon</span>
							</div>
							<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
								Sell Your Products on Afre
							</h1>
							<p className="max-w-[700px] text-muted-foreground md:text-xl">
								Our seller platform is launching soon. Join our waitlist to be the first to know when we can connect you
								with African farmers and their exceptional products.
							</p>
							<div className="flex flex-col gap-2 min-[400px]:flex-row">
								<Button size="lg" className="bg-[#075b23] hover:bg-[#075b23]/90">
									<Link href="#subcribe">Join Waitlist</Link>
								</Button>
								<Link href={BUYER_PLATFORM_URL} target="_blank" rel="noopener noreferrer">
									<Button
										variant="outline"
										size="lg"
										className="border-[#075b23] text-[#075b23] hover:bg-[#075b23] hover:text-white"
									>
										Visit Buyer Platform
										<ArrowRight className="ml-2 h-4 w-4" />
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose on Afre?</h2>
							<p className="max-w-[700px] text-muted-foreground md:text-xl">
								Join our platform to connect with African farmers and bring their exceptional agricultural products to
								global markets.
							</p>
						</div>
						<div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
							<div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
								<div className="rounded-full bg-[#075b23]/10 p-3">
									<CheckCircle2 className="h-6 w-6 text-[#075b23]" />
								</div>
								<h3 className="text-xl font-bold">Increased Earnings</h3>
								<p className="text-center text-muted-foreground">
                                    Connect directly with buyers and earn more for your hard work, with no middlemen taking a large cut.
								</p>
							</div>
							<div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
								<div className="rounded-full bg-[#075b23]/10 p-3">
									<CheckCircle2 className="h-6 w-6 text-[#075b23]" />
								</div>
								<h3 className="text-xl font-bold">Access to Market</h3>
								<p className="text-center text-muted-foreground">
                                    Reach local and international buyers looking for quality, traceable products like yours.
                                </p>
							</div>
							<div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
								<div className="rounded-full bg-[#075b23]/10 p-3">
									<CheckCircle2 className="h-6 w-6 text-[#075b23]" />
								</div>
								<h3 className="text-xl font-bold">Support to Grow</h3>
								<p className="text-center text-muted-foreground">
                                    Get connected to training, financing, and tools that help you meet local and global standards.
                                </p>
							</div>
						</div>
						<div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
							<div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
								<div className="rounded-full bg-[#075b23]/10 p-3">
									<CheckCircle2 className="h-6 w-6 text-[#075b23]" />
								</div>
								<h3 className="text-xl font-bold">Reliable Platform</h3>
								<p className="text-center text-muted-foreground">
                                    Build with farmers in mind, we offer security, transparency, and commitment to your success.
                                </p>
							</div>
							<div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
								<div className="rounded-full bg-[#075b23]/10 p-3">
									<CheckCircle2 className="h-6 w-6 text-[#075b23]" />
								</div>
								<h3 className="text-xl font-bold">Affordable to Use</h3>
								<p className="text-center text-muted-foreground">
                                    Start for free with flexible options designed to fit your needs and scale as you grow.
                                </p>
							</div>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32">
					<div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Already a customer on Afre?</h2>
							<p className="max-w-[600px] text-muted-foreground md:text-xl">
								Visit our buyer platform to discover amazing products from our current sellers.
							</p>
						</div>
						<div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
							<Link href={BUYER_PLATFORM_URL} target="_blank" rel="noopener noreferrer">
								<Button size="lg" className="bg-[#075b23] hover:bg-[#075b23]/90">
									Shop Now
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</Link>
						</div>
					</div>
				</section>
				<section id="subcribe" className="w-full py-12 md:py-24 lg:py-32 border-t">
					<div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
						<div className="space-y-3">
							<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Be the First to Know</h2>
							<p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
								Sign up for our newsletter to get updates on our seller platform launch.
							</p>
						</div>
						<div className="mx-auto w-full max-w-sm space-y-2">
							<form className="flex flex-col gap-2 sm:flex-row">
								<input
									type="email"
									placeholder="Enter your email"
									className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								/>
								<Button type="submit" className="bg-[#075b23] hover:bg-[#075b23]/90">
									Subscribe
								</Button>
							</form>
							<p className="text-xs text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
						</div>
					</div>
				</section>
			</main>
			<footer className="border-t py-6 md:py-0">
				<div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
					<div className="flex items-center gap-2 font-bold">
						<ShoppingBag className="h-5 w-5 text-[#075b23]" />
						<span className="text-[#075b23]">Afre</span>
						<span className="text-xs font-normal text-muted-foreground">for Sellers</span>
					</div>
					<p className="text-center text-sm text-muted-foreground md:text-left">
						&copy; {new Date().getFullYear()} Afre. All rights reserved.
					</p>
					<div className="flex gap-4">
						<Link href={BUYER_PLATFORM_URL_CONTACT} className="text-sm text-muted-foreground hover:underline underline-offset-4">
							Contact
						</Link>
					</div>
				</div>
			</footer>
		</div>
	)
}
