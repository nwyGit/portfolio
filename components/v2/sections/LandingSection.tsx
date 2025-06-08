import BlobBackground from "@/components/v2/sections/landing/BlobBackground";
import Landing from "@/components/v2/sections/landing/Landing";
import Skills from "@/components/v2/sections/landing/Skills";
import { Hero, Project, Skill } from "@/components/v2/shared/type/types";
import ProjectSection from "./ProjectSection";

interface LandingProps {
	hero: Hero;
	skills: Skill[];
	projects: Project[];
}

export default function LandingSection({
	hero,
	skills,
	projects,
}: LandingProps) {
	return (
		<BlobBackground className="landing-section">
			<Landing hero={hero} />
			<Skills hero={hero} skills={skills} />
			<ProjectSection projects={projects} />
		</BlobBackground>
	);
}
