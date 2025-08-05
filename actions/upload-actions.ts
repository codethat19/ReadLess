"use server";

import { ClientUploadedFileData } from "uploadthing/types";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { auth } from "@clerk/nextjs/server";
import { getDbConnection } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface pdfSummaryType {
	userId?: string;
	fileUrl: string;
	summary: string;
	title: string;
	fileName: string;
}

export async function generatePdfSummary(
	uploadResponse: ClientUploadedFileData<{
		userId: string;
		file: string;
	}>[]
) {
	console.log(`upload-actions: uploadResponse : ${uploadResponse}`);
	if (!uploadResponse) {
		return {
			success: false,
			message: "File Upload Failed",
			data: null,
		};
	}

	const { serverData } = uploadResponse[0];
	const { userId, file: pdfUrl } = serverData;

	if (!pdfUrl) {
		return {
			success: false,
			message: "File URL is missing",
			data: null,
		};
	}

	try {
		const pdfText = await fetchAndExtractPdfText(pdfUrl);
		// console.log(`upload-actions: pdfText : ${pdfText}`);

		let summary;

		try {
			summary = await generateSummaryFromOpenAI(pdfText);
			// console.log(`upload-actions: summary : ${{ summary }}`);
			// toast.success("Summary generated successfully");
		} catch (err) {
			console.log(err);
			// Call Gemini code
			if (err instanceof Error && err.message === "RATE_LIMIT_EXCEEDED") {
				try {
					summary = await generateSummaryFromGemini(pdfText);
				} catch (geminiError) {
					console.error(
						"Gemini API failed after OpenAI quote exceeded",
						geminiError
					);
					throw new Error(
						"Gemini API failed after OpenAI quote exceeded"
					);
				}
			}
		}

		if (!summary) {
			return {
				success: false,
				message: "Failed to generate summary",
				data: null,
			};
		}
		return {
			success: true,
			message: "Summary generated successfully",
			data: {
				summary,
			},
		};
	} catch (err) {
		return {
			success: false,
			message: "File URL is missing",
			data: null,
		};
	}
}

async function savePdfSummary({
	userId,
	fileUrl,
	summary,
	title,
	fileName,
}: pdfSummaryType) {
	//sql inserting pdf summary
	try {
		const sql = await getDbConnection();
		const [savedSummary] = await sql`
		INSERT INTO pdf_summaries (
			user_id,
			original_file_url,
			summary_text,
			title,
			file_name
		) VALUES (
			${userId},
			${fileUrl},
			${summary},
			${title},
			${fileName}
		) RETURNING id, summary_text`;
		return savedSummary;
	} catch (err) {
		console.error("Error saving PDF Summary", err);
		throw err;
	}
}

export async function storePdfSummaryAction({
	userId,
	fileUrl,
	summary,
	title,
	fileName,
}: pdfSummaryType) {
	// user is logged in and has a userId
	// save pdf summary
	// savepdfSummary()

	let savedSummary: any;

	try {
		const { userId } = await auth();
		if (!userId) {
			return {
				success: false,
				message: "User not authenticated",
			};
		}

		savedSummary = await savePdfSummary({
			userId,
			fileUrl,
			summary,
			title,
			fileName,
		});
		if (!savedSummary) {
			return {
				success: false,
				message: "Failed to save PDF summary",
			};
		}
	} catch (error) {
		return {
			success: false,
			message:
				error instanceof Error
					? error.message
					: "Failed to store PDF summary",
		};
	}
	//Revalidate our cache
	revalidatePath(`/summaries/${savedSummary.id}`);

	return {
		success: true,
		message: "PDF summary saved successfully",
		data: {
			title: fileName,
			summary: savedSummary,
			id: savedSummary.id,
		},
	};
}
