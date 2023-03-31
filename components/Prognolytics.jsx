import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/motion';
import styles from '@/styles';
import Link from 'next/link';
import Image from 'next/image';

const Prognolytics = () => {
	return (
		<motion.div
			variants={fadeIn('right', 'tween', 0.6, 1)}
			initial='hidden'
			whileInView='show'
			viewport={{ once: true, amount: 0.1 }}
			className='sm:space-y-2 relative mt-8'
		>
			<span className={`${styles.highlightText} text-2xl mr-6 z-10`}>
				Prognolytics
			</span>
			<div className={`${styles.contentBox} relative z-10 mt-2`}>
				<p
					className={`${styles.text} lg:bg-[#023047] lg:p-6`}
				>
					A web application that provides personalized{' '}
					<span className={`${styles.highlightText}`}>
						financial health analysis
					</span>{' '}
					to users in order to help them establish a better financial future.
					The app allows users to visualize their financial situation by
					scanning receipts and uploading them with a single click. It processes
					user data and provides actionable financial improvement advice by
					leveraging advanced technologies such as Google&apos;s{' '}
					<span className={`${styles.highlightText}`}>Vision API</span> for
					Optical Character Recognition (OCR) and{' '}
					<span className={`${styles.highlightText}`}>OpenAI</span>&apos;s NLP
					model.
				</p>
			</div>
			<div>
				<ul className={`${styles.contentBox} ${styles.FrameworkBox}`}>
					<li>NextJS</li>
					<li>ExpressJS</li>
					<li>MongoDB</li>
					<li>Vision API</li>
					<li>OpenAI API</li>
				</ul>
			</div>
			<div className='flex gap-4 items-center'>
				<Link href='https://github.com/nwyGit/portfolio/tree/main/Prognolytics'>
					<Image src='/github.svg' alt='github' width={27} height={27} />
				</Link>
				<Link href=''>
					<Image
						src='/externalLink.svg'
						alt='external link'
						width={23}
						height={23}
					/>
				</Link>
			</div>
			<br />
			<div className='lg:absolute top-0 right-0 mt-10'>
				<Link href='/'>
					<Image
						src='/Prognolytics.png'
						alt='Prognolytics capture screen'
						width={512}
						height={100}
						className='h-[100%] w-[100%] lg:max-w-[512px]'
					/>
					<div className='absolute top-0 min-h-[100%] w-[100%] max-w-[600px] lg:bg-[#023047] opacity-70 hover:bg-opacity-0' />
				</Link>
			</div>
		</motion.div>
	);
};

export default Prognolytics;
