import { SchemaDefinition, ValidationRule, PreviewSelection } from '../../types'

export const blogPost: SchemaDefinition = {
	name: "post",
	title: "Post",
	type: "document",
	fields: [
		{
			name: "language",
			title: "Language",
			type: "string",
			options: {
				list: [
					{ title: "English", value: "en" },
					{ title: "Traditional Chinese", value: "zh-Hant" },
				],
			},
			initialValue: "en",
			validation: (Rule: ValidationRule) => Rule.required(),
		},
		{
			name: "title",
			title: "Title (English)",
			type: "string",
			validation: (Rule: ValidationRule) => Rule.required().max(60),
		},
		{
			name: "title_zh",
			title: "Title (Traditional Chinese)",
			type: "string",
			validation: (Rule: ValidationRule) => Rule.max(60),
		},
		{
			name: "slug",
			title: "Slug (English)",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: (Rule: ValidationRule) => Rule.required(),
		},
		{
			name: "slug_zh",
			title: "Slug (Traditional Chinese)",
			type: "slug",
			options: {
				source: "title_zh",
				maxLength: 96,
			},
		},
		{
			name: "summary",
			title: "Summary (English)",
			type: "text",
			rows: 3,
			validation: (Rule: ValidationRule) => Rule.max(160),
		},
		{
			name: "summary_zh",
			title: "Summary (Traditional Chinese)",
			type: "text",
			rows: 3,
			validation: (Rule: ValidationRule) => Rule.max(160),
		},
		{
			name: "metaTitle",
			title: "Meta Title (English - SEO)",
			type: "string",
			validation: (Rule: ValidationRule) => Rule.max(60),
		},
		{
			name: "metaTitle_zh",
			title: "Meta Title (Traditional Chinese - SEO)",
			type: "string",
			validation: (Rule: ValidationRule) => Rule.max(60),
		},
		{
			name: "metaDescription",
			title: "Meta Description (English - SEO)",
			type: "text",
			rows: 2,
			validation: (Rule: ValidationRule) => Rule.max(160),
		},
		{
			name: "metaDescription_zh",
			title: "Meta Description (Traditional Chinese - SEO)",
			type: "text",
			rows: 2,
			validation: (Rule: ValidationRule) => Rule.max(160),
		},
		{
			name: "keywords",
			title: "Keywords",
			type: "array",
			of: [{ type: "string" }],
			options: {
				layout: "tags",
			},
		},
		{
			name: "featuredImage",
			title: "Featured Image",
			type: "image",
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: "alt",
					title: "Alt Text",
					type: "string",
				},
			],
		},
		{
			name: "content",
			title: "Content (English)",
			type: "array",
			of: [{ type: "block" }],
		},
		{
			name: "content_zh",
			title: "Content (Traditional Chinese)",
			type: "array",
			of: [{ type: "block" }],
		},
		{
			name: "author",
			title: "Author",
			type: "reference",
			to: [{ type: "author" }],
			validation: (Rule: ValidationRule) => Rule.required(),
		},
		{
			name: "category",
			title: "Category",
			type: "reference",
			to: [{ type: "blogCategory" }],
			validation: (Rule: ValidationRule) => Rule.required(),
		},
		{
			name: "tags",
			title: "Tags",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "tag" }],
				},
			],
		},
		{
			name: "publishedAt",
			title: "Published Date",
			type: "datetime",
			validation: (Rule: ValidationRule) => Rule.required(),
		},
		{
			name: "updatedAt",
			title: "Updated Date",
			type: "datetime",
		},
		{
			name: "status",
			title: "Status",
			type: "string",
			options: {
				list: [
					{ title: "Draft", value: "draft" },
					{ title: "Published", value: "published" },
					{ title: "Archived", value: "archived" },
				],
			},
			initialValue: "draft",
		},
		{
			name: "canonicalUrl",
			title: "Canonical URL",
			type: "url",
		},
	],
	preview: {
		select: {
			title: "title",
			author: "author.name",
			media: "featuredImage",
		},
		prepare(selection: PreviewSelection) {
			const { author } = selection;
			return Object.assign({}, selection, {
				subtitle: author && `by ${author}`,
			});
		},
	},
};

export default blogPost;
