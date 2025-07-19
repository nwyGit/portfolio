import React from "react";
import { V1BubblesProps } from "./types";

// This component is currently commented out in the original v1 implementation
// Keeping it as TypeScript for consistency while maintaining the commented state

// import React, { useState, useEffect } from "react";
// import styles from "@/styles";

// const min: number = 10;
// const max: number = 30;

// const Bubbles: React.FC<V1BubblesProps> = ({ className }) => {
// 	const [windowWidth, setWindowWidth] = useState<number>(0);
// 	const [showBubbles, setShowBubbles] = useState<boolean>(false);

// 	useEffect(() => {
// 		function handleResize(): void {
// 			setWindowWidth(window.innerWidth);
// 		}

// 		setWindowWidth(window.innerWidth);
// 		window.addEventListener("resize", handleResize);

// 		const timer = setTimeout(() => {
// 			setShowBubbles(true);
// 		}, 2500);

// 		return () => {
// 			window.removeEventListener("resize", handleResize);
// 			clearTimeout(timer);
// 		};
// 	}, []);

// 	const bubbleNumber: number =
// 		windowWidth >= 1024
// 			? 30
// 			: windowWidth >= 768
// 			? 20
// 			: windowWidth >= 640
// 			? 15
// 			: 10;

// 	return (
// 		<div className={`${styles.bubbleContainer} ${className || ''}`}>
// 			<div className="relative flex justify-evenly bubbles">
// 				{showBubbles &&
// 					Array.from({ length: bubbleNumber }, (_, i) => (
// 						<span
// 							key={i}
// 							style={{
// 								"--i": `${(Math.floor(Math.sin(i + 1) * 100000) % min) + max}`,
// 							} as React.CSSProperties}
// 						></span>
// 					))}
// 			</div>
// 		</div>
// 	);
// };

// Placeholder component since original is commented out
const Bubbles: React.FC<V1BubblesProps> = ({ className }) => {
	return <div className={className} />;
};

export default Bubbles;