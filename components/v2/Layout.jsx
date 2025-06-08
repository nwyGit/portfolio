import React, { useEffect, useState } from "react";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { fetchResume } from "@/utils/fetchData";

const Layout = ({ children }) => {
	const [resumeURL, setResumeURL] = useState("");

	useEffect(() => {
		async function getResume() {
			const data = await fetchResume();
			setResumeURL(data?.resumeURL || "");
		}
		getResume();
	}, []);

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar resumeURL={resumeURL} />
			<div className="flex-grow bg-white flex flex-col">{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
