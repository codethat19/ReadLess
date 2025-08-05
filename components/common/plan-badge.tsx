import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { pricingPlans } from "@/utils/constants";
import { getUserPlanFromDatabase } from "@/lib/user";

export default async function PlanBadge() {
	const user = await currentUser();

	if (!user) return null;

	const email = user?.emailAddresses?.[0]?.emailAddress;

	if (!email) return null;

	const userPlan = await getUserPlanFromDatabase(email);

	// Get plan name from the plan ID
	const plan = pricingPlans.find((plan) => plan.id === userPlan);
	const planName = plan ? plan.name : "Free";

	const hasPaidPlan = userPlan !== "free";

	return (
		<Badge
			variant="outline"
			className={cn(
				"ml-2 bg-linear-r from-amber-100 to-amber-200 border-amber-300 hidden lg:flex flex-row items-center",
				!hasPaidPlan && "from-red-100 to-red-200 border-red-300"
			)}
		>
			<Crown
				className={cn(
					"w-3 h-3 mr-1 text-amber-600",
					!hasPaidPlan && "text-red-600"
				)}
			/>
			{planName}
		</Badge>
	);
}
