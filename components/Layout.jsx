import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Bubbles from "./Bubbles";

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
