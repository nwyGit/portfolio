import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				{/* Essential meta tags */}
				<meta charSet="utf-8" />
				<meta name="theme-color" content="#023047" />
				
				{/* Favicon and app icons */}
				<link rel="icon" href="/favicon.ico" />
				<link rel="apple-touch-icon" href="/favicon.ico" />
				
				{/* Font preload for better performance */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link
					href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;500;600;700&family=Ubuntu:wght@400;500;700&family=Open+Sans:wght@400;600;700&display=swap"
					rel="stylesheet"
				/>
				
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
