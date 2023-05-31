import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/motion';
import styles from '@/styles';
import Project from './Project';

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
			<Project data={projectsData[0]} />
			<Project data={projectsData[1]} />
		</section>
	);
};

export default Projects;

const projectsData = [
	{
		title: 'Boogabot',
		body: (
			<>
				Web service is provided to users, enabling them to effortlessly discover
				the most{' '}
				<span className={`${styles.highlightText}`}>
					suitable broadband and data plans
				</span>{' '}
				. The website also offers up-to-date information on data plans, allowing
				users to promptly address minor concerns. It utilizes server-side
				rendering and image optimization techniques to enhance performance and
				user satisfaction. For flexibility and scalability,{' '}
				<span className={`${styles.highlightText}`}>Strapi</span>, a headless
				CMS and backend server, along with{' '}
				<span className={`${styles.highlightText}`}>PostgreSQL</span> as the
				database, were employed. The implementation of SEO best practices
				enhances the website&apos;s discoverability and increases organic search
				traffic.
			</>
		),
		framework: ['NextJS', 'Strapi', 'PostgreSQL'],
		githubURL: '',
		websiteURL: 'https://boogabot.com/',
		imageURL: { mobile: '/Boogabot_m.png', desktop: '/Boogabot.png' },
	},
	{
		title: 'Prognolytics',
		body: (
			<>
				A web application that provides personalized{' '}
				<span className={`${styles.highlightText}`}>
					financial health analysis
				</span>{' '}
				to users in order to help them establish a better financial future. The
				app allows users to visualize their financial situation by scanning
				receipts and uploading them with a single click. It processes user data
				and provides actionable financial improvement advice by leveraging
				technologies such as Google&apos;s{' '}
				<span className={`${styles.highlightText}`}>Vision API</span> for
				Optical Character Recognition (OCR) and{' '}
				<span className={`${styles.highlightText}`}>OpenAI</span>&apos;s NLP
				model.
			</>
		),
		framework: ['NextJS', 'ExpressJS', 'MongoDB', 'Vision API', 'OpenAI API'],
		githubURL: '',
		websiteURL: '',
		imageURL: { mobile: '/Prognolytics.png', desktop: '/Prognolytics.png' },
	},
];
