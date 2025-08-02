"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UploadFormInputProps {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function UploadFormInput({ onSubmit }: UploadFormInputProps) {
	return (
		<form className="flex flex-col gap-6" onSubmit={onSubmit}>
			<div className="flex justify-end items-center gap-6">
				<Input
					type="file"
					id="file"
					name="file"
					accept="application/pdf"
					className=""
					required
				/>
				<Button>Upload your PDF</Button>
			</div>
		</form>
	);
}
