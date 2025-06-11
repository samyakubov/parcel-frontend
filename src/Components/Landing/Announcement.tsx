import React from "react"
import { XMarkIcon } from "@heroicons/react/20/solid"

interface AnnouncementProps {
	title: string;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

export default function Announcement({ title, isOpen, setIsOpen }: AnnouncementProps) {
	if (!isOpen) return null

	return (
		<div className="relative isolate flex items-center gap-x-6 overflow-hidden backdrop-blur-md bg-white/30 dark:bg-gray-900 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
			<div
				aria-hidden="true"
				className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
			>
				<div
					style={{
						clipPath:
							"polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
					}}
					className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-pink-500 to-violet-500 opacity-20 dark:opacity-30"
				/>
			</div>
			<div
				aria-hidden="true"
				className="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
			>
				<div
					style={{
						clipPath:
							"polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
					}}
					className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-pink-500 to-violet-500 opacity-20 dark:opacity-30"
				/>
			</div>
			<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
				<p className="text-sm leading-6 font-semibold tracking-tight bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
					{title}
				</p>
			</div>
			<div className="flex flex-1 justify-end">
				<button
					type="button"
					className="-m-3 p-3 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-full transition-colors focus-visible:outline-offset-[-4px]"
					onClick={() => setIsOpen(false)}
				>
					<span className="sr-only">Dismiss</span>
					<XMarkIcon className="size-5 text-gray-600 dark:text-gray-400" aria-hidden="true" />
				</button>
			</div>
		</div>
	)
}
