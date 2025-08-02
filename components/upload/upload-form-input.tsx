"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface UploadFormInputProps {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	formRef: React.RefObject<HTMLFormElement | null>;
	isLoading: boolean;
}

export default function UploadFormInput({
	onSubmit,
	formRef,
	isLoading,
}: UploadFormInputProps) {
	return (
		<form className="flex flex-col gap-6" onSubmit={onSubmit} ref={formRef}>
			<div className="flex justify-end items-center gap-6">
				<Input
					type="file"
					id="file"
					name="file"
					accept="application/pdf"
					className={cn(isLoading && "opacity-50 cursor-not-allowed")}
					required
				/>
				<Button disabled={isLoading}>
					{isLoading ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Processing...
						</>
					) : (
						"Upload your PDF"
					)}
				</Button>
			</div>
		</form>
	);
}
