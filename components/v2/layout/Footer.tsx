import Link from "next/link";
import { FC } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer: FC = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="footer">
			<div className="footer-container">
				<div className="footer-left">
					<span className="footer-follow">Follow Me</span>
					<div className="footer-icons">
						<Link
							href="https://github.com/nwyGit"
							target="_blank"
							rel="noopener noreferrer"
							className="text-black hover:text-gray-700 transition-colors"
							aria-label="GitHub"
						>
							<FaGithub size={36} />
						</Link>
						<Link
							href="https://www.linkedin.com/in/raymond-wyng"
							target="_blank"
							rel="noopener noreferrer"
							className="text-black hover:text-gray-700 transition-colors"
							aria-label="LinkedIn"
						>
							<FaLinkedin size={36} />
						</Link>
						<Link
							href="mailto:raymond.wyng@gmail.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-black hover:text-gray-700 transition-colors"
							aria-label="Email"
						>
							<MdEmail size={36} />
						</Link>
					</div>
				</div>
				<div className="footer-right">
					<span className="footer-name">Raymond Ng</span>
					<div className="footer-line"></div>
					<span className="footer-copyright">Copyright © {currentYear}</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
