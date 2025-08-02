import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function fetchAndExtractPdfText(pdfUrl: string) {
	const pdf = await fetch(pdfUrl);
	const pdfBlob = await pdf.blob();
	const pdfBuffer = await pdfBlob.arrayBuffer();
	const loader = new PDFLoader(new Blob([pdfBuffer]));
	const docs = await loader.load();

	// Combine all pages
	return docs.map((doc) => doc.pageContent).join("\n");
}
