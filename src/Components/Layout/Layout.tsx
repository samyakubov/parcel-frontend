import React from "react"
import Sidebar from "../Sidebar"
import { ToastContainer } from "react-toastify"

interface LayoutWithSidebarProps {
	children: React.ReactNode
}

export default function Layout({ children }: LayoutWithSidebarProps) {
	return (
		<div className="flex min-h-screen">
			<Sidebar/>
			<div className="flex flex-col flex-1 ml-16">
				<ToastContainer />
				<main className="flex-1">
					{children}
				</main>
			</div>
		</div>
	)
}
