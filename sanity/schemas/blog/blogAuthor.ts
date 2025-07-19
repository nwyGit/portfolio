import { SchemaDefinition, ValidationRule } from '../../types'

export const blogAuthor: SchemaDefinition = {
	name: "author",
	title: "Author",
	type: "document",
	fields: [
		{
			name: "name",
			title: "Name",
			type: "string",
			validation: (Rule: ValidationRule) => Rule.required(),
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "name",
			},
		},
		{
			name: "bio",
			title: "Bio",
			type: "text",
		},
		{
			name: "image",
			title: "Profile Image",
			type: "image",
			options: {
				hotspot: true,
			},
		},
		{
			name: "socialLinks",
			title: "Social Links",
			type: "object",
			fields: [
				{ name: "twitter", title: "Twitter", type: "url" },
				{ name: "linkedin", title: "LinkedIn", type: "url" },
				{ name: "github", title: "GitHub", type: "url" },
			],
		},
	],
};

export default blogAuthor;
