import SocialLinks from "@/components/v2/shared/SocialLinks";
import { Hero } from "@/components/v2/shared/types";

interface LandingProps {
	hero: Hero;
}

function LandingSubtitleTag({ children }: { children: React.ReactNode }) {
	return <span className="landing-subtitle-tag">{children}</span>;
}

export default function Landing({ hero }: LandingProps) {
	const { greeting, name, description } = hero;

	return (
		<div className="landing-container">
			{/* Hero Title */}
			<div className="landing-title-group">
				<h1 className="landing-title">
					{greeting} {name}.
				</h1>
			</div>
			{/* Subtitle with tags */}
			<div className="landing-subtitle-group">
				<span className="landing-subtitle">Your</span>
				<LandingSubtitleTag>Trusted</LandingSubtitleTag>
				<span className="landing-subtitle">partner</span>
				<span className="landing-subtitle">For</span>
				<span className="landing-subtitle">Website</span>
				<LandingSubtitleTag>build.</LandingSubtitleTag>
			</div>
			{/* Description */}
			<p className="landing-desc">{description}</p>
			{/* Social Links */}
			<SocialLinks />
		</div>
	);
}
