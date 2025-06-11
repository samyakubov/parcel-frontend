import React from "react"

export default function Missing() {
	return (
		<main className="grid min-h-full place-items-center bg-white dark:bg-gray-900 px-6 py-24 sm:py-32 lg:px-8 transition-all duration-300">
			<div className="text-center">
				<p className="text-base font-semibold text-indigo-600 dark:text-indigo-400">404</p>
				<h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
					Page not found
				</h1>
				<p className="mt-6 text-pretty text-lg font-medium text-gray-500 dark:text-gray-400 sm:text-xl/8">
					Sorry, we couldn’t find the page you’re looking for.
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<a
						href="/"
						className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400"
					>
						Go back home
					</a>
					<a href="/" className="text-sm font-semibold text-gray-900 dark:text-gray-300">
						Contact support <span aria-hidden="true">&rarr;</span>
					</a>
				</div>
			</div>
		</main>
	)
}
