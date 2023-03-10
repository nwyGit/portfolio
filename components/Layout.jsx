import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Bubbles from './Bubbles';

const Layout = ({ children }) => {
	return (
		<>
			<Navbar />
			<Bubbles />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
