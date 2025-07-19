import { SchemaDefinition, ValidationRule } from '../../types'

export const blogTag: SchemaDefinition = {
	name: "tag",
	title: "Tag",
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
			title: "Slug (English)",
			type: "slug",
			options: {
				source: "name",
			},
			validation: (Rule: ValidationRule) => Rule.required(),
		},
		{
			name: "slug_zh",
			title: "Slug (Traditional Chinese)",
			type: "slug",
			options: {
				source: "name_zh",
			},
		},
	],
};

export default blogTag;
