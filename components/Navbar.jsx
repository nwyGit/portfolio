import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles';
import {
	navVariants,
	buttonVariants,
	navSidebarVariants,
} from '@/utils/motion';
import Image from 'next/image';

const navItems = ['home', 'projects', 'contact', 'resume'];
const navLinks = navItems.map((item) => {
	if (item === 'resume') {
		return (
			<li key={item}>
				<motion.button
					variants={buttonVariants}
					whileHover='hover'
					whileTap='pressed'
					className={`${styles.button}`}
					style={{ borderColor: '#1A1C25' }}
				>
					<a href='/resume.pdf'>{item.toUpperCase()}</a>
				</motion.button>
			</li>
		);
	} else {
		return (
			<li key={item}>
				<a href={`#${item}`}>{item.toUpperCase()}</a>
			</li>
		);
	}
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
				className={`py-8`}
			>
				{!showMenu && (
					<ul
						className={`${styles.flexEnd} text-[#1A1C25] gap-16 items-center md:flex hidden`}
					>
						{navLinks}
					</ul>
				)}
			</motion.nav>

			{/* Mobile screen bar */}
			<div className={`${styles.flexEnd} md:hidden`}>
				<button className='md:hidden' onClick={() => setShowMenu(!showMenu)}>
					<Image src='/menu.svg' alt='Menu' width={25} height={25} />
				</button>
			</div>

			<motion.div
				className={`${styles.bgNav} absolute right-0 w-4/5 h-full top-0`}
				animate={showMenu ? 'open' : 'closed'}
				initial='closed'
				variants={navSidebarVariants}
			>
				<div className={`${styles.flexEnd} pr-16 pt-8`}>
					<button onClick={() => setShowMenu(!showMenu)}>
						<Image
							src='/close.svg'
							alt='Menu'
							width={25}
							height={25}
							className='py-7'
						/>
					</button>
				</div>
				<ul
					className={`text-[#1A1C25] pt-16 gap-10 flex flex-col items-center`}
				>
					{navLinks}
				</ul>
			</motion.div>
		</>
	);
};

export default Navbar;
