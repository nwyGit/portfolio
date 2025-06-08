import Image from "next/image";
import { HiOutlineDownload } from "react-icons/hi";
import { About, Skill } from "@/components/v2/shared/type/types";

interface AboutSectionProps {
	about: About;
	skills: Skill[];
}

export default function AboutSection({ about, skills }: AboutSectionProps) {
	const { paragraph1, paragraph2, aboutMeImageURL } = about;

	return (
		<div className="bg-white w-full flex flex-col items-stretch pt-[130px]">
			{/* Hero/About Section */}
			<section className="about-hero relative">
				<div className="flex-1 flex flex-col items-center text-center xl:items-start xl:text-left justify-center gap-8">
					<h1 className="about-hero-title">
						Driving Success with <br />
						Thoughtful System Design
					</h1>
					<a
						href="/resume.pdf"
						download
						className="about-resume-btn hidden xl:inline-flex"
					>
						<HiOutlineDownload size={24} />
						Resume
					</a>
				</div>
				<div className="flex-1 flex flex-col items-center">
					<div className="about-img-container mx-auto w-full max-w-[400px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1200px] relative mb-0 xl:-mb-24 z-10">
						{/* Mobile: original behavior */}
						<div className="block md:hidden">
							<Image
								src={aboutMeImageURL}
								alt="About Raymond Ng"
								width={800}
								height={600}
								className="object-cover w-full h-auto rounded-lg"
								priority
							/>
						</div>
						{/* Desktop: aspect ratio and fill */}
						<div className="hidden md:block md:aspect-[4/3] w-full h-full relative">
							<Image
								src={aboutMeImageURL}
								alt="About Raymond Ng"
								fill
								className="object-cover object-top rounded-lg"
								priority
							/>
						</div>
					</div>
					<a
						href="/resume.pdf"
						download
						className="about-resume-btn mt-4 xl:hidden"
					>
						<HiOutlineDownload size={24} />
						Resume
					</a>
				</div>
			</section>

			{/* My Work Section */}
			<section className="about-section pt-16 md:pt-24 xl:pt-32">
				<div className="flex flex-col gap-4 xl:max-w-[700px] items-center text-center xl:items-start xl:text-left">
					<h2 className="about-section-title text-xl md:text-2xl lg:text-3xl">
						My Work
					</h2>
					<div className="flex flex-col gap-5">
						<p className="about-section-text text-base md:text-lg lg:text-xl">
							{paragraph1}
						</p>
						<p className="about-section-text text-base md:text-lg lg:text-xl">
							{paragraph2}
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-4 xl:max-w-[640px] items-center text-center xl:items-start xl:text-left">
					<h2 className="about-section-title text-xl md:text-2xl lg:text-3xl">
						My Skills
					</h2>
					<div className="flex flex-wrap gap-3 justify-center xl:justify-start">
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
