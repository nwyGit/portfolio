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
	language: 'en' | 'zh-Hant';
	title: string;
	title_zh?: string;
	metaTitle?: string;
	metaTitle_zh?: string;
	metaDescription?: string;
	metaDescription_zh?: string;
	slug: {
		current: string;
	};
	slug_zh?: {
		current: string;
	};
	summary?: string;
	summary_zh?: string;
	content: PortableTextBlock[];
	content_zh?: PortableTextBlock[];
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
	faqs?: BlogFAQ[];
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
	name_zh?: string;
	slug: {
		current: string;
	};
	slug_zh?: {
		current: string;
	};
	description?: string;
	description_zh?: string;
	keywords?: string[];
}

export interface BlogTag {
	_id: string;
	name: string;
	name_zh?: string;
	slug: {
		current: string;
	};
	slug_zh?: {
		current: string;
	};
}

export interface BlogFAQ {
	_id: string;
	blogPost: {
		_ref: string;
	};
	language: 'en' | 'zh-Hant';
	question: string;
	question_zh?: string;
	answer: PortableTextBlock[];
	answer_zh?: PortableTextBlock[];
	order: number;
	category: 'general' | 'technical' | 'implementation' | 'troubleshooting' | 'best-practices';
	isActive: boolean;
}

export interface Resume {
	_id: string;
	resumeURL: string;
}

// Utility types for language support
export type Language = 'en' | 'zh-Hant';

export interface LocalizedContent<T> {
	en: T;
	'zh-Hant'?: T;
}

export interface LanguageRouteParams {
	lang: Language;
	post?: string;
	category?: string;
	tag?: string;
}

export interface BlogPostWithLanguage extends Omit<BlogPost, 'title' | 'slug' | 'summary' | 'content' | 'metaTitle' | 'metaDescription'> {
	title: string;
	slug: { current: string };
	summary?: string;
	content: PortableTextBlock[];
	metaTitle?: string;
	metaDescription?: string;
}

export interface BlogFAQWithLanguage extends Omit<BlogFAQ, 'question' | 'answer'> {
	question: string;
	answer: PortableTextBlock[];
}
