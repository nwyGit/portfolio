import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { V1LayoutProps } from "./types";

const Layout: React.FC<V1LayoutProps> = ({ children }) => {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	);
};

export default Layout;