import Image from "next/image";
import { HiOutlineDownload } from "react-icons/hi";

interface AboutSectionProps {
	about: any;
	skills: any;
}

export default function AboutSection({ about, skills }: AboutSectionProps) {
	return (
		<div className="bg-white w-full flex flex-col items-stretch pt-[100px]">
			{/* Hero/About Section */}
			<section className="about-hero relative">
				<div className="flex-1 flex flex-col items-center text-center md:items-start md:text-left justify-center gap-8">
					<h1 className="about-hero-title md:absolute top-auto md:top-[25%] z-20">
						Driving Success with <br />
						Thoughtful System Design
					</h1>
				</div>
				<div className="flex-1 flex">
					<div className="about-img-container mx-auto md:w-[160%] relative -mb-16 md:-mb-24 z-10 md:-ml-40">
						<Image
							src={about?.aboutMeImageURL}
							alt="About Raymond Ng"
							width={800}
							height={600}
							className="object-cover w-full h-full"
							priority
						/>
					</div>
				</div>
				{/* Resume Button: mobile below image, desktop absolute bottom left */}
				<div className="flex justify-center md:absolute md:left-0 md:bottom-0 md:w-full md:px-16 xl:px-32 md:pb-8 md:justify-start z-30">
					<a href="/resume.pdf" download className="about-resume-btn">
						<HiOutlineDownload size={24} />
						Resume
					</a>
				</div>
			</section>

			{/* My Work Section */}
			<section className="about-section pt-16 md:pt-24 xl:pt-32">
				<div className="flex flex-col gap-4 md:max-w-[500px] items-center text-center md:items-start md:text-left">
					<h2 className="about-section-title">My Work</h2>
					<div className="flex flex-col gap-5">
						<p className="about-section-text">{about?.paragraph1}</p>
						<p className="about-section-text">{about?.paragraph2}</p>
					</div>
				</div>
				<div className="flex flex-col gap-4 max-w-[640px] items-center text-center md:items-start md:text-left">
					<h2 className="about-section-title">My Skills</h2>
					<div className="flex flex-wrap gap-3 justify-center md:justify-start">
						{skills
							?.sort((a: any, b: any) => a.order - b.order)
							.map((skill: any) => (
								<span key={skill._id} className="about-skill">
									{skill.title}
								</span>
							))}
					</div>
				</div>
			</section>

			{/* Clients Section */}
			{/* <section className="w-full bg-[#F5F5F5] flex flex-col items-center px-8 md:px-0 pt-10 pb-20">
				<h2 className="about-section-title mb-6">Clients</h2>
				<div className="flex flex-row flex-wrap justify-center gap-10">
					{[...Array(7)].map((_, i) => (
						<div key={i} className="about-client-logo">
							<Image
								src="/v2/assets/client_logo.png"
								alt={`Client Logo ${i + 1}`}
								width={140}
								height={140}
								className="object-contain w-[100px] h-[100px]"
							/>
						</div>
					))}
				</div>
			</section> */}
		</div>
	);
}
