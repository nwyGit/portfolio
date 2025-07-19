import { urlFor } from "@/utils/sanity";
import Image from "next/image";
import { Hero, Skill } from "../../shared/type/types";

const graySkills = ["Typescript", "PostgreSQL", "C++", "Javascript"];

interface SkillProps {
	hero: Hero | null;
	skills: Skill[];
}

export default function Skills({ hero, skills }: SkillProps) {
	return (
		<div className="skills-section-wrapper">
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
							{hero?.skillDescription || "Developing expertise across multiple technologies and frameworks."}
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
