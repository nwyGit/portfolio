import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import styles from "@/styles";
import ProjectSet from "./ProjectSet";
import { SDprojects } from "../data/projects";

const Projects = () => {
	return (
		<section id="Projects" className={`${styles.section} ${styles.paddings}`}>
			<motion.div
				variants={fadeIn("right", "tween", 0.6, 1)}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.1 }}
				className="sm:space-y-2 relative"
			>
				<div>
					<span className="text-3xl mr-6">| Projects</span>
				</div>
			</motion.div>
			<ProjectSet title="Software Development" data={SDprojects} />
		</section>
	);
};

export default Projects;
