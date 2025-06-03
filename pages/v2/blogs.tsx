import { FC } from "react";
import Layout from "../../components/v2/Layout";

const BlogsPage: FC = () => {
	return (
		<Layout resumeURL="/resume.pdf">
			<div className="container mx-auto px-8 py-24">
				<h1 className="text-4xl font-bold mb-8">Blogs</h1>
				<div className="space-y-8">
					{/* Placeholder Blog Posts */}
					{[1, 2, 3].map((item) => (
						<article
							key={item}
							className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
						>
							<div className="flex items-center gap-4 mb-4">
								<div className="h-12 w-12 bg-gray-200 rounded-full"></div>
								<div>
									<h2 className="text-xl font-semibold">Blog Post {item}</h2>
									<p className="text-gray-500">March {item}, 2024</p>
								</div>
							</div>
							<p className="text-gray-600 mb-4">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat.
							</p>
							<div className="flex gap-2">
								<span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
									Web Development
								</span>
								<span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
									React
								</span>
							</div>
						</article>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default BlogsPage;
