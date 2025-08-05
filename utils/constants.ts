import { Variants } from "motion/react";
import { isDev } from "./helpers";

export const pricingPlans = [
	{
		name: "Basic",
		price: 9,
		description: "For casual users",
		items: [
			"10 PDF summaries per month",
			"Standard processing",
			"Email support",
		],
		id: "basic",
		paymentLink: isDev
			? "https://buy.stripe.com/test_dRm7sLba6fAobcq8Np87K00"
			: "https://buy.stripe.com/live_YOUR_BASIC_PAYMENT_LINK_HERE",
		priceId: isDev
			? "price_1Rs0RYFFDfMTjSeCPS6cDJAQ"
			: "price_YOUR_BASIC_PRICE_ID",
	},
	{
		name: "Pro",
		price: 19,
		description: "For professionals and teams",
		items: [
			"Unlimited PDF summaries",
			"Priority processing",
			"24/7 priority support",
			"Markdown Export",
		],
		id: "pro",
		paymentLink: isDev
			? "https://buy.stripe.com/test_bJe5kDguqgEs5S63t587K01"
			: "https://buy.stripe.com/live_YOUR_PRO_PAYMENT_LINK_HERE",
		priceId: isDev
			? "price_1Rs0RYFFDfMTjSeC1iqPqz2p"
			: "price_YOUR_PRO_PRICE_ID",
	},
];

export const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.1,
		},
	},
};

export const itemVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		transition: {
			type: "spring",
			damping: 15,
			stiffness: 50,
			duration: 0.8,
		},
	},
};

export const listVariants: Variants = {
	hidden: { opacity: 0, x: -40 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			type: "spring",
			// damping: 20,
			// stiffness: 80,
			duration: 0.2,
		},
	},
};
