import React from "react";
import { Card, CardContent } from "../ui/card";

export default function LoadingSkeleton() {
	return (
		<Card className="relative px-2 h-[300px] sm:h-[400px] lg:h-[500px] w-full xl:w-[600px] overflow-hidden bg-linear-to-br from-background via-background/95 to-rose-500/5 backdrop-blur-lg shadow-2xl rounded-3xl border border-rose-500/10 animate-pulse">
			{/* Header placeholder */}
			<div className="px-6 pt-10 pb-6">
				<div className="h-8 w-2/3 mx-auto rounded-md bg-rose-300/40 backdrop-blur-xs" />
			</div>
			{/* Content placeholder */}
			<CardContent className="space-y-4 overflow-y-auto h-full pb-14">
				{Array.from({ length: 6 }).map((_, i) => (
					<div key={i} className="flex items-center gap-3">
						<div className="h-4 w-4 rounded-full bg-rose-200/30" />
						<div className="flex-1 space-y-2">
							<div className="h-4 rounded bg-muted/30 w-full" />
							<div className="h-4 rounded bg-muted/20 w-4/5" />
						</div>
					</div>
				))}
			</CardContent>
			{/* Footer placeholder (navigation controls)
			<div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-card">
				<div className="h-10 w-full rounded-md bg-muted/30" />
			</div> */}
		</Card>
	);
}
