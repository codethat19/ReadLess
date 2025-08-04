import { ArrowRight, Sparkles } from "lucide-react";
import BgGradient from "./bg-gradient";
import Link from "next/link";
import { Button } from "../ui/button";

export default function UpgradeRequired() {
	return (
		<div className="relative min-h-[50vh]">
			{/* Decorative background gradient */}
			<BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />

			<div className="container px-8 py-16">
				<div className="flex flex-col items-center justify-center gap-8 text-center max-w-2xl mx-auto">
					{/* Label */}
					<div className="flex items-center gap-2 text-rose-500">
						<Sparkles className="w-6 h-6" />
						<span className="text-sm font-medium uppercase tracking-wider">
							Premium Feature
						</span>
					</div>

					<h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
						Subscription Required
					</h1>

					<p
						className="text-lg leading-8 text-gray-600 border-2 border-rose-100 bg-white/50
                    backdrop-blur-xs rounded-lg p-6 border-dashed max-w-xl"
					>
						This feature is available on paid plans. Upgrade your
						account to unlock unlimited summaries, priority
						processing and more. 💖
					</p>

					<Button asChild className="bg-rose-500 hover:bg-rose-600">
						<Link
							href="/#pricing"
							className="inline-flex items-center justify-center rounded-md bg-rose-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-rose-600 focus:outline-none focus-visible:ring focus-visible:ring-rose-400/50 active:bg-rose-700 transition-colors"
						>
							View Plans <ArrowRight className="w-4 h-4" />
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
