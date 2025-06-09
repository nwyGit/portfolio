export const blogPost = {
	name: "post",
	title: "Post",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
			validation: (Rule: any) => Rule.required().max(60),
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: "summary",
			title: "Summary",
			type: "text",
			rows: 3,
			validation: (Rule: any) => Rule.max(160),
		},
		{
			name: "metaTitle",
			title: "Meta Title (SEO)",
			type: "string",
			validation: (Rule: any) => Rule.max(60),
		},
		{
			name: "metaDescription",
			title: "Meta Description (SEO)",
			type: "text",
			rows: 2,
			validation: (Rule: any) => Rule.max(160),
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
			title: "Content",
			type: "array",
			of: [{ type: "block" }],
		},
		{
			name: "author",
			title: "Author",
			type: "reference",
			to: [{ type: "author" }],
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: "category",
			title: "Category",
			type: "reference",
			to: [{ type: "blogCategory" }],
			validation: (Rule: any) => Rule.required(),
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
			validation: (Rule: any) => Rule.required(),
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
		prepare(selection: any) {
			const { author } = selection;
			return Object.assign({}, selection, {
				subtitle: author && `by ${author}`,
			});
		},
	},
};

export default blogPost;
