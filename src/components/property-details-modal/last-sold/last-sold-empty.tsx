import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

export default function LastSoldEmpty() {
	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			className="w-full"
		>
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<div className="p-2 rounded-full bg-destructive/10">
							<TrendingUp className="h-4 w-4 text-destructive" />
						</div>
						<h3 className="text-lg font-semibold text-destructive">
							Last Sale Information
						</h3>
					</div>
				</CardHeader>
				<CardContent>
					<Alert variant="destructive">
						<AlertDescription>
							No sale history available
						</AlertDescription>
					</Alert>
				</CardContent>
			</Card>
		</motion.div>
	)
}
