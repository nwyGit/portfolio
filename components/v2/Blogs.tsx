import { FC } from "react";
import Layout from "./Layout";

interface Blog {
	id: string;
	title: string;
	content: string;
	date: string;
	author: {
		name: string;
		image: string;
	};
	tags: string[];
	// Add other fields from Sanity schema
}

interface BlogsProps {
	blogs: Blog[];
}

const Blogs: FC<BlogsProps> = ({ blogs }) => {
	return (
		<Layout resumeURL="/resume.pdf">
			<div className="container mx-auto px-8 py-24">
				<h1 className="text-4xl font-bold mb-8">Blogs</h1>
				<div className="space-y-8">
					{blogs.map((blog) => (
						<article
							key={blog.id}
							className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
						>
							<div className="flex items-center gap-4 mb-4">
								{blog.author.image && (
									<img
										src={blog.author.image}
										alt={blog.author.name}
										className="h-12 w-12 rounded-full object-cover"
									/>
								)}
								<div>
									<h2 className="text-xl font-semibold">{blog.title}</h2>
									<p className="text-gray-500">{blog.date}</p>
								</div>
							</div>
							<p className="text-gray-600 mb-4">{blog.content}</p>
							<div className="flex gap-2 flex-wrap">
								{blog.tags.map((tag) => (
									<span
										key={tag}
										className="px-3 py-1 bg-gray-100 rounded-full text-sm"
									>
										{tag}
									</span>
								))}
							</div>
						</article>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default Blogs;
