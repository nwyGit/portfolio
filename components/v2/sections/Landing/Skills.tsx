import Image from "next/image";
import { Skill } from "../../shared/types";
import { urlFor } from "@/utils/sanity";

const skills = [
	{ name: "Java", icon: "/v2/assets/icon_java.svg" },
	{ name: "javascript", icon: "/v2/assets/icon_javascript.svg" },
	{ name: "typescript", icon: "/v2/assets/icon_typescript.svg" },
	{ name: "phython", icon: "/v2/assets/icon_python.svg" },
	{ name: "C++", icon: "/v2/assets/icon_cpp.svg" },
	{ name: "spring", icon: "/v2/assets/icon_spring.svg" },
	{ name: "nodejs", icon: "/v2/assets/icon_nodejs.svg" },
	{ name: "expressjs", icon: "/v2/assets/icon_expressjs.svg" },
	{ name: "postgreSQL", icon: "/v2/assets/icon_postgresql.svg" },
	{ name: "MySQL", icon: "/v2/assets/icon_mysql.svg" },
	{ name: "MongoDB", icon: "/v2/assets/icon_mongodb.svg" },
	{ name: "React", icon: "/v2/assets/icon_react.svg" },
	{ name: "Nextjs", icon: "/v2/assets/icon_nextjs.svg" },
	{ name: "redux", icon: "/v2/assets/icon_redux.svg" },
	{ name: "tailwindCSS", icon: "/v2/assets/icon_tailwindcss.svg" },
	{ name: "SASS", icon: "/v2/assets/icon_sass.svg" },
	{ name: "AWS", icon: "/v2/assets/icon_aws.svg" },
	{ name: "GCP", icon: "/v2/assets/icon_gcp.svg" },
];

const graySkills = ["Typescript", "PostgreSQL", "C++", "Javascript"];

interface SkillProps {
	skills: Skill[];
}

export default function Skills({ skills }: SkillProps) {
	return (
		<div className="skills-section-wrapper px-[20px]">
			<div className="skills-section">
				{/* Header */}
				<div className="skills-section-header">
					<div className="skills-section-title-group">
						<h2 className="skills-section-title">
							My Extensive <br /> Skills
						</h2>
					</div>
					<div className="skills-section-desc-group">
						<p className="skills-section-desc">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</p>
						<div className="skills-section-divider" />
					</div>
				</div>
				{/* Skills Grid */}
				<div className="skills-section-grid">
					{skills.map((skill) => (
						<div key={skill._id} className="skills-card">
							<div className="skills-card-icon-wrapper">
								<Image
									src={urlFor(skill.image).url()}
									alt={skill.title}
									width={30}
									height={30}
									className={
										graySkills
											.map((s) => s.toLowerCase())
											.includes(skill.title.toLowerCase())
											? "skills-card-icon--gray"
											: "skills-card-icon--white"
									}
								/>
							</div>
							<span className="skills-card-title">{skill.title}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
