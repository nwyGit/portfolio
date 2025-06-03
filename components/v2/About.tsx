import { FC } from "react";
import Layout from "./Layout";

interface About {
	profile: {
		name: string;
		image: string;
		description: string;
		socialLinks: {
			github: string;
			linkedin: string;
		};
	};
	skills: string[];
	experience: {
		title: string;
		period: string;
		description: string;
	}[];
	// Add other fields from Sanity schema
}

interface AboutProps {
	about: About;
}

const About: FC<AboutProps> = ({ about }) => {
	return (
		<Layout resumeURL="/resume.pdf">
			<div className="container mx-auto px-8 py-24">
				<div className="max-w-3xl mx-auto">
					<h1 className="text-4xl font-bold mb-8">About Me</h1>

					{/* Profile Section */}
					<div className="flex flex-col md:flex-row gap-8 mb-12">
						{about.profile.image && (
							<img
								src={about.profile.image}
								alt={about.profile.name}
								className="w-48 h-48 rounded-full object-cover mx-auto md:mx-0"
							/>
						)}
						<div className="flex-1">
							<h2 className="text-2xl font-semibold mb-4">
								{about.profile.name}
							</h2>
							<p className="text-gray-600 mb-4">{about.profile.description}</p>
							<div className="flex gap-4">
								<a
									href={about.profile.socialLinks.github}
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-600 hover:text-black"
								>
									GitHub
								</a>
								<a
									href={about.profile.socialLinks.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-600 hover:text-black"
								>
									LinkedIn
								</a>
							</div>
						</div>
					</div>

					{/* Skills Section */}
					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Skills</h2>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
							{about.skills.map((skill) => (
								<div
									key={skill}
									className="bg-gray-100 rounded-lg p-4 text-center"
								>
									{skill}
								</div>
							))}
						</div>
					</section>

					{/* Experience Section */}
					<section>
						<h2 className="text-2xl font-semibold mb-4">Experience</h2>
						<div className="space-y-6">
							{about.experience.map((exp, index) => (
								<div key={index} className="border-l-2 border-gray-200 pl-4">
									<h3 className="text-xl font-medium">{exp.title}</h3>
									<p className="text-gray-500">{exp.period}</p>
									<p className="text-gray-600 mt-2">{exp.description}</p>
								</div>
							))}
						</div>
					</section>
				</div>
			</div>
		</Layout>
	);
};

export default About;
