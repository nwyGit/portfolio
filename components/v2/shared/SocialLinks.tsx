import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SOCIAL_LINKS } from "./constants";

const SocialLinks = () => (
	<div className="footer-icons">
		<Link
			href={SOCIAL_LINKS.github}
			target="_blank"
			rel="noopener noreferrer"
			className="text-black hover:text-gray-700 transition-colors"
			aria-label="GitHub"
		>
			<FaGithub size={36} />
		</Link>
		<Link
			href={SOCIAL_LINKS.linkedin}
			target="_blank"
			rel="noopener noreferrer"
			className="text-black hover:text-gray-700 transition-colors"
			aria-label="LinkedIn"
		>
			<FaLinkedin size={36} />
		</Link>
		<Link
			href={SOCIAL_LINKS.email}
			target="_blank"
			rel="noopener noreferrer"
			className="text-black hover:text-gray-700 transition-colors"
			aria-label="Email"
		>
			<MdEmail size={36} />
		</Link>
	</div>
);

export default SocialLinks;
