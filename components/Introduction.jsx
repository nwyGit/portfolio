import React from 'react';
import styles from '@/styles';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/motion';

const Introduction = () => {
	return (
		<section className={`${styles.section} ${styles.paddings}`}>
			<motion.div
				variants={fadeIn('left', 'tween', 0.6, 1)}
				initial='hidden'
				whileInView='show'
				viewport={{ once: true, amount: 0.25 }}
				className='sm:space-y-2'
			>
				<span>Hey there, I&apos;m</span>
				<h1
					className={`text-primary-contrast-text ${styles.introHeading} pt-2`}
				>
					Raymond Ng.
				</h1>
				<h1 className={`text-secondary-contrast-text ${styles.introHeading}`}>
					I build things for the web.
				</h1>
				<p className={`text-secondary ${styles.textBox} pt-4`}>
					Proven ability to deliver results through effective problem solving
					and communication. Applying for a position as a Software Engineer to
					utilize my skills and expertise in software engineering.
				</p>
			</motion.div>
		</section>
	);
};

export default Introduction;
