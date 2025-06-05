import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineDownload } from "react-icons/hi";
import { NAVIGATION_LINKS } from "../shared/constants";

const Navbar: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	const toggleMenu = () => setIsOpen(!isOpen);

	return (
		<nav
			className="navbar"
			style={{ fontFamily: "Red Hat Display, sans-serif" }}
		>
			<div className="navbar-container">
				{/* Logo */}
				<Link
					href="/v2"
					className="flex items-center min-w-[55px] min-h-[55px]"
				>
					<Image
						src="/logo_v2.svg"
						alt="Raymond Ng Logo"
						width={55}
						height={55}
						className="w-[55px] h-[55px]"
						priority
					/>
				</Link>
				{/* Desktop Navigation */}
				<div className="hidden md:flex items-center gap-[50px]">
					{NAVIGATION_LINKS.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className={`nav-link${
								router.pathname === link.href ? " nav-link-active" : ""
							}`}
						>
							{link.name}
						</Link>
					))}
					<a href="/resume.pdf" download className="resume-btn">
						<HiOutlineDownload size={24} />
						<span>Resume</span>
					</a>
				</div>
				{/* Mobile Menu Button */}
				<button
					className="md:hidden p-2 text-gray-600 hover:text-black"
					onClick={toggleMenu}
					aria-label="Toggle menu"
				>
					{/* Hamburger icon */}
					<GiHamburgerMenu size={24} />
				</button>
			</div>
			{/* Mobile Navigation */}
			{isOpen && (
				<div className="md:hidden w-full bg-white border-t border-gray-200 py-[20px] px-[30px]">
					<div className="flex flex-col items-start gap-6">
						{NAVIGATION_LINKS.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="nav-link"
								onClick={() => setIsOpen(false)}
							>
								{link.name}
							</Link>
						))}
						<a
							href="/resume.pdf"
							download
							className="resume-btn"
							onClick={() => setIsOpen(false)}
						>
							<HiOutlineDownload size={18} />
							<span>Resume</span>
						</a>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
