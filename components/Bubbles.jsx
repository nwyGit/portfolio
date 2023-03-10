import React, { useState, useEffect } from 'react';
import styles from '@/styles';

const min = 10;
const max = 30;

const Bubbles = () => {
	const [windowWidth, setWindowWidth] = useState(0);
	const [showBubbles, setShowBubbles] = useState(false);

	useEffect(() => {
		function handleResize() {
			setWindowWidth(window.innerWidth);
		}

		setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);

		setTimeout(() => {
			setShowBubbles(true);
		}, 2500);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const arrayLength =
		windowWidth >= 1024
			? 30
			: windowWidth >= 768
			? 20
			: windowWidth >= 640
			? 15
			: 10;

	return (
		<div className={`${styles.bubbleContainer}`}>
			<div className='relative flex justify-evenly bubbles'>
				{showBubbles &&
					Array.from({ length: arrayLength }, (_, i) => (
						<span
							key={i}
							style={{
								'--i': `${(Math.floor(Math.sin(i + 1) * 100000) % min) + max}`,
							}}
						></span>
					))}
			</div>
		</div>
	);
};

export default Bubbles;
