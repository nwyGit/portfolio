import Landing from "@/components/v2/sections/Landing/Landing";
import Skills from "@/components/v2/sections/Landing/Skills";
import { Hero, Skill } from "@/components/v2/shared/types";

interface LandingProps {
	hero: Hero;
	skills: Skill[];
}

export default function LandingSection({ hero, skills }: LandingProps) {
	return (
		<section className="landing-section">
			<div className="landing-bg-gradient-blue"/>
			<div className="landing-bg-gradient-orange"/>
			<Landing hero={hero} />
			<Skills skills={skills} />
		</section>
	);
}
