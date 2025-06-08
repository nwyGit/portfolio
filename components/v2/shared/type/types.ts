export interface Project {
	_id: string;
	title: string;
	summary: string;
	technologies: Skill[];
	githubLink: string;
	demoLink: string;
	desktopImageURL: string;
	mobileImageURL: string;
	category?: Category;
	order?: number;
}

export interface Skill {
	_id: string;
	title: string;
	order: number;
	image: string;
}

export interface About {
	paragraph1: string;
	paragraph2: string;
	selfieURL: string;
	aboutMeImageURL: string;
}

export interface Hero {
	greeting: string;
	name: string;
	slogan: string;
	description: string;
	skillDescription: string;
}

export interface LayoutProps {
	children: React.ReactNode;
	resumeURL?: string;
}

export interface Category {
	_id: string;
	name: string;
}
