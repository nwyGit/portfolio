import Link from "next/link";
import { FC } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer: FC = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-full py-8 bg-white border-t border-gray-200">
			<div className="container mx-auto px-8">
				<div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
					<div className="flex items-center space-x-6">
						<span className="text-gray-600 text-sm font-['Red_Hat_Display']">
							Follow Me
						</span>
						<Link
							href="https://github.com/nwyGit"
							target="_blank"
							rel="noopener noreferrer"
							className="text-black hover:text-gray-700 transition-colors"
						>
							<FaGithub className="w-8 h-8" />
						</Link>
						<Link
							href="https://www.linkedin.com/in/raymond-wyng"
							target="_blank"
							rel="noopener noreferrer"
							className="text-black hover:text-gray-700 transition-colors"
						>
							<FaLinkedin className="w-8 h-8" />
						</Link>
					</div>

					<div className="text-gray-600 text-sm font-['Red_Hat_Display'] flex items-center gap-4">
						<span className="font-bold text-black text-lg">Raymond Ng</span>
						<div className="h-[1px] w-12 bg-gray-300"></div>
						<span>Copyright © {currentYear}</span>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
