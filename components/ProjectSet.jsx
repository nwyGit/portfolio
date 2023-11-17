import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import styles from "@/styles";
import Project from "./Project";

const ProjectSet = ({ title, data }) => {
	return (
		<section>
			<motion.div
				variants={fadeIn("right", "tween", 0.6, 1)}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.1 }}
				className="sm:space-y-2 relative"
			>
				<div className={`${styles.sectionHeader} mt-12`}>
					<span className="text-2xl mr-6">{title}</span>
					<hr className="flex-1 border-primary opacity-50" />
				</div>
			</motion.div>
			{data.map((project, i) => (
				<Project key={i} data={project} />
			))}
		</section>
	);
};

export default ProjectSet;
