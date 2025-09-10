"use client"
import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HEADER_NAV_OPTIONS } from "@/constants/navigation"

interface HeaderNavProps {
    isScrolled: boolean;
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
}

export default function HeaderNav({ isScrolled, selectedIndex, setSelectedIndex }: HeaderNavProps) {
	return (
		<nav className={"hidden md:flex items-center space-x-2"}>
			{HEADER_NAV_OPTIONS.map((option: NavOption, index: number) => (
				<Link href={option.href} key={option.href}>
					<Button
						variant="ghost"
						className={`transition-colors duration-300 px-4 py-2 rounded-full ${
							// eslint-disable-next-line no-nested-ternary
							selectedIndex === index
								? isScrolled
									? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
									: "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 hover:text-white"
								: isScrolled
									? "text-muted-foreground hover:text-foreground hover:bg-accent/50"
									: "text-white/80 hover:text-white hover:bg-white/10"
						}`}
						onClick={() => setSelectedIndex(index)}
					>
						{option.label}
					</Button>
				</Link>
			))}
		</nav>
	)
}
