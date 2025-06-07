export interface Project {
	_id: string;
	title: string;
	description: string;
	image: string;
	link: string;
	github: string;
	technologies: string[];
}

export interface Skill {
	_id: string;
	title: string;
	order: number;
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
}

export interface LayoutProps {
	children: React.ReactNode;
	resumeURL?: string;
}
