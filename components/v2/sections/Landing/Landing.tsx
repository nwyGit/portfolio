import SocialLinks from "@/components/v2/shared/SocialLinks";
import { Hero } from "@/components/v2/shared/types";

interface LandingProps {
	hero: Hero;
}

function LandingSubtitleTag({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<span className={`landing-subtitle-tag ${className}`}>{children}</span>
	);
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
				<span className="landing-subtitle">Partner</span>
				<span className="landing-subtitle hidden sm:inline">For</span>
				<span className="landing-subtitle hidden sm:inline">Website</span>
				<LandingSubtitleTag className="hidden sm:inline">
					Build.
				</LandingSubtitleTag>
				{/* Mobile stacked version */}
				<div className="flex flex-row sm:hidden w-full gap-[15px]">
					<span className="landing-subtitle">For</span>
					<span className="landing-subtitle">Website</span>
					<LandingSubtitleTag>Build.</LandingSubtitleTag>
				</div>
			</div>
			{/* Description */}
			<p className="landing-desc">{description}</p>
			{/* Social Links */}
			<SocialLinks />
		</div>
	);
}
