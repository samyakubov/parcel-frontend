import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import {ThemeProvider} from "next-themes"

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Buildly | Building your properties history",
	description: "Document every renovation, upgrade, and improvement. Give buyers the complete home history they deserve.",
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function RootLayout({
	children,
}: Readonly<{
    children: React.ReactNode;
}>) {
	return (
	//TODO: figure out the hydration error from theme provider
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${inter.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
					<Header />
					{children}
					<Footer/>
				</ThemeProvider>
			</body>
		</html>
	)
}
