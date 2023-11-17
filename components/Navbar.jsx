import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../styles";
import {
	navVariants,
	buttonVariants,
	navSidebarVariants,
} from "@/utils/motion";
import Image from "next/image";
import Link from "next/link";

// navItems attributes
const navItems = ["About", "Projects", "Contact"];

const navComponent = (index, element) => {
	return (
		<motion.li
			variants={navVariants(index)}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, amount: 0.25 }}
			key={index}
			className="hover:text-secondary-contrast-text"
		>
			{element}
		</motion.li>
	);
};

const navLinks = navItems.map((item, index) => {
	const element = <a href={`#${item}`}>{item}</a>;
	return navComponent(index, element);
});

const resume = () => {
	const element = (
		<motion.button
			variants={buttonVariants}
			whileHover="hover"
			whileTap="pressed"
			className={`${styles.button} py-1 px-4`}
		>
			<a href="/resume.pdf">Resume</a>
		</motion.button>
	);
	return navComponent(navItems.length, element);
};

// NavBar component
const Navbar = () => {
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		if (showMenu) {
			// Disable scrolling
			document.body.classList.add("overflow-hidden");
		} else {
			// Enable scrolling
			document.body.classList.remove("overflow-hidden");
		}

		return () => {
			// Clean up function to re-enable scrolling
			document.body.classList.add("overflow-hidden");
		};
	}, [showMenu]);

	return (
		<>
			{/* Large screen bar */}
			<nav className={`${styles.lgNavBar}`}>
				{!showMenu && (
					<>
						<motion.div
							variants={navVariants(-0.5)}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true, amount: 0.25 }}
							key="logo"
							className="fixed ml-10 hover:text-secondary-contrast-text"
						>
							<Link href="/">
								<Image src="/logo.svg" alt="logo" width={40} height={40} />
							</Link>
						</motion.div>
						<ul className={`${styles.flexEnd} gap-16 items-center`}>
							{navLinks}
							{resume()}
						</ul>
					</>
				)}
			</nav>

			{/* Mobile screen bar */}
			<nav className={`${styles.smNavBar}`}>
				<Link href="/">
					<Image src="/logo.svg" alt="logo" width={40} height={40} />
				</Link>
				<button onClick={() => setShowMenu(!showMenu)} className={``}>
					<Image src="/menu.svg" alt="Menu" width={30} height={30} />
				</button>
			</nav>
			{/* Background blur overlay */}
			{showMenu && (
				<div
					className={`${styles.blurOverlay} z-20`}
					onClick={() => setShowMenu(!showMenu)}
				></div>
			)}
			{/* nav sidebar */}
			<motion.aside
				variants={navSidebarVariants}
				initial="hidden"
				animate={showMenu ? "show" : "hidden"}
				className={`${styles.popUpNav} ${showMenu ? "" : "hidden"} z-30`}
			>
				{/* close button */}
				<div className={`${styles.flexEnd} pt-4 pr-12`}>
					<button onClick={() => setShowMenu(!showMenu)}>
						<Image
							src="/close.svg"
							alt="Menu"
							width={25}
							height={25}
							className="py-8"
						/>
					</button>
				</div>
				{/* nav sidebar items */}
				<ul
					className={`${styles.flexCenter} flex-col space-y-4 gap-16 min-h-[80%]`}
				>
					{navItems.map((item, index) => {
						const element = (
							<a href={`#${item}`} onClick={() => setShowMenu(!showMenu)}>
								{item}
							</a>
						);
						return navComponent(index, element);
					})}
					{resume()}
				</ul>
			</motion.aside>
		</>
	);
};

export default Navbar;
