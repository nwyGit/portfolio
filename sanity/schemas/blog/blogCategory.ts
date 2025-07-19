import { SchemaDefinition, ValidationRule } from '../../types'

export const blogCategory: SchemaDefinition = {
	name: "blogCategory",
	title: "Blog Category",
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
			validation: (Rule: ValidationRule) => Rule.required(),
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
