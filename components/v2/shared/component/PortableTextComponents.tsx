import React from 'react';
import Image from 'next/image';
import { PortableTextBlockComponent, PortableTextComponents } from '@portabletext/react';

// Simple HTML sanitization function
const sanitizeHTML = (html: string): string => {
	const sanitized = html
		.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
		.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
		.replace(/on\w+="[^"]*"/gi, '') // Remove event handlers
		.replace(/javascript:/gi, ''); // Remove javascript: URLs
	
	return sanitized;
};

// The page already renders the article title as the only H1. Pasted HTML
// often repeats a different H1, so keep that heading's words and appearance
// while emitting it as an H2.
const demoteEmbeddedH1 = (html: string): string => {
	const withClass = html.replace(/<h1(\s[^>]*)?>/gi, (_match, attrs: string = '') => {
		const attributes = attrs || '';
		if (/\bclass\s*=/i.test(attributes)) {
			return `<h2${attributes.replace(/\bclass\s*=\s*(['"])/i, 'class=$1blog-html-h1 ')}>`;
		}
		return `<h2 class="blog-html-h1"${attributes}>`;
	});
	return withClass.replace(/<\/h1>/gi, '</h2>');
};

// Interface for image blocks in PortableText
interface PortableTextImage {
	_type: 'image';
	asset: {
		_ref: string;
		url?: string;
	};
	alt?: string;
	caption?: string;
	hotspot?: {
		x: number;
		y: number;
		height: number;
		width: number;
	};
	crop?: {
		top: number;
		bottom: number;
		left: number;
		right: number;
	};
}

// Helper function to generate Sanity image URL
const urlFor = (source: PortableTextImage): string => {
	if (source.asset.url) {
		return source.asset.url;
	}
	
	// Fallback: construct URL from asset reference
	const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
	const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
	const assetId = source.asset._ref;
	
	// Extract image details from asset reference
	// Format: image-{asset-id}-{dimensions}-{format}
	const [, id, dimensions, format] = assetId.split('-');
	return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
};

// Custom Image Component for PortableText
const ImageComponent: React.FC<{ value: PortableTextImage }> = ({ value }) => {
	const imageUrl = urlFor(value);
	const alt = value.alt || 'Blog post image';
	
	// Debug logging
	if (process.env.NODE_ENV === 'development') {
		console.log('PortableText Image - Asset ref:', value.asset._ref);
		console.log('PortableText Image - Generated URL:', imageUrl);
	}
	
	return (
		<figure className="my-8 w-full">
			<div className="relative w-full overflow-hidden rounded-lg shadow-lg">
				<Image
					src={imageUrl}
					alt={alt}
					width={1200}
					height={800}
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
					className="w-full h-auto object-cover"
					style={{
						width: '100%',
						height: 'auto',
					}}
					priority={false}
				/>
			</div>
			{value.caption && (
				<figcaption className="mt-3 text-center text-sm text-gray-600 italic">
					{value.caption}
				</figcaption>
			)}
		</figure>
	);
};

// Normal block component that handles HTML content
const NormalBlock: PortableTextBlockComponent = ({ children, value }) => {
	// Get the raw text content from the block
	const textContent = (value.children || [])
		.map((child) => (
			child && typeof child === 'object' && 'text' in child && typeof child.text === 'string'
				? child.text
				: ''
		))
		.join('');
	
	// Check if content contains HTML tags. Render the same markup on the
	// server and client so crawlers receive the article body.
	if (textContent.includes('<') && textContent.includes('>')) {
		const htmlContent = demoteEmbeddedH1(sanitizeHTML(textContent));
		return (
			<div
				className="blog-html-content"
				dangerouslySetInnerHTML={{ __html: htmlContent }}
			/>
		);
	}
	
	// Regular text content - keep existing styling
	return (
		<p className="mb-4 leading-relaxed text-gray-800">
			{children}
		</p>
	);
};

// PortableText components configuration
export const portableTextComponents: PortableTextComponents = {
	types: {
		image: ImageComponent,
	},
	block: {
		// Customize block styles
		h1: ({ children }) => (
			<h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4 text-gray-900">
				{children}
			</h1>
		),
		h2: ({ children }) => (
			<h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-gray-900">
				{children}
			</h2>
		),
		h3: ({ children }) => (
			<h3 className="text-xl md:text-2xl font-bold mt-6 mb-3 text-gray-900">
				{children}
			</h3>
		),
		h4: ({ children }) => (
			<h4 className="text-lg md:text-xl font-bold mt-6 mb-3 text-gray-900">
				{children}
			</h4>
		),
		blockquote: ({ children }) => (
			<blockquote className="border-l-4 border-blue-500 pl-6 my-6 italic text-gray-700 bg-gray-50 py-4 rounded-r-lg">
				{children}
			</blockquote>
		),
		normal: NormalBlock,
	},
	marks: {
		// Customize inline styles
		strong: ({ children }) => (
			<strong className="font-bold text-gray-900">{children}</strong>
		),
		em: ({ children }) => (
			<em className="italic text-gray-700">{children}</em>
		),
		code: ({ children }) => (
			<code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
				{children}
			</code>
		),
		link: ({ children, value }) => (
			<a
				href={value?.href}
				target={value?.blank ? '_blank' : undefined}
				rel={value?.blank ? 'noopener noreferrer' : undefined}
				className="text-blue-600 hover:text-blue-800 underline transition-colors"
			>
				{children}
			</a>
		),
	},
	list: {
		// Customize list styles
		bullet: ({ children }) => (
			<ul className="list-disc list-inside mb-4 pl-4 space-y-2">
				{children}
			</ul>
		),
		number: ({ children }) => (
			<ol className="list-decimal list-inside mb-4 pl-4 space-y-2">
				{children}
			</ol>
		),
	},
	listItem: {
		bullet: ({ children }) => (
			<li className="text-gray-800 leading-relaxed">{children}</li>
		),
		number: ({ children }) => (
			<li className="text-gray-800 leading-relaxed">{children}</li>
		),
	},
};

export default portableTextComponents;