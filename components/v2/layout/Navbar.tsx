import DynamicButton from "@/components/v2/shared/component/DynamicButton";
import { NAVIGATION_LINKS } from "@/components/v2/shared/type/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineDownload } from "react-icons/hi";

interface NavbarProps {
	resumeURL: string;
}

const Navbar: FC<NavbarProps> = ({ resumeURL }) => {
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
				<Link href="/" className="flex items-center min-w-[55px] min-h-[55px]">
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
					<DynamicButton
						text="Resume"
						icon={<HiOutlineDownload size={24} />}
						href={resumeURL}
						download
						className="resume-btn"
						iconPosition="left"
					/>
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
				<div className="md:hidden w-full bg-white border-t border-gray-200 py-[20px] px-[30px] animate-slide-in">
					<div className="flex flex-col items-start gap-2">
						{NAVIGATION_LINKS.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className={`w-full px-2 py-3 text-lg font-semibold rounded transition-all duration-200
									text-black
									border-l-4 ${router.pathname === link.href ? "border-black bg-gradient-to-r from-neutral-100 to-white text-black" : "border-transparent"}
									hover:bg-gradient-to-r hover:from-neutral-100 hover:to-white
									hover:border-black
									active:bg-gradient-to-r active:from-neutral-200 active:to-white
									focus:outline-none focus:border-black
								`}
								onClick={() => setIsOpen(false)}
							>
								{link.name}
							</Link>
						))}
						<div className="w-full flex justify-center">
							<DynamicButton
								text="Resume"
								icon={<HiOutlineDownload size={18} />}
								href={resumeURL}
								download
								className="resume-btn"
								onClick={() => setIsOpen(false)}
								iconPosition="left"
							/>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
