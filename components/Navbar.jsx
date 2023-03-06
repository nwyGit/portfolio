import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
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

	useEffect(() => {
		if (showMenu) {
			// Disable scrolling
			document.body.classList.add('overflow-hidden');
		} else {
			// Enable scrolling
			document.body.classList.remove('overflow-hidden');
		}

		return () => {
			// Clean up function to re-enable scrolling
			document.body.classList.add('overflow-hidden');
		};
	}, [showMenu]);

	return (
		<>
			{/* Large screen bar */}
			<motion.nav
				variants={navVariants}
				initial='hidden'
				whileInView='show'
				viewport={{ once: true, amount: 0.25 }}
				className={`${styles.xPaddings} hidden md:block drop-shadow-md bg-[#023047] sm:py-4 py-6 sticky top-0 w-full z-20`}
			>
				{!showMenu && (
					<ul className={`${styles.flexEnd} gap-16 items-center`}>
						{navLinks}
						{Resume}
					</ul>
				)}
			</motion.nav>

			{/* Mobile screen bar */}
			<div className={`${styles.flexEnd} bg-[#023047] md:hidden pr-6 pt-12`}>
				<button onClick={() => setShowMenu(!showMenu)}>
					<Image src='/menu.svg' alt='Menu' width={30} height={30} />
				</button>
				{/* Background blur overlay */}
				{showMenu && (
					<div
						className={`${styles.blurOverlay} overscroll-x-none z-10`}
						onClick={() => setShowMenu(!showMenu)}
					></div>
				)}
				{/* nav sidebar */}
				<motion.aside
					variants={navSidebarVariants}
					initial='hidden'
					animate={showMenu ? 'show' : 'hidden'}
					className={`${styles.popUpNav} ${showMenu ? '' : 'hidden'} z-20`}
				>
					{/* close button */}
					<div className={`${styles.flexEnd} pt-4 pr-12`}>
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
					<ul
						className={`${styles.flexCenter} flex-col space-y-4 gap-16 min-h-[80%]`}
					>
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
				</motion.aside>
			</div>
		</>
	);
};

export default Navbar;
