import React from "react";
import { MotionDiv, MotionP, MotionSpan } from "../common/motion-wrapper";
import { containerVariants, itemVariants } from "@/utils/constants";

export default function ContentSection({
	title,
	points,
}: {
	title: string;
	points: string[];
}) {
	return (
		<MotionDiv
			variants={containerVariants}
			key={points.join("")}
			initial="hidden"
			animate="visible"
			exit="exit"
			className="space-y-3"
		>
			{points.map((point, index) => {
				// Split point into emoji (first token) and the rest of the sentence
				const [emoji, ...rest] = point.split(" ");
				return (
					<div key={index} className="flex items-center gap-3">
						{/* Emoji bullet */}
						<MotionSpan
							// variants={itemVariants}
							className="text-xl select-none mt-1"
						>
							{emoji}
						</MotionSpan>

						{/* Point text */}
						<MotionP
							// variants={itemVariants}
							className="flex-1 leading-relaxed"
						>
							{rest.join(" ")}
						</MotionP>
					</div>
				);
			})}
		</MotionDiv>
	);
}
