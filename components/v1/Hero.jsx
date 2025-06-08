import styles from "@/styles";
import { fadeIn } from "@/utils/motion";
import { motion } from "framer-motion";

// const heroItems = [
// 	<span key="intro">Hey there, I&apos;m</span>,
// 	<h1
// 		key="name"
// 		className={`text-primary-contrast-text ${styles.introHeading} pt-2`}
// 	>
// 		Raymond Ng.
// 	</h1>,
// 	<h1
// 		key="slogan"
// 		className={`text-secondary-contrast-text ${styles.introHeading2} pt-4`}
// 	>
// 		I build things for the web.
// 	</h1>,
// 	<p
// 		key="description"
// 		className={`text-secondary ${styles.text} ${styles.contentBox} pt-4`}
// 	>
// 		I&apos;m a software developer with experience in design. My primary focus is
// 		web development, and besides I&apos;m also engaged in data analytics and
// 		machine learning to broaden my skill set and take on new challenges.
// 	</p>,
// ];

const introComponent = (index, element) => {
	return (
		<motion.div
			variants={fadeIn("up", "tween", 1.2 + index * 0.2, 0.6)}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, amount: 0.25 }}
			className="sm:space-y-2"
			key={index + 1}
		>
			{element}
		</motion.div>
	);
};

const Introduction = ({ hero }) => {
	const { greeting, name, slogan, description } = hero;
	return (
		<section
			className={`${styles.section} ${styles.paddings} min-h-screen grid content-center`}
		>
			{introComponent(0, <span key="intro">{greeting}</span>)}
			{introComponent(
				1,
				<h1
					key="name"
					className={`text-primary-contrast-text ${styles.introHeading} pt-2`}
				>
					{name}.
				</h1>
			)}
			{introComponent(
				2,
				<h1
					key="slogan"
					className={`text-secondary-contrast-text ${styles.introHeading2} pt-4`}
				>
					{slogan}
				</h1>
			)}
			{introComponent(
				3,
				<p
					key="description"
					className={`text-secondary ${styles.text} ${styles.contentBox} pt-4`}
				>
					{description}
				</p>
			)}
		</section>
	);
};

export default Introduction;
