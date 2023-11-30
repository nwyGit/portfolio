import { about } from "./schemas/about";
import { category } from "./schemas/category";
import { hero } from "./schemas/hero";
import { project } from "./schemas/project";
import { resume } from "./schemas/resume";
import { skill } from "./schemas/skill";

export const schema = {
	types: [hero, about, project, skill, resume, category],
};
