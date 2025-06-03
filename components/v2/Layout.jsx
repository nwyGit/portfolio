import React from "react";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

const Layout = ({ resumeURL, children }) => {
	return (
		<>
			<Navbar resumeURL={resumeURL}/>
			{children}
			<Footer />
		</>
	);
};

export default Layout;
