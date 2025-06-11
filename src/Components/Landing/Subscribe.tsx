import React from "react"

export default function Subscribe() {
	return (
		<div className="relative bg-gradient-to-br from-pink-900 via-red-900 to-amber-900 py-16 sm:py-24 lg:py-32 overflow-hidden">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(245,158,11,0.1)_1px,transparent_0)] bg-[size:50px_50px]" />

			<div className="relative mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-orange-100 to-amber-100 bg-clip-text text-transparent">
						Stay Updated
					</h2>
					<p className="mt-4 text-lg text-orange-100/80">
						Get notified about new data updates. No spam. No headaches.
					</p>
					<div className="mt-6 flex max-w-md gap-x-4 mx-auto">
						<label htmlFor="email-address" className="sr-only">
							Email address
						</label>
						<input
							id="email-address"
							name="email"
							type="email"
							required
							placeholder="Enter your email"
							autoComplete="email"
							className="min-w-0 flex-auto rounded-lg border-0 bg-white/10 backdrop-blur-sm px-4 py-3 text-white shadow-sm ring-1 ring-inset ring-orange-300/30 placeholder:text-orange-200/60 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm/6"
						/>
						<button
							type="submit"
							className="flex-none rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:from-orange-600 hover:to-amber-600 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
						>
							Subscribe
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
