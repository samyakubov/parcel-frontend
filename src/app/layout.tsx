import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google"
import "./globals.css"
import "mapbox-gl/dist/mapbox-gl.css"
import { ThemeProvider } from "next-themes"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const plusJakartaSans = Plus_Jakarta_Sans({
	variable: "--font-plus-jakarta-sans",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Parcel | Just Property Records"
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
				className={`${plusJakartaSans.variable} ${geistMono.variable} antialiased`}
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
