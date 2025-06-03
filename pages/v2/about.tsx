import { FC } from "react";
import Layout from "../../components/v2/Layout";

const AboutPage: FC = () => {
	return (
		<Layout resumeURL="/resume.pdf">
			<div className="container mx-auto px-8 py-24">
				<div className="max-w-3xl mx-auto">
					<h1 className="text-4xl font-bold mb-8">About Me</h1>

					{/* Profile Section */}
					<div className="flex flex-col md:flex-row gap-8 mb-12">
						<div className="w-48 h-48 bg-gray-200 rounded-full mx-auto md:mx-0"></div>
						<div className="flex-1">
							<h2 className="text-2xl font-semibold mb-4">Raymond Ng</h2>
							<p className="text-gray-600 mb-4">
								Full Stack Developer passionate about creating beautiful and
								functional web applications. Specializing in React, TypeScript,
								and modern web technologies.
							</p>
							<div className="flex gap-4">
								<a
									href="https://github.com/nwyGit"
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-600 hover:text-black"
								>
									GitHub
								</a>
								<a
									href="https://www.linkedin.com/in/raymond-wyng"
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
							{[
								"React",
								"TypeScript",
								"Node.js",
								"Next.js",
								"Tailwind CSS",
								"GraphQL",
							].map((skill) => (
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
							<div className="border-l-2 border-gray-200 pl-4">
								<h3 className="text-xl font-medium">Senior Developer</h3>
								<p className="text-gray-500">2020 - Present</p>
								<p className="text-gray-600 mt-2">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
								</p>
							</div>
							<div className="border-l-2 border-gray-200 pl-4">
								<h3 className="text-xl font-medium">Full Stack Developer</h3>
								<p className="text-gray-500">2018 - 2020</p>
								<p className="text-gray-600 mt-2">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
								</p>
							</div>
						</div>
					</section>
				</div>
			</div>
		</Layout>
	);
};

export default AboutPage;
