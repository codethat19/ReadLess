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
		paymentLink: "https://www.google.com/",
		priceId: isDev ? "price_1Rs0RYFFDfMTjSeCPS6cDJAQ" : "",
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
		paymentLink: "https://buy.stripe.com/test_bJe5kDguqgEs5S63t587K01",
		priceId: isDev ? "price_1Rs0RYFFDfMTjSeC1iqPqz2p" : "",
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
