import React from "react";

export default function ContentSection({
	title,
	points,
}: {
	title: string;
	points: string[];
}) {
	return (
		<div className="space-y-3 px-0 max-w-prose mx-auto">
			{points.map((point, index) => {
				// Split point into emoji (first token) and the rest of the sentence
				const [emoji, ...rest] = point.split(" ");
				return (
					<div key={index} className="flex items-start gap-3">
						{/* Emoji bullet */}
						<span className="text-xl select-none mt-1">
							{emoji}
						</span>

						{/* Point text */}
						<p className="flex-1 leading-relaxed">
							{rest.join(" ")}
						</p>
					</div>
				);
			})}
		</div>
	);
}
