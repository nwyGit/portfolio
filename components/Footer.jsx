import React from "react";
import Image from "next/image";
import styles from "../styles";
import Link from "next/link";

const footerItems = [
	{
		name: "github",
		imagePath: "/github.svg",
		url: "https://github.com/nwyGit",
		width: 27,
		height: 27,
	},
	{
		name: "linkedin",
		imagePath: "/linkedin.svg",
		url: "https://www.linkedin.com/in/raymond-wyng",
		width: 25,
		height: 25,
	},
];

const Footer = () => {
	return (
		<footer className={`${styles.xPaddings} ${styles.FooterBox}`}>
			<ul className={`${styles.flexCenter} gap-8 py-6 relative z-5`}>
				{footerItems.map((item) => (
					<li key={item.name} className="hover:text-secondary">
						<Link href={item.url}>
							<Image
								src={item.imagePath}
								alt={item.name}
								width={item.width}
								height={item.height}
							/>
						</Link>
					</li>
				))}
			</ul>
			<p className={`${styles.flexCenter} text-secondary text-sm`}>
				Design & Built by Raymond Ng
			</p>
		</footer>
	);
};

export default Footer;
