import React from 'react';
import styles from '@/styles';

const Introduction = () => {
	return (
		<div className={`${styles.paddings} 2xl:px-72 md:pt-60`}>
			<span>Hey there, I&apos;m </span>
			<h1 className='text-4xl md:text-7xl'>Raymond Ng</h1>
			<p className='pt-4'>
				Assistant Designer in landscape design and development for Hunt Yen
				Consultants Ltd. Skilled in software engineering, coding, and
				troubleshooting. Proven ability to deliver results through effective
				problem solving and communication. Applying for a position as a Software
				Engineer to utilize my skills and expertise in software engineering.{' '}
			</p>
		</div>
	);
};

export default Introduction;
