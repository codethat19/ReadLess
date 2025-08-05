"use client";

import React, { useRef, useState } from "react";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import {
	generatePdfSummary,
	storePdfSummaryAction,
} from "@/actions/upload-actions";
import { formatFileName } from "@/utils/format-title";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "./loading-skeleton";

const schema = z.object({
	file: z
		.instanceof(File, { message: "Invalid File" })
		.refine(
			(file) => file.size <= 1024 * 1024 * 20,
			"File must be less than 20MB"
		)
		.refine(
			(file) => file.type.startsWith("application/pdf"),
			"File must be a PDF"
		),
});

export default function UploadForm() {
	const formRef = useRef<HTMLFormElement>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const router = useRouter();

	const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
		onClientUploadComplete: (res) => {
			// console.log("uploaded successfully!", res);
			// toast.success("File uploaded successfully!");
		},
		onUploadError: (err) => {
			// console.error("error occurred while uploading", err);
			toast.error(`Error occurred while uploading: ${err.message}`);
		},
		onUploadBegin: (data) => {
			console.log("upload has begun for", data);
			toast.info("Uploading file...");
		},
	});
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			setIsLoading(true);

			const formData = new FormData(e.target as HTMLFormElement);
			const file = formData.get("file") as File;
			// console.log(file);

			// Validate the file
			const validatedFileds = schema.safeParse({ file });
			if (!validatedFileds.success) {
				console.log(
					validatedFileds.error.flatten().fieldErrors.file?.[0] ??
						"Invalid File"
				);
				toast.error(
					validatedFileds.error.flatten().fieldErrors.file?.[0] ??
						"Invalid File"
				);
				setIsLoading(false);
				return;
			}
			// Upload the file to uploadthing
			const response = await startUpload([file]);
			console.log(`upload-form: response : ${response}`);
			if (!response) {
				console.error("error occurred while uploading");
				toast.error("Error occurred while uploading");
				setIsLoading(false);
				return;
			}
			// Parse the file using langchain
			toast.info("Generating summary using AI...");
			// Summarize the pdf using AI

			const result = await generatePdfSummary(response);
			// console.log(`upload-form: summary : ${{ summary }}`);

			const { data = null, message = null } = result || {};

			if (!data) {
				toast.error(message);
				return;
			}
			if (data) {
				let storeResult: any;
				formRef.current?.reset();
				if (data.summary) {
					toast.success(
						"Summary generated successfully. Saving your summary..."
					);
					// Save the summary to the database
					storeResult = await storePdfSummaryAction({
						// userId: response[0].userId,
						fileUrl: response[0].ufsUrl,
						summary: data.summary,
						title: formatFileName(file.name),
						fileName: file.name,
					});
					toast.success("✨ Summary saved successfully");

					formRef.current?.reset();
					// Redirect to the [id] summary page
					router.push(`/summaries/${storeResult.data.id}`);
					// return;
				}
			}
		} catch (err) {
			console.error("Error occurred", err);
			formRef.current?.reset();
			toast.error("Error occurred while uploading");
			setIsLoading(false);
			return;
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
			<UploadFormInput
				formRef={formRef}
				onSubmit={handleSubmit}
				isLoading={isLoading}
			/>
			{isLoading && <LoadingSkeleton />}
		</div>
	);
}
