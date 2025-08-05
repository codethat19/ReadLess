import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	serverExternalPackages: ["motion"],
	typescript: {
		ignoreBuildErrors: false,
	},
	eslint: {
		ignoreDuringBuilds: false,
	},
};

export default nextConfig;
