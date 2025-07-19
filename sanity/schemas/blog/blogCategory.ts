import { SchemaDefinition, ValidationRule } from '../../types'

export const blogCategory: SchemaDefinition = {
	name: "blogCategory",
	title: "Blog Category",
	type: "document",
	fields: [
		{
			name: "name",
			title: "Name (English)",
			type: "string",
			validation: (Rule: ValidationRule) => Rule.required(),
		},
		{
			name: "name_zh",
			title: "Name (Traditional Chinese)",
			type: "string",
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
			title: "Description (English)",
			type: "text",
		},
		{
			name: "description_zh",
			title: "Description (Traditional Chinese)",
			type: "text",
		},
		{
			name: "keywords",
			title: "SEO Keywords (English)",
			type: "array",
			of: [{ type: "string" }],
			options: {
				layout: "tags",
			},
		},
		{
			name: "keywords_zh",
			title: "SEO Keywords (Traditional Chinese)",
			type: "array",
			of: [{ type: "string" }],
			options: {
				layout: "tags",
			},
		},
	],
};

export default blogCategory;
