import { 
	BlogPost, 
	BlogPostWithLanguage, 
	BlogCategory, 
	BlogTag, 
	BlogFAQ, 
	BlogFAQWithLanguage,
	Language 
} from '@/components/v2/shared/type/types';

/**
 * Localizes a blog post based on the specified language
 * Falls back to English if content is not available in the target language
 */
export function localizeBlogPost(post: BlogPost, language: Language): BlogPostWithLanguage {
	const isEnglish = language === 'en';
	
	return {
		...post,
		title: isEnglish ? post.title : (post.title_zh || post.title),
		slug: isEnglish ? post.slug : (post.slug_zh || post.slug),
		summary: isEnglish ? post.summary : (post.summary_zh || post.summary),
		content: isEnglish ? post.content : (post.content_zh || post.content),
		metaTitle: isEnglish ? post.metaTitle : (post.metaTitle_zh || post.metaTitle),
		metaDescription: isEnglish ? post.metaDescription : (post.metaDescription_zh || post.metaDescription),
	};
}

/**
 * Localizes a blog category based on the specified language
 */
export function localizeBlogCategory(category: BlogCategory, language: Language) {
	const isEnglish = language === 'en';
	
	return {
		...category,
		name: isEnglish ? category.name : (category.name_zh || category.name),
		slug: isEnglish ? category.slug : (category.slug_zh || category.slug),
		description: isEnglish ? category.description : (category.description_zh || category.description),
	};
}

/**
 * Localizes a blog tag based on the specified language
 */
export function localizeBlogTag(tag: BlogTag, language: Language) {
	const isEnglish = language === 'en';
	
	return {
		...tag,
		name: isEnglish ? tag.name : (tag.name_zh || tag.name),
		slug: isEnglish ? tag.slug : (tag.slug_zh || tag.slug),
	};
}

/**
 * Localizes FAQ content based on the specified language
 */
export function localizeBlogFAQ(faq: BlogFAQ, language: Language): BlogFAQWithLanguage {
	const isEnglish = language === 'en';
	
	return {
		...faq,
		question: isEnglish ? faq.question : (faq.question_zh || faq.question),
		answer: isEnglish ? faq.answer : (faq.answer_zh || faq.answer),
	};
}

/**
 * Filters FAQs by language and returns localized content
 */
export function getLocalizedFAQs(faqs: BlogFAQ[], language: Language): BlogFAQWithLanguage[] {
	return faqs
		.filter(faq => faq.isActive)
		.map(faq => localizeBlogFAQ(faq, language))
		.sort((a, b) => a.order - b.order);
}

/**
 * Gets the opposite language for language switching
 */
export function getAlternateLanguage(currentLanguage: Language): Language {
	return currentLanguage === 'en' ? 'zh-Hant' : 'en';
}

/**
 * Gets language-specific date formatting
 */
export function formatDate(date: string, language: Language): string {
	const locale = language === 'en' ? 'en-US' : 'zh-TW';
	return new Date(date).toLocaleDateString(locale, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

/**
 * Gets language-specific URL path
 */
export function getLanguagePrefix(language: Language): string {
	return language === 'en' ? '/en' : '/zh';
}

/**
 * Generates hreflang attributes for SEO
 */
export function generateHreflangLinks(basePath: string) {
	return [
		{ hrefLang: 'en', href: `/en${basePath}` },
		{ hrefLang: 'zh-Hant', href: `/zh${basePath}` },
		{ hrefLang: 'x-default', href: `/en${basePath}` }, // Default to English
	];
}

/**
 * Checks if content exists for a given language
 */
export function hasContentForLanguage(post: BlogPost, language: Language): boolean {
	if (language === 'en') {
		return Boolean(post.title && post.content);
	} else {
		return Boolean(post.title_zh && post.content_zh);
	}
}

/**
 * Language-specific error messages
 */
export const languageMessages = {
	en: {
		notFound: 'Post not found',
		loading: 'Loading...',
		readMore: 'Read more',
		publishedOn: 'Published on',
		by: 'by',
		relatedPosts: 'Related Posts',
		faq: 'Frequently Asked Questions',
		categories: 'Categories',
		tags: 'Tags',
		backToBlog: 'Back to Blog',
		switchLanguage: '中文版',
	},
	'zh-Hant': {
		notFound: '找不到文章',
		loading: '載入中...',
		readMore: '閱讀更多',
		publishedOn: '發布於',
		by: '作者',
		relatedPosts: '相關文章',
		faq: '常見問題',
		categories: '分類',
		tags: '標籤',
		backToBlog: '返回部落格',
		switchLanguage: 'English',
	},
} as const;

/**
 * Gets localized messages for the current language
 */
export function getLocalizedMessages(language: Language) {
	return languageMessages[language];
}