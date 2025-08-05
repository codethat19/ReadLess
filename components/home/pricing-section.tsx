import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon } from "lucide-react";
import {
	containerVariants,
	itemVariants,
	pricingPlans,
	listVariants,
} from "@/utils/constants";
import { MotionDiv, MotionSection } from "../common/motion-wrapper";
import { currentUser } from "@clerk/nextjs/server";
import PaymentButton from "../common/payment-button";

type PriceType = {
	name: string;
	price: number;
	description: string;
	items: string[];
	id: string;
	paymentLink: string;
	priceId: string;
	userId: string | null;
};

const PricingCard = ({
	name,
	price,
	description,
	items,
	id,
	paymentLink,
	priceId,
	userId,
}: PriceType) => {
	const isUserSubscribed = userId ? true : false;
	return (
		<MotionDiv
			// variants={listVariants}

			whileHover={{ scale: 1.05 }}
			className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300"
		>
			<div
				className={cn(
					"relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl",
					id === "pro" && "border-rose-500 gap-5 border-2"
				)}
			>
				<div className="flex justify-between items-center gap-4">
					<div>
						<p className="text-lg lg:text-xl font-bold capitalize">
							{name}
						</p>
						<p className="text-base-content/80 mt-2">
							{description}
						</p>
					</div>
				</div>
				{id !== "free" && (
					<div className="flex gap-2">
						<p className="text-5xl tracking-tight font-extrabold">
							${price}
						</p>
						<div className="flex flex-col justify-end mb-[4px]">
							<p className="text-xs uppercase font-semibold">
								USD
							</p>
							<p className="text-xs">/month</p>
						</div>
					</div>
				)}
				<div className="space-y-2.5 leading-relaxed text-base flex-1">
					{items.map((item, idx) => (
						<li key={idx} className="flex items-center gap-2">
							<CheckIcon size={18} />
							<span>{item}</span>
						</li>
					))}
				</div>
				<div className="space-y-2 flex justify-center w-full">
					{id === "free" ? (
						<Link
							href={userId ? "/dashboard" : "/sign-in"}
							className={cn(
								"w-full rounded-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-700 text-white border-2 py-2 border-green-700"
							)}
						>
							{userId ? "Go to Dashboard" : "Get Started Free"}{" "}
							<ArrowRight size={18} />
						</Link>
					) : (
						userId ? (
							<PaymentButton
								priceId={priceId}
								className={cn(
									id === "pro"
										? "border-rose-900"
										: "border-rose-100 from-rose-400 to-rose-500"
								)}
							>
								Buy Now
							</PaymentButton>
						) : (
							<Link
								href="/sign-in"
								className={cn(
									"w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2",
									id === "pro"
										? "border-rose-900"
										: "border-rose-100 from-rose-400 to-rose-500"
								)}
							>
								Sign In to Purchase <ArrowRight size={18} />
							</Link>
						)
					)}
				</div>
			</div>
		</MotionDiv>
	);
};

export default async function PricingSection() {
	const user = await currentUser();
	const userId = user?.id || null;

	return (
		<MotionSection
			variants={containerVariants}
			initial="hidden"
			whileInView={"visible"}
			viewport={{ once: true, margin: "-100px" }}
			className="relative overflow-hidden"
			id="pricing"
		>
			<div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
				<MotionDiv className="flex items-center justify-center">
					<h2 className="uppercase font-bold text-xl mb-8 text-rose-500">
						Pricing
					</h2>
				</MotionDiv>
				<MotionDiv
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 0.5,
						delay: 0.3,
					}}
					// variants={listVariants}
					className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8"
				>
					{pricingPlans.map((plan) => (
						<PricingCard key={plan.id} {...plan} userId={userId} />
					))}
				</MotionDiv>
			</div>
		</MotionSection>
	);
}
