import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import styles from "@/styles";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import Overlay from "./Overlay";
import SkillIcon from "./SkillIcon";
import { urlFor } from "@/utils/sanity";
import { V1ProjectProps } from "./types";

const Project: React.FC<V1ProjectProps> = ({ data }) => {
	const [mobileScreen, setMobileScreen] = useState<boolean>(false);
	const isMobile = useMediaQuery({ maxWidth: 767 });

	useEffect(() => {
		if (isMobile) {
			setMobileScreen(true);
		} else {
			setMobileScreen(false);
		}
	}, [isMobile]);

	const {
		title,
		summary,
		technologies,
		githubLink,
		demoLink,
		desktopImageURL,
		mobileImageURL,
	} = data;

	return (
		<motion.div
			variants={fadeIn("right", "tween", 0.6, 1)}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, amount: 0.1 }}
			className="relative mt-8"
		>
			<div
				className={`relative lg:w-[60%] w-full text-justify p-6 lg:p-0 z-10`}
			>
				<span className="text-2xl font-semibold mr-6">{title}</span>
				<div className={`${styles.text} lg:bg-[#023047] lg:mt-2 lg:p-6`}>
					<p>{summary}</p>
					<ul className={`${styles.FrameworkBox}`}>
						{technologies
							?.sort((a: any, b: any) => a.order - b.order)
							.map((tech: any, idx: number) => {
								return (
									<li key={idx} className="bg-white p-1 rounded-full">
										<SkillIcon
											name={tech.title}
											url={urlFor(tech.image).url()}
										/>
									</li>
								);
							})}
					</ul>
				</div>

				<div className="flex gap-4 items-center mt-2">
					{githubLink && (
						<Link href={githubLink}>
							<Image src="/github.svg" alt="github" width={27} height={27} />
						</Link>
					)}
					{demoLink && (
						<Link href={demoLink}>
							<Image
								src="/externalLink.svg"
								alt="external link"
								width={23}
								height={23}
							/>
						</Link>
					)}
				</div>
			</div>
			
			<div className="absolute top-2 lg:right-0 w-full h-full lg:w-[45%] lg:h-[75%]">
				<Image
					src={mobileScreen ? mobileImageURL : desktopImageURL}
					alt={title + " capture screen"}
					width={1024}
					height={768}
					className="h-full object-cover"
				/>
				<Overlay opacity={"project"} />
			</div>
		</motion.div>
	);
};

export default Project;