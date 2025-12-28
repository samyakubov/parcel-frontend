import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import "./globals.css"
import "mapbox-gl/dist/mapbox-gl.css"
import { ThemeProvider } from "next-themes"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Parcel",
	description: "Just Property Records",
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
					<ToastContainer
					position="bottom-right"
					hideProgressBar={true}
					pauseOnHover
					theme="colored"
					/>
				</ThemeProvider>
			</body>
		</html>
	)
}
