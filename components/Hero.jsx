import React from 'react';
import styles from '@/styles';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/motion';

const items = [
	<span key='hero1'>Hey there, I&apos;m</span>,
	<h1
		key='hero2'
		className={`text-primary-contrast-text ${styles.introHeading} pt-2`}
	>
		Raymond Ng.
	</h1>,
	<h1
		key='hero3'
		className={`text-secondary-contrast-text ${styles.introHeading}`}
	>
		I build things for the web.
	</h1>,
	<p key='hero4' className={`text-secondary ${styles.text} ${styles.contentBox} pt-4`}>
		I&apos;m a software engineer with experience in design. My primary focus is
		web development, and besides I&apos;m also engaged in data analytics and
		machine learning to broaden my skill set and take on new challenges.
	</p>,
];

const introComponent = (index, element) => {
	return (
		<motion.div
			variants={fadeIn('up', 'tween', 1.2 + index * 0.2, 0.6)}
			initial='hidden'
			whileInView='show'
			viewport={{ once: true, amount: 0.25 }}
			className='sm:space-y-2'
			key={index + 1}
		>
			{element}
		</motion.div>
	);
};

const Introduction = () => {
	return (
		<section
			className={`${styles.section} ${styles.paddings} min-h-screen grid content-center`}
		>
			{items.map((item, index) => {
				return introComponent(index, item);
			})}
		</section>
	);
};

export default Introduction;
