"use client";

import React from "react";
import UploadFormInput from "./upload-form-input";
import { file, z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";

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
	const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
		onClientUploadComplete: (res) => {
			console.log("uploaded successfully!", res);
			toast.success("File uploaded successfully!");
		},
		onUploadError: (err) => {
			console.error("error occurred while uploading", err);
			toast.error(`Error occurred while uploading: ${err.message}`);
		},
		onUploadBegin: (file) => {
			console.log("upload has begun for", file);
			toast.info("Uploading file...");
		},
	});
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const file = formData.get("file") as File;
		console.log(file);

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
			return;
		}
		// Upload the file to uploadthing
		const response = await startUpload([file]);
		console.log(response);
		if (!response) {
			console.error("error occurred while uploading");
			toast.error("Error occurred while uploading");
			return;
		}
		// Parse the file using langchain

		// Summarize the pdf using AI
		// Save the summary to the database
		// Redirect to the [id] summary page
	}
	return (
		<div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
			<UploadFormInput onSubmit={handleSubmit} />
		</div>
	);
}
