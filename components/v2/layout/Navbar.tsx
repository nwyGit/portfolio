import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { NAVIGATION_LINKS } from "../shared/constants";
import { HiOutlineDownload } from "react-icons/hi";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	const toggleMenu = () => setIsOpen(!isOpen);

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
			<div className="container mx-auto px-8">
				<div className="flex items-center justify-between h-20">
					{/* Logo */}
					<Link href="/v2" className="flex items-center">
						<Image
							src="/logo_v2.svg"
							alt="Raymond Ng Logo"
							width={40}
							height={40}
							className="w-auto h-8"
							priority
						/>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-12">
						{NAVIGATION_LINKS.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className={`text-black hover:text-gray-700 transition-colors duration-200 ${
									router.pathname === link.href ? "font-medium" : ""
								}`}
							>
								{link.name}
							</Link>
						))}
						<a
							href="/resume.pdf"
							download
							className="flex items-center gap-2 px-4 py-2 border-2 border-black text-black hover:bg-black hover:text-white transition-colors duration-200 rounded-full"
						>
							<HiOutlineDownload size={18} />
							<span className="text-sm font-bold">RESUME</span>
						</a>
					</div>

					{/* Mobile Menu Button */}
					<button
						className="md:hidden p-2 text-gray-600 hover:text-black"
						onClick={toggleMenu}
						aria-label="Toggle menu"
					>
						{isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
					</button>
				</div>

				{/* Mobile Navigation */}
				{isOpen && (
					<div className="md:hidden">
						<div className="px-8 pt-2 pb-4 space-y-1">
							{NAVIGATION_LINKS.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className={`block px-3 py-2 rounded-md text-base font-medium text-black hover:text-gray-700 ${
										router.pathname === link.href ? "font-bold" : ""
									}`}
									onClick={() => setIsOpen(false)}
								>
									{link.name}
								</Link>
							))}
							<div className="flex justify-start">
								<a
									href="/resume.pdf"
									download
									className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-base font-medium border-2 border-black text-black hover:bg-black hover:text-white transition-colors duration-200"
									onClick={() => setIsOpen(false)}
								>
									<HiOutlineDownload size={18} />
									<span className="text-sm font-bold">RESUME</span>
								</a>
							</div>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
