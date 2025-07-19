import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import styles from "@/styles";
import ProjectSet from "./ProjectSet";
import { V1ProjectsProps, Project } from "./types";

const Projects: React.FC<V1ProjectsProps> = ({ projects }) => {
	const SDprojects: Project[] = projects
		.filter((pj) => pj.category?.name === "Software Development")
		.sort((a, b) => (b.order || 0) - (a.order || 0));

	const DAprojects: Project[] = projects
		.filter((pj) => pj.category?.name === "Data Analytics")
		.sort((a, b) => (b.order || 0) - (a.order || 0));

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
					<span className="text-primary-contrast text-3xl font-semibold mr-6">
						| Projects
					</span>
				</div>
			</motion.div>
			<ProjectSet title="Software Development" data={SDprojects} />
			<ProjectSet title="Data Analytics" data={DAprojects} />
		</section>
	);
};

export default Projects;