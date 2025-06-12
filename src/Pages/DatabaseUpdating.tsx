import React from "react"

export default function DatabaseUpdating() {
	return (
		<main className="grid h-screen place-items-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 px-6 transition-all duration-300">
			<div className="text-center max-w-2xl mx-auto">
				<div className="inline-flex items-center justify-center p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-8">
					<div className="animate-spin h-6 w-6 border-4 border-indigo-500 dark:border-indigo-400 border-t-transparent dark:border-t-transparent rounded-full" />
				</div>

				<h2 className="text-base font-semibold text-indigo-600 dark:text-indigo-400">
                        System Update in Progress
				</h2>

				<h1 className="mt-4 text-balance text-6xl font-bold tracking-tight leading-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
                        Data Refresh in Progress
				</h1>

				<p className="mt-7 text-pretty text-lg text-gray-600 dark:text-gray-300 sm:text-xl/8">
                        Our database is currently being updated with the latest information.
                        The new data will be available in the morning. Thank you for your patience.
				</p>

				<div className="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
					<div className="size-2 rounded-full bg-green-500 animate-pulse" />
                        Estimated completion by 6:00 AM
				</div>
			</div>
		</main>
	)
}
