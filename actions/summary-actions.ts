"use server";

import { getDbConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummaryAction(summaryId: string) {
	const user = await currentUser();
	const userId = user?.id;

	if (!userId) {
		throw new Error("User not found");
	}
	try {
		const db = await getDbConnection();
		const result =
			await db`DELETE FROM pdf_summaries WHERE id = ${summaryId} AND user_id = ${userId} RETURNING id;`;

		if (result.length > 0) {
			revalidatePath("/dashboard");

			return {
				success: true,
				message: "Summary deleted successfully",
			};
		}

		return {
			success: false,
			message: "Summary not found",
		};
	} catch (err) {
		console.error(err);
		return {
			success: false,
			message: "Failed to delete summary",
		};
	}
}
