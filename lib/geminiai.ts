import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateSummaryFromGemini(summary: string) {
	try {
		// For text-only input, use the gemini-pro model
		const model = genAI.getGenerativeModel({
			model: "gemini-1.5-flash",
			generationConfig: {
				temperature: 0.7,
				maxOutputTokens: 1500,
			},
		});
		const prompt = {
			contents: [
				{
					role: "user",
					parts: [
						{ text: SUMMARY_SYSTEM_PROMPT },
						{
							text: `${SUMMARY_SYSTEM_PROMPT} \n\n
						Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting: \n\n${summary}`,
						},
					],
				},
			],
		};
		const result = await model.generateContent(prompt);
		const response = result.response;

		if (!response) {
			throw new Error("No response from Gemini API");
		}

		const text = response.text();

		console.log(`gemini: response : ${text}`);
		return text;
	} catch (err: any) {
		// if (err?.status === 429) {
		// 	throw new Error("RATE_LIMIT_EXCEEDED");
		// }
		console.error("Gemini API failed", err);
		throw err;
	}
}
