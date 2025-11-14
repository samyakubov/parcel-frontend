import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import "./globals.css"
import "mapbox-gl/dist/mapbox-gl.css"
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
	title: "Buildly | Comprehensive Property Records & History",
	description: "Access detailed property records, sale history, violations, permits, and more. Make informed real estate decisions with verified public data.",
}

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
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
