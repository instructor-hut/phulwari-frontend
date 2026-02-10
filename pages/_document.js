import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html>
			<Head>
				{/* Font */}
				<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

				{/* Front Template CSS */}
				<link rel="stylesheet" href="/assets/css/theme.min.css" />

				{/* Front Template Vendor CSS */}
				<link rel="stylesheet" href="/assets/css/vendor.min.css" />

				{/* CSS Custom */}
				<link rel="stylesheet" href="/assets/css/style.css" />

				{/* CSS Tabler Icons */}
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />

				{/* CSS Bootstrap Icons */}
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css" />
			</Head>
			<body>
				<Main />
				<NextScript />

				{/* Front Template JS */}
				<script async src="/assets/js/main.js"></script>

				{/* Front Template JS */}
				<script async src="/assets/js/theme.min.js"></script>

				{/* Front Template Vendor JS */}
				<script async src="/assets/js/theme.min.js"></script>
			</body>
		</Html>
	)
}