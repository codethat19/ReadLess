import React from "react";
import { FileText, Github, Twitter, Mail, Heart, Linkedin } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-50 border-t border-gray-200">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Brand Section */}
					<div className="col-span-1 md:col-span-2">
						<div className="flex items-center gap-2 mb-4">
							<FileText className="w-6 h-6 text-rose-600" />
							<span className="font-bold text-xl text-gray-900">
								Sommaire
							</span>
						</div>
						<p className="text-gray-600 mb-6 max-w-md">
							Transform your PDFs into concise, accurate summaries
							powered by AI. Save hours of reading time and
							extract key insights instantly.
						</p>
						<div className="flex space-x-4">
							{/* <Link
								href="https://twitter.com/sommaire"
								className="text-gray-400 hover:text-rose-600 transition-colors duration-200"
								aria-label="Twitter"
							>
								<Twitter className="w-5 h-5" />
							</Link> */}
							<Link
								href="https://www.linkedin.com/in/aayush-rastogi"
								className="text-gray-400 hover:text-rose-600 transition-colors duration-200"
								aria-label="GitHub"
								target="_blank"
							>
								<Linkedin className="w-5 h-5" />
							</Link>
							<Link
								href="mailto:aayushrastogi1997@gmail.com"
								className="text-gray-400 hover:text-rose-600 transition-colors duration-200"
								aria-label="Email"
								target="_blank"
							>
								<Mail className="w-5 h-5" />
							</Link>
						</div>
					</div>

					{/* Product Links */}
					<div>
						<h3 className="font-semibold text-gray-900 mb-4">
							Product
						</h3>
						<ul className="space-y-3">
							<li>
								<Link
									href="/#pricing"
									className="text-gray-600 hover:text-rose-600 transition-colors duration-200"
								>
									Pricing
								</Link>
							</li>
							<SignedIn>
								<li>
									<Link
										href="/dashboard"
										className="text-gray-600 hover:text-rose-600 transition-colors duration-200"
									>
										Dashboard
									</Link>
								</li>
								<li>
									<Link
										href="/upload"
										className="text-gray-600 hover:text-rose-600 transition-colors duration-200"
									>
										Upload PDF
									</Link>
								</li>
							</SignedIn>
							<SignedOut>
								<li>
									<Link
										href="/sign-in"
										className="text-gray-600 hover:text-rose-600 transition-colors duration-200"
									>
										Sign In
									</Link>
								</li>
								<li>
									<Link
										href="/sign-up"
										className="text-gray-600 hover:text-rose-600 transition-colors duration-200"
									>
										Sign Up
									</Link>
								</li>
							</SignedOut>
						</ul>
					</div>

					{/* Company Links */}
					<div>
						<h3 className="font-semibold text-gray-900 mb-4">
							Company
						</h3>
						<ul className="space-y-3">
							{/* <li>
								<Link
									href="/privacy"
									className="text-gray-600 hover:text-rose-600 transition-colors duration-200"
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href="/terms"
									className="text-gray-600 hover:text-rose-600 transition-colors duration-200"
								>
									Terms of Service
								</Link>
							</li>
							<li>
								<Link
									href="/support"
									className="text-gray-600 hover:text-rose-600 transition-colors duration-200"
								>
									Support
								</Link>
							</li> */}
							<li>
								<Link
									href="mailto:aayushrastogi1997@gmail.com"
									className="text-gray-600 hover:text-rose-600 transition-colors duration-200"
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Section */}
				<div className="border-t border-gray-200 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
					<p className="text-gray-500 text-sm">
						© {currentYear} Sommaire. All rights reserved.
					</p>
					<p className="text-gray-500 text-sm flex items-center gap-1 mt-2 sm:mt-0">
						Made with <Heart className="w-4 h-4 text-rose-500" />{" "}
						for better reading
					</p>
				</div>
			</div>
		</footer>
	);
}
