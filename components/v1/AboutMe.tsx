import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import styles from "@/styles";
import Skill from "./Skill";
import { urlFor } from "@/utils/sanity";
import Image from "next/image";
import Overlay from "./Overlay";
import { V1AboutMeProps } from "./types";

const AboutMe: React.FC<V1AboutMeProps> = ({ about, skills }) => {
	if (!about) {
		return (
			<section id="About" className={`${styles.section} ${styles.paddings}`}>
				<span>Loading about section...</span>
			</section>
		);
	}
	return (
		<section id="About" className={`${styles.section} ${styles.paddings}`}>
			<motion.div
				variants={fadeIn("right", "tween", 0.6, 1)}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.1 }}
				className="sm:space-y-2"
			>
				<div>
					<span className="text-primary-contrast-text text-3xl font-semibold mr-6">
						| About Me
					</span>
				</div>
				<div className="block md:flex">
					<div className="flex md:order-last md:w-[40%] justify-center items-center">
						<div className="relative">
							<Image
								src={about?.selfieURL || ''}
								alt="selfie"
								width={300}
								height="0"
								className="h-[250px] w-auto mt-2"
							/>
							<Overlay opacity={"selfie"} />
						</div>
					</div>
					<div className={`${styles.contentBox}`}>
						<p className={`${styles.text}`}>{about?.paragraph1}</p>
						<p className={`${styles.text}`}>{about?.paragraph2}</p>
					</div>
				</div>
				<p className={`${styles.text}`}>
					My experience includes working with the following technologies:
				</p>
				<div className={`${styles.skillsBox}`}>
					{/* Skill Icons */}
					{skills
						?.sort((a, b) => a.order - b.order)
						.map((skill) => (
							<Skill
								key={skill?._id}
								url={urlFor(skill?.image).url()}
								name={skill?.title}
							/>
						))}
				</div>
			</motion.div>
		</section>
	);
};

export default AboutMe;