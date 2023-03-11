import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/motion';
import styles from '@/styles';

const Projects = () => {
	return (
		<section id='Projects' className={`${styles.section}  ${styles.paddings}`}>
			<motion.div
				variants={fadeIn('right', 'tween', 0.6, 1)}
				initial='hidden'
				whileInView='show'
				viewport={{ once: true, amount: 0.1 }}
				className='sm:space-y-2'
			>
				<div className={`${styles.sectionHeader}`}>
					<span className='text-3xl mr-6'>| Projects</span>
					<hr className='flex-1 border-primary opacity-50' />
				</div>
				<br />
				<p className={`${styles.text} ${styles.contentBox}`}>
					Proven ability to deliver results through effective problem solving
					and communication. Applying for a position as a Software Engineer to
					utilize my skills and expertise in software engineering.
				</p>
			</motion.div>
		</section>
	);
};

export default Projects;
