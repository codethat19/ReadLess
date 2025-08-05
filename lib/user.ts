import { User } from "@clerk/nextjs/server";
import { getDbConnection } from "./db";
import { getUserUploadCount } from "./summaries";
import { pricingPlans } from "@/utils/constants";
import { currentUser } from "@clerk/nextjs/server";

export async function getPriceIdForActiveUser(email: string) {
	const sql = await getDbConnection();
	const user =
		await sql`SELECT price_id FROM users WHERE email = ${email} AND status = 'active'`;

	return user?.[0]?.price_id || null;
}

export async function hasActivePlan(email: string) {
	const sql = await getDbConnection();
	const query =
		await sql`SELECT price_id, status FROM users WHERE email = ${email} AND status = 'active' AND price_id IS NOT NULL`;

	return query && query.length > 0;
}

// Helper function to get user email from Clerk user ID
async function getUserEmailFromClerkId(
	clerkUserId: string
): Promise<string | null> {
	try {
		const user = await currentUser();
		if (user?.id === clerkUserId) {
			return user.emailAddresses?.[0]?.emailAddress || null;
		}
		return null;
	} catch (error) {
		console.error("Error getting user email from Clerk ID:", error);
		return null;
	}
}

// Helper function to determine user plan from database
export async function getUserPlanFromDatabase(email: string): Promise<string> {
	const sql = await getDbConnection();
	const user =
		await sql`SELECT price_id, status FROM users WHERE email = ${email}`;

	console.log(
		`getUserPlanFromDatabase - email: ${email}, user record:`,
		user
	);

	if (!user || user.length === 0) {
		console.log("No user record found, defaulting to free");
		return "free"; // Default to free if no user record
	}

	const userRecord = user[0];
	console.log(
		`User record - price_id: ${userRecord.price_id}, status: ${userRecord.status}`
	);

	// If user has an active subscription with a price_id, they're likely on a paid plan
	if (userRecord.status === "active" && userRecord.price_id) {
		// Check if the price_id matches any of our known price IDs
		const matchingPlan = pricingPlans.find(
			(plan) => plan.priceId === userRecord.price_id
		);
		console.log(
			`Matching plan for price_id ${userRecord.price_id}:`,
			matchingPlan
		);

		if (matchingPlan) {
			console.log(`Found matching plan: ${matchingPlan.id}`);
			return matchingPlan.id;
		}

		// If price_id exists but doesn't match known IDs, assume basic
		console.log(
			"Price ID exists but doesn't match known plans, assuming basic"
		);
		return "basic";
	}

	console.log("No active subscription or price_id, defaulting to free");
	return "free";
}

export async function hasReachedUploadLimit(userId: string) {
	const uploadCount = await getUserUploadCount(userId);

	// Get the user's email from Clerk
	const userEmail = await getUserEmailFromClerkId(userId);

	if (!userEmail) {
		console.log("No user email found for userId:", userId);
		return {
			hasReachedLimit: false,
			uploadLimit: 5,
		};
	}

	// Determine user plan from database
	const userPlan = await getUserPlanFromDatabase(userEmail);

	console.log(`User email: ${userEmail}, User plan: ${userPlan}`);

	const uploadLimit: number =
		userPlan === "pro" ? 1000 : userPlan === "basic" ? 10 : 5;

	console.log(`uploadCount: ${uploadCount}, uploadLimit: ${uploadLimit}`);

	return {
		hasReachedLimit: uploadCount >= uploadLimit,
		uploadLimit,
	};
}

export async function getSubscriptionStatus(user: User) {
	const hasSubscription = await hasActivePlan(
		user.emailAddresses[0].emailAddress
	);

	return hasSubscription;
}
