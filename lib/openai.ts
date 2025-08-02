"use server";

import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import OpenAI from "openai";
const client = new OpenAI({
	apiKey: process.env["OPENAI_API_KEY"],
});

export async function generateSummaryFromOpenAI(summary: string) {
	try {
		const response = await client.responses.create({
			model: "gpt-4.1",
			input: [
				{
					role: "system",
					content: SUMMARY_SYSTEM_PROMPT,
				},
				{
					role: "user",
					content: `Transform this document into
                    an engaging, easy-to-read summary with contextually 
                    relevant emojis and proper markdown formatting: \n\n${summary}`,
				},
			],
			max_output_tokens: 1500,
			temperature: 0.7,
		});
		console.log(`openai: response : ${response.output_text}`);
		return response.output_text;
	} catch (err: any) {
		if (err?.status === 429) {
			throw new Error("RATE_LIMIT_EXCEEDED");
		}
		throw err;
	}
}
