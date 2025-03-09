import type { Metadata } from "next";
import Head from "next/head";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
	title: "Afre: Educate, Connect, Enrich",
	description: "A platform empowering farmers",
	themeColor: "#075b23",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth">
			<body className={inter.className}>
				<ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
