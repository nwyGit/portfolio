import { FC } from "react";
import Layout from "../../components/v2/Layout";

const ProjectsPage: FC = () => {
	return (
		<Layout resumeURL="/resume.pdf">
			<div className="container mx-auto px-8 py-24">
				<h1 className="text-4xl font-bold mb-8">Projects</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{/* Placeholder Project Cards */}
					{[1, 2, 3, 4, 5, 6].map((item) => (
						<div
							key={item}
							className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
						>
							<div className="h-48 bg-gray-200 rounded-md mb-4"></div>
							<h2 className="text-xl font-semibold mb-2">Project {item}</h2>
							<p className="text-gray-600 mb-4">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
							<div className="flex gap-2">
								<span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
									React
								</span>
								<span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
									TypeScript
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default ProjectsPage;
