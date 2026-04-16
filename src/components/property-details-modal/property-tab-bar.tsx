"use client"
import React from "react"
import { modalStore } from "@/stores/modal-store"

const TABS: { id: ModalTab; label: string }[] = [
	{ id: "details",    label: "Details"    },
	{ id: "owners",     label: "Owners"     },
	{ id: "mortgage",   label: "Mortgage"   },
	{ id: "violations", label: "Violations" },
	{ id: "complaints", label: "Complaints" },
	{ id: "jobs",       label: "Jobs"       },
	{ id: "schools",    label: "Schools"    },
	{ id: "census",     label: "Census"     },
	{ id: "records",    label: "Activity"   },
]

interface PropertyTabBarProps {
	modal: PropertyModal
}

export default function PropertyTabBar({ modal }: PropertyTabBarProps) {
	return (
		<div className="mx-4 mb-3 flex overflow-x-auto rounded-xl bg-muted p-1 gap-1 scrollbar-none">
			{TABS.map((tab) => {
				const isActive = modal.activeTab === tab.id
				return (
					<button
						key={tab.id}
						onClick={() => modalStore.setModalState(modal.id, { activeTab: tab.id })}
						className={`
							flex-shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-150
							${isActive
						? "bg-background text-primary shadow-sm"
						: "text-muted-foreground hover:text-foreground"
					}
						`}
					>
						{tab.label}
					</button>
				)
			})}
		</div>
	)
}
