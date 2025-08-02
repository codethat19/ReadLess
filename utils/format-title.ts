export function formatFileName(fileName: string): string {
	// Remove extension
	const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, "");

	// Replace hyphens/underscores with spaces and capitalize each word
	return nameWithoutExtension
		.replace(/[-_]+/g, " ")
		.replace(/\b\w/g, (char) => char.toUpperCase());
}
