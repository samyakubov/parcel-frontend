
const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
})


/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	compress: true,

	// Note: swcMinify is now default in Next.js 15, so removed
	turbopack: {
		rules: {
			"*.svg": {
				loaders: ["@svgr/webpack"],
				as: "*.js",
			},
		},
	},
	experimental: {
		scrollRestoration: true,
	},

	compiler: {
		removeConsole: process.env.NODE_ENV === "production" ? {
			exclude: ["error", "warn"]
		} : false,
		reactRemoveProperties: process.env.NODE_ENV === "production",
	},

	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "www.google.com",
			},
		],
		formats: ["image/webp", "image/avif"],
		minimumCacheTTL: 60 * 60 * 24 * 30,
		dangerouslyAllowSVG: false,
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		unoptimized: false,
	},

	// eslint-disable-next-line require-await
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=(self)",
					},
					{
						key: "X-DNS-Prefetch-Control",
						value: "on"
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload"
					},
					{
						key: "Content-Security-Policy",
						value: "frame-ancestors 'none';"
					}
				],
			},
		]
	},

	// @ts-ignore
	webpack: (config, { dev, isServer }) => {
		config.resolve.fallback = {
			fs: false,
			tls: false,
			net: false,
			path: false,
			zlib: false,
			http: false,
			https: false,
			stream: false,
			crypto: false,
			buffer: false,
		}

		if (!dev && !isServer) {
			config.optimization = {
				...config.optimization,
				splitChunks: {
					...config.optimization.splitChunks,
					cacheGroups: {
						...config.optimization.splitChunks?.cacheGroups,
						vendor: {
							test: /[\\/]node_modules[\\/]/,
							name: "vendors",
							chunks: "all",
							maxSize: 244000,
						},
						common: {
							name: "common",
							minChunks: 2,
							priority: 10,
							reuseExistingChunk: true,
						},
					},
				},
			}
		}

		return config
	},
}

module.exports = withBundleAnalyzer(nextConfig)
