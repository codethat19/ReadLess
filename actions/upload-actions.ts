"use server";

import { ClientUploadedFileData } from "uploadthing/types";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { generateSummaryFromGemini } from "@/lib/geminiai";

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
