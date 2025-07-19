import React, { useEffect, useState } from "react";
import { fetchResume } from "@/utils/fetchData";
import {
	buttonVariants,
	navSidebarVariants,
	navVariants,
} from "@/utils/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles";
import { ClickHandler } from "./types";

// navItems attributes
const navItems: string[] = ["About", "Projects", "Contact"];

const navComponent = (index: number, element: React.ReactElement): React.ReactElement => {
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

const navLinks: React.ReactElement[] = navItems.map((item, index) => {
	const element = <a href={`#${item}`}>{item}</a>;
	return navComponent(index, element);
});

const Resume = ({ resumeURL }: { resumeURL: string }): React.ReactElement => {
	const element = (
		<motion.button
			variants={buttonVariants}
			whileHover="hover"
			whileTap="pressed"
			className={`${styles.button} py-1 px-4`}
		>
			<a href={resumeURL}>Resume</a>
		</motion.button>
	);
	return navComponent(navItems.length, element);
};

// NavBar component
const Navbar: React.FC = () => {
	const [showMenu, setShowMenu] = useState<boolean>(false);
	const [resumeURL, setResumeURL] = useState<string>("");

	useEffect(() => {
		async function getResume(): Promise<void> {
			const data = await fetchResume();
			setResumeURL(data?.resumeURL || "");
		}
		getResume();
	}, []);

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

	const toggleMenu: ClickHandler = () => setShowMenu(!showMenu);

	return (
		<>
			{/* Large screen bar */}
			<nav className={`${styles.lgNavBar} text-primary`}>
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
								<Image
									src="/logo.svg"
									alt="logo"
									width="0"
									height="0"
									priority
									className="h-[40px] w-auto"
								/>
							</Link>
						</motion.div>
						<ul className={`${styles.flexEnd} gap-16 items-center`}>
							{navLinks}
							{Resume({ resumeURL })}
						</ul>
					</>
				)}
			</nav>

			{/* Mobile screen bar */}
			<nav className={`${styles.smNavBar}`}>
				<Link href="/">
					<Image
						src="/logo.svg"
						alt="logo"
						width="0"
						height="0"
						priority
						className="h-[40px] w-auto"
					/>
				</Link>
				<button onClick={toggleMenu} className={``}>
					<Image
						src="/menu.svg"
						alt="Menu"
						width="0"
						height="0"
						className="h-[30px] w-auto"
					/>
				</button>
			</nav>
			{/* Background blur overlay */}
			{showMenu && (
				<div
					className={`${styles.blurOverlay} z-20`}
					onClick={toggleMenu}
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
					<button onClick={toggleMenu}>
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
							<a href={`#${item}`} onClick={toggleMenu}>
								{item}
							</a>
						);
						return navComponent(index, element);
					})}
					{Resume({ resumeURL })}
				</ul>
			</motion.aside>
		</>
	);
};

export default Navbar;