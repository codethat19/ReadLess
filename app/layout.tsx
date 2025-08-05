import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const ORIGIN_URL = "https://readless.vercel.app";

const fontSans = FontSans({
	variable: "--font-sans",
	subsets: ["latin"],
	weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: "ReadLess - AI-Powered PDF Summarization",
	description:
		"Save hours of reading time by summarizing your PDFs into clear, accurate summaries with AI",
	openGraph: {
		images: [
			{
				url: "/readless.png",
			},
		],
	},
	metadataBase: new URL(ORIGIN_URL),
	alternates: {
		canonical: ORIGIN_URL,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`${fontSans.variable} font-sans antialiased`}>
					<div className="flex flex-col min-h-screen">
						<Header />
						<main className="flex-1">{children}</main>
						<Footer />
					</div>
					<Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
