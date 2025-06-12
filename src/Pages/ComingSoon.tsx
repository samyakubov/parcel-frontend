import React from "react"
import Footer from "../Components/Footer"

export default function ComingSoon() {
	return (
		<>
			<main className="grid min-h-screen place-items-center bg-gradient-to-b from-purple-200 to-white dark:from-purple-200 dark:to-gray-900 px-6 transition-all duration-300">
				<div className="text-center max-w-2xl mx-auto">

					<h1 className="mt-4 text-balance text-6xl font-bold tracking-tight leading-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
                        Shhh... Something big is coming
					</h1>

					<p className="mt-7 text-pretty text-lg text-gray-600 dark:text-gray-300 sm:text-xl/8">
                        We are crafting something special behind the scenes.
					</p>
					<div className="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
						<div className="size-2 rounded-full bg-green-500 animate-pulse" />
                        Launch date coming soon
					</div>
				</div>
			</main>
			<Footer/>
		</>
	)
}

