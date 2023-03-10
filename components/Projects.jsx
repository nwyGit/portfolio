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
				<span className='text-3xl'>| Projects</span>
				<br />
				<p className='text-secondary pt-4 sm:w-1/2'>
					Proven ability to deliver results through effective problem solving
					and communication. Applying for a position as a Software Engineer to
					utilize my skills and expertise in software engineering.
				</p>
			</motion.div>
		</section>
	);
};

export default Projects;
