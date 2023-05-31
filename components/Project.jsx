import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/motion';
import styles from '@/styles';
import Link from 'next/link';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';

const Project = ({ data }) => {
	const [mobileScreen, setMobileScreen] = useState(false);
	const isMobile = useMediaQuery({ maxWidth: 767 });

	useEffect(() => {
		if (isMobile) {
			setMobileScreen(true);
		} else {
			setMobileScreen(false);
		}
	}, [isMobile]);

	return (
		<motion.div
			variants={fadeIn('right', 'tween', 0.6, 1)}
			initial='hidden'
			whileInView='show'
			viewport={{ once: true, amount: 0.1 }}
			className='relative mt-8'
		>
			<div>
				<div
					className={`relative ${styles.contentBox} text-justify p-6 lg:p-0 z-10`}
				>
					<span className={`${styles.highlightText} text-2xl mr-6 `}>
						{data.title}
					</span>
					<p className={`${styles.text} lg:bg-[#023047] lg:mt-2 lg:p-6`}>
						{data.body}
					</p>
					<div>
						<ul className={`${styles.FrameworkBox}`}>
							{data.framework.map((e) => (
								<>
									<li key={e}>{e}</li>
								</>
							))}
						</ul>
					</div>
					<div className='flex gap-4 items-center'>
						{data.githubURL.length > 0 && (
							<Link href={data.githubURL}>
								<Image src='/github.svg' alt='github' width={27} height={27} />
							</Link>
						)}
						{data.websiteURL.length > 0 && (
							<Link href={data.websiteURL}>
								<Image
									src='/externalLink.svg'
									alt='external link'
									width={23}
									height={23}
								/>
							</Link>
						)}
					</div>
				</div>
				<div className='absolute top-2 lg:right-0 w-full h-full lg:w-[45%] lg:h-[75%]'>
					<Image
						src={mobileScreen ? data.imageURL.mobile : data.imageURL.desktop}
						alt={data.title + ' capture screen'}
						width={1024}
						height={768}
						className='h-full object-cover'
					/>
					<div className='absolute top-0 w-full h-full lg:right-0 bg-[#023047]/90 lg:bg-[#023047]/70 hover:bg-[#023047]/0' />
				</div>
			</div>
		</motion.div>
	);
};

export default Project;
