import React, { useEffect, useState, ReactNode } from "react";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import ErrorBoundary from "./shared/component/ErrorBoundary";
import { fetchResume } from "@/utils/fetchData";

interface LayoutProps {
	children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const [resumeURL, setResumeURL] = useState<string>("");

	useEffect(() => {
		async function getResume() {
			try {
				const data = await fetchResume();
				setResumeURL(data?.resumeURL || "");
			} catch (error) {
				if (process.env.NODE_ENV === 'development') {
					console.error("Failed to fetch resume:", error);
				}
				// Continue without resume URL
			}
		}
		getResume();
	}, []);

	return (
		<ErrorBoundary>
			<div className="flex flex-col min-h-screen">
				<Navbar resumeURL={resumeURL} />
				<div className="flex-grow bg-white flex flex-col">{children}</div>
				<Footer />
			</div>
		</ErrorBoundary>
	);
};

export default Layout;
