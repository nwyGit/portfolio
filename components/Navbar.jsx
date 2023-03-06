import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles';
import {
	navVariants,
	buttonVariants,
	navSidebarVariants,
} from '@/utils/motion';
import Image from 'next/image';

const navItems = ['About', 'Projects', 'Contact'];
const Resume = (
	<li key='resume'>
		<motion.button
			variants={buttonVariants}
			whileHover='hover'
			whileTap='pressed'
			className={`${styles.button} py-1 px-4`}
		>
			<a href='/resume.pdf'>Resume</a>
		</motion.button>
	</li>
);
const navLinks = navItems.map((item) => {
	return (
		<li key={item} className='hover:text-secondary-contrast-text'>
			<a href={`#${item}`}>{item}</a>
		</li>
	);
});

const Navbar = () => {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<>
			{/* Large screen bar */}
			<motion.nav
				variants={navVariants}
				initial='hidden'
				whileInView='show'
				viewport={{ once: true, amount: 0.25 }}
				className={`sm:py-8 py-6 sticky top-0`}
			>
				{!showMenu && (
					<ul
						className={`${styles.flexEnd} gap-16 items-center md:flex hidden`}
					>
						{navLinks}
						{Resume}
					</ul>
				)}
			</motion.nav>

			{/* Mobile screen bar */}
			<div className={`${styles.flexEnd} md:hidden pr-6`}>
				<button onClick={() => setShowMenu(!showMenu)}>
					<Image src='/menu.svg' alt='Menu' width={30} height={30} />
				</button>
				{/* Background blur overlay */}
				{showMenu && (
					<div
						className={`${styles.blurOverlay} z-10`}
						onClick={() => setShowMenu(!showMenu)}
					></div>
				)}
				{/* nav sidebar */}
				<motion.nav
					variants={navSidebarVariants}
					initial='closed'
					animate={showMenu ? 'open' : 'closed'}
					className={`${styles.popUpNav} ${
						showMenu ? '' : 'overflow-hidden'
					} z-20`}
				>
					{/* close button */}
					<div className={`${styles.flexEnd} p-4 pr-10`}>
						<button onClick={() => setShowMenu(!showMenu)}>
							<Image
								src='/close.svg'
								alt='Menu'
								width={25}
								height={25}
								className='py-8'
							/>
						</button>
					</div>
					{/* nav sidebar items */}
					<ul className={`${styles.flexCenter} flex-col space-y-4 pt-6 gap-16`}>
						{navItems.map((item) => {
							return (
								<li key={item} className='hover:text-secondary-contrast-text'>
									<a href={`#${item}`} onClick={() => setShowMenu(!showMenu)}>
										{item}
									</a>
								</li>
							);
						})}
						{Resume}
					</ul>
				</motion.nav>
			</div>
		</>
	);
};

export default Navbar;
