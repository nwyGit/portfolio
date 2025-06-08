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
		<>
			<Navbar resumeURL={resumeURL} />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
