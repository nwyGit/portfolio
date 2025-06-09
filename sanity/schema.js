import about from "./schemas/portfolio/about";
import category from "./schemas/portfolio/category";
import hero from "./schemas/portfolio/hero";
import project from "./schemas/portfolio/project";
import resume from "./schemas/portfolio/resume";
import skill from "./schemas/portfolio/skill";
import blogPost from "./schemas/blog/blogPost";
import blogCategory from "./schemas/blog/blogCategory";
import blogTag from "./schemas/blog/blogTag";
import blogAuthor from "./schemas/blog/blogAuthor";

export const schema = {
	types: [
		hero,
		about,
		project,
		skill,
		resume,
		category,
		blogPost,
		blogCategory,
		blogTag,
		blogAuthor,
	],
};
