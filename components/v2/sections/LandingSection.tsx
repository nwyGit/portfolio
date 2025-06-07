import Landing from "@/components/v2/sections/Landing/Landing";
import { Hero } from "@/components/v2/shared/types";

interface LandingProps {
	hero: Hero;
}

export default function LandingSection({ hero }: LandingProps) {
	return (
		<section className="landing-section">
			<div className="landing-bg-gradient-blue"/>
			<div className="landing-bg-gradient-orange"/>
			<Landing hero={hero} />
		</section>
	);
}
