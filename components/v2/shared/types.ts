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
	name: string;
	icon: string;
	level: number;
}

export interface About {
	_id: string;
	title: string;
	description: string;
	image: string;
}

export interface Hero {
	_id: string;
	title: string;
	subtitle: string;
	image: string;
}

export interface LayoutProps {
	children: React.ReactNode;
	resumeURL?: string;
}
