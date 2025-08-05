import Stripe from "stripe";
import { getDbConnection } from "./db";

export async function handleSubscriptionDeleted({
	subscriptionId,
	stripe,
}: {
	subscriptionId: string;
	stripe: Stripe;
}) {
	console.log("Subscription deleted", subscriptionId);

	try {
		const subscription = await stripe.subscriptions.retrieve(
			subscriptionId
		);

		const sql = await getDbConnection();

		await sql`UPDATE users SET status='cancelled' WHERE customer_id = ${subscription.customer}`;
		console.log("User status updated to cancelled");
	} catch (err) {
		console.log("Error handling subscription deleted", err);
		throw err;
	}
}

export async function handleCheckoutSessionCompleted({
	session,
	stripe,
}: {
	session: Stripe.Checkout.Session;
	stripe: Stripe;
}) {
	console.log("Checkout session completed", session);
	const customerId = session.customer as string;
	const customer = await stripe.customers.retrieve(customerId);
	const priceId = session.line_items?.data[0]?.price?.id;
	const userId = session.metadata?.userId;

	const sql = await getDbConnection();

	if ("email" in customer && priceId) {
		const { email, name } = customer as Stripe.Customer;

		await createOrUpdateUser({
			sql,
			email: email as string,
			fullName: name as string,
			customerId,
			priceId,
			status: "active",
			userId: userId,
		});

		await createPayment({
			sql,
			session,
			priceId: priceId as string,
			userEmail: email as string,
		});
	}
}

async function createOrUpdateUser({
	sql,
	email,
	fullName,
	customerId,
	priceId,
	status,
	userId,
}: {
	sql: any;
	email: string;
	fullName: string;
	customerId: string;
	priceId: string;
	status: string;
	userId?: string;
}) {
	try {
		// Check if a user with this email already exists
		const existingUsers =
			await sql`SELECT * FROM users WHERE email = ${email}`;

		if (existingUsers.length === 0) {
			// No record found – insert new user
			await sql`INSERT INTO users (email, full_name, customer_id, price_id, status, clerk_user_id)
                VALUES (${email}, ${fullName}, ${customerId}, ${priceId}, ${status}, ${userId || null})`;
		} else {
			// User exists – update relevant fields in case they changed
			await sql`UPDATE users SET full_name = ${fullName}, customer_id = ${customerId}, price_id = ${priceId}, status = ${status}, clerk_user_id = ${userId || null} WHERE email = ${email}`;
		}
	} catch (error) {
		console.error("Error creating or updating user", error);
	}
}

async function createPayment({
	sql,
	session,
	priceId,
	userEmail,
}: {
	sql: any;
	session: Stripe.Checkout.Session;
	priceId: string;
	userEmail: string;
}) {
	try {
		const { amount_total, id, status } = session;
		const payment =
			await sql`INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email)
        VALUES (${amount_total}, ${status}, ${id}, ${priceId}, ${userEmail})`;

		return payment;
	} catch (err) {
		console.log("Error creating payment", err);
	}
}
