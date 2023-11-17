import React from "react";
import {
	FaHtml5,
	FaCss3Alt,
	FaJsSquare,
	FaPython,
	FaReact,
	FaNodeJs,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import Image from "next/image";
import styles from "@/styles";

const AboutMe = () => {
	return (
		<section id="About" className={`${styles.section}  ${styles.paddings}`}>
			<motion.div
				variants={fadeIn("right", "tween", 0.6, 1)}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.1 }}
				className="sm:space-y-2"
			>
				<div>
					<span className="text-3xl mr-6">| About Me</span>
				</div>
				<p className={`${styles.text} ${styles.contentBox}`}>
					Hello there! My name is Raymond, and I love web design and
					development. I&apos;m also interested in artificial intelligence, big
					data, and data analysis. My prior ambition is to develop{" "}
					<span className={`${styles.highlightText}`}>practical</span> and{" "}
					<span className={`${styles.highlightText}`}>
						aesthetically pleasing
					</span>{" "}
					online apps that benefit consumers.
				</p>
				<p className={`${styles.text} ${styles.contentBox}`}>
					I&apos;ve been actively pursuing opportunities to improve my abilities
					and knowledge. To keep up with the most recent developments, I have
					finished online courses and am studying computer programming diploma.
					I believe the{" "}
					<span className={`${styles.highlightText}`}>problem-solving</span> and{" "}
					<span className={`${styles.highlightText}`}>creative thinking</span>{" "}
					abilities I developed from previous experiences will be advantageous
					in my career as a web developer.
				</p>
				<p className={`${styles.text} ${styles.contentBox}`}>
					My experience includes working with the following technologies:
				</p>
				<div className={`${styles.skillsBox} ${styles.contentBox}`}>
					<div className={`${styles.skillsItem}`}>
						<FaHtml5 className={`${styles.skillsIcon}`} />
						<span>HTML5</span>
					</div>
					<div className={`${styles.skillsItem}`}>
						<FaCss3Alt className={`${styles.skillsIcon}`} />
						<span>CSS3</span>
					</div>
					<div className={`${styles.skillsItem}`}>
						<FaJsSquare className={`${styles.skillsIcon}`} />
						<span>Javascript</span>
					</div>
					<div className={`${styles.skillsItem}`}>
						<Image
							className={`${styles.skillsIcon}`}
							src="/tailwind-css.svg"
							alt="tailwind-css"
							width={25}
							height={25}
						/>
						<span>Tailwind</span>
					</div>
					<div className={`${styles.skillsItem}`}>
						<FaReact className={`${styles.skillsIcon}`} />
						<span>React</span>
					</div>
					<div className={`${styles.skillsItem}`}>
						<FaNodeJs className={`${styles.skillsIcon}`} />
						<span>Node JS</span>
					</div>
					<div className={`${styles.skillsItem}`}>
						<FaPython className={`${styles.skillsIcon}`} />
						<span>Python</span>
					</div>
					<div className={`${styles.skillsItem}`}>
						<Image
							className={`${styles.skillsIcon}`}
							src="/c-plus-plus.svg"
							alt="c-plus-plus"
							width={25}
							height={25}
						/>
						<span>C++</span>
					</div>
				</div>

				<span></span>
			</motion.div>
		</section>
	);
};

export default AboutMe;
