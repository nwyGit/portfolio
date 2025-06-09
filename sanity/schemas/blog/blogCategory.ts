export const blogCategory = {
	name: "blogCategory",
	title: "Blog Category",
	type: "document",
	fields: [
		{
			name: "name",
			title: "Name",
			type: "string",
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "name",
			},
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: "description",
			title: "Description",
			type: "text",
		},
		{
			name: "keywords",
			title: "SEO Keywords",
			type: "array",
			of: [{ type: "string" }],
			options: {
				layout: "tags",
			},
		},
	],
};

export default blogCategory;
