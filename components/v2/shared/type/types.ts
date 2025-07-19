import { PortableTextBlock } from '@portabletext/types';

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

export interface BlogPost {
	_id: string;
	title: string;
	metaTitle?: string;
	metaDescription?: string;
	slug: {
		current: string;
	};
	summary?: string;
	content: PortableTextBlock[];
	author: BlogAuthor;
	category?: BlogCategory;
	tags?: BlogTag[] | string[];
	featuredImage?: {
		asset: {
			url: string;
		};
		alt?: string;
	};
	publishedAt: string;
	updatedAt?: string;
	status?: 'draft' | 'published' | 'archived';
	canonicalUrl?: string;
	keywords?: string[];
}

export interface BlogAuthor {
	_id: string;
	name: string;
	slug?: {
		current: string;
	};
	bio?: string;
	image?: {
		asset: {
			url: string;
		};
	};
	socialLinks?: {
		twitter?: string;
		linkedin?: string;
		github?: string;
	};
}

export interface BlogCategory {
	_id: string;
	name: string;
	slug: {
		current: string;
	};
	description?: string;
	keywords?: string[];
}

export interface BlogTag {
	_id: string;
	name: string;
	slug: {
		current: string;
	};
}

export interface Resume {
	_id: string;
	resumeURL: string;
}
