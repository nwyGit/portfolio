import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/motion';
import styles from '@/styles';
import Prognolytics from './Prognolytics';

const Projects = () => {
	return (
		<section id='Projects' className={`${styles.section} ${styles.paddings}`}>
			<motion.div
				variants={fadeIn('right', 'tween', 0.6, 1)}
				initial='hidden'
				whileInView='show'
				viewport={{ once: true, amount: 0.1 }}
				className='sm:space-y-2 relative'
			>
				<div className={`${styles.sectionHeader}`}>
					<span className='text-3xl mr-6'>| Projects</span>
					<hr className='flex-1 border-primary opacity-50' />
				</div>
			</motion.div>
			<Prognolytics />
		</section>
	);
};

export default Projects;
