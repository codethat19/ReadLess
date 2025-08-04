import React from "react";
import BgGradient from "@/components/common/bg-gradient";
import { Card } from "@/components/ui/card";

const CARD_COUNT = 6;

export default function DashboardLoading() {
	return (
		<main className="min-h-screen animate-pulse">
			{/* Background */}
			<BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />

			<div className="container mx-auto flex flex-col gap-4">
				<div className="px-2 py-12 sm:py-24">
					{/* Heading skeleton */}
					<div className="flex gap-4 mb-8 justify-between items-start">
						<div className="space-y-3 w-full max-w-sm">
							<div className="h-10 rounded-md bg-gray-300/40 w-3/4" />
							<div className="h-4 rounded-md bg-gray-300/30 w-2/3" />
						</div>
						{/* CTA skeleton */}
						<div className="h-10 w-32 rounded-md bg-gray-300/40 hidden sm:block" />
					</div>

					{/* Grid of summary card placeholders */}
					<div className="grid grid-cols-1 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{Array.from({ length: CARD_COUNT }).map((_, idx) => (
							<Card key={idx} className="h-60 bg-gray-200/40" />
						))}
					</div>
				</div>
			</div>
		</main>
	);
}
