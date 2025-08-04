import React from "react";
import BgGradient from "@/components/common/bg-gradient";
import { Card } from "@/components/ui/card";

export default function UploadLoading() {
	return (
		<section className="min-h-screen animate-pulse">
			{/* Background */}
			<BgGradient />

			<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
				<div className="flex flex-col items-center justify-center gap-6 text-center">
					{/* Header skeleton */}
					<div className="flex flex-col items-center justify-center gap-6 text-center">
						{/* Badge skeleton */}
						<div className="h-12 w-64 rounded-full bg-gray-300/40" />

						{/* Title skeleton */}
						<div className="space-y-2">
							<div className="h-10 w-80 rounded-md bg-gray-300/40" />
							<div className="h-10 w-72 rounded-md bg-gray-300/30" />
						</div>

						{/* Description skeleton */}
						<div className="h-6 w-96 rounded-md bg-gray-300/30" />
					</div>

					{/* Upload form skeleton */}
					<div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
						{/* Form skeleton */}
						<div className="flex justify-end items-center gap-6">
							{/* File input skeleton */}
							<div className="h-10 flex-1 rounded-md bg-gray-300/40" />
							{/* Button skeleton */}
							<div className="h-10 w-32 rounded-md bg-gray-300/40" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
