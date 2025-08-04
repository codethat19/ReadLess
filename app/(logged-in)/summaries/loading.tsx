import React from "react";
import BgGradient from "@/components/common/bg-gradient";
import { Card } from "@/components/ui/card";

export default function SummaryLoading() {
	return (
		<div className="relative isolate min-h-screen bg-linear-to-b from-rose-50/40 to-white animate-pulse">
			<BgGradient className="from-rose-400 via-rose-300 to-orange-200" />

			<div className="container mx-auto flex flex-col gap-4">
				<div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
					{/* Header skeleton */}
					<div className="flex flex-col">
						<div className="space-y-4 mb-8">
							{/* Title skeleton */}
							<div className="h-8 w-3/4 rounded-md bg-gray-300/40" />
							{/* Meta info skeleton */}
							<div className="flex gap-4">
								<div className="h-4 w-24 rounded-md bg-gray-300/30" />
								<div className="h-4 w-32 rounded-md bg-gray-300/30" />
							</div>
						</div>
					</div>

					{/* Source info skeleton */}
					<div className="mb-8">
						<div className="h-16 w-full rounded-lg bg-gray-200/40 border border-gray-300/30" />
					</div>

					{/* Summary viewer skeleton */}
					<div className="relative mt-4 sm:mt-8 lg:mt-16">
						<div className="relative p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100/30 max-w-4xl mx-auto">
							{/* Word count badge skeleton */}
							<div className="absolute top-2 sm:top-4 right-2 sm:right-4 h-6 w-20 rounded-full bg-gray-300/40" />

							{/* Summary content skeleton */}
							<div className="relative mt-8 sm:mt-6 flex justify-center">
								<Card className="relative w-[350px] sm:w-[450px] lg:w-[600px] h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden bg-gray-200/40">
									{/* Header placeholder */}
									<div className="px-6 pt-10 pb-6">
										<div className="h-8 w-2/3 mx-auto rounded-md bg-gray-300/40" />
									</div>

									{/* Content placeholder */}
									<div className="px-6 space-y-4 overflow-y-auto h-full pb-14">
										{Array.from({ length: 6 }).map(
											(_, i) => (
												<div
													key={i}
													className="flex items-center gap-3"
												>
													<div className="h-4 w-4 rounded-full bg-gray-300/30" />
													<div className="flex-1 space-y-2">
														<div className="h-4 rounded bg-gray-300/30 w-full" />
														<div className="h-4 rounded bg-gray-300/20 w-4/5" />
													</div>
												</div>
											)
										)}
									</div>
								</Card>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
