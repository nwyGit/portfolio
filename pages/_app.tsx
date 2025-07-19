import "@/styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			
			{/* Google Analytics */}
			<Script
				src="https://www.googletagmanager.com/gtag/js?id=AW-17247820128"
				strategy="afterInteractive"
			/>
			<Script id="google-analytics" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', 'AW-17247820128');
				`}
			</Script>
			
			<Component {...pageProps} />
		</>
	);
}
