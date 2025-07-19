import { SchemaDefinition, ValidationRule, PreviewSelection } from '../../types'

export const blogFAQ: SchemaDefinition = {
	name: "blogFAQ",
	title: "Blog FAQ",
	type: "document",
	fields: [
		{
			name: "blogPost",
			title: "Blog Post",
			type: "reference",
			to: [{ type: "post" }],
			validation: (Rule: ValidationRule) => Rule.required(),
		},
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
			name: "question",
			title: "Question (English)",
			type: "text",
			rows: 2,
			validation: (Rule: ValidationRule) => Rule.required().max(200),
		},
		{
			name: "question_zh",
			title: "Question (Traditional Chinese)",
			type: "text",
			rows: 2,
			validation: (Rule: ValidationRule) => Rule.max(200),
		},
		{
			name: "answer",
			title: "Answer (English)",
			type: "array",
			of: [{ type: "block" }],
			validation: (Rule: ValidationRule) => Rule.required(),
		},
		{
			name: "answer_zh",
			title: "Answer (Traditional Chinese)",
			type: "array",
			of: [{ type: "block" }],
		},
		{
			name: "order",
			title: "Display Order",
			type: "number",
			validation: (Rule: ValidationRule) => Rule.required().min(0),
			initialValue: 1,
		},
		{
			name: "category",
			title: "FAQ Category",
			type: "string",
			options: {
				list: [
					{ title: "General", value: "general" },
					{ title: "Technical", value: "technical" },
					{ title: "Implementation", value: "implementation" },
					{ title: "Troubleshooting", value: "troubleshooting" },
					{ title: "Best Practices", value: "best-practices" },
				],
			},
			initialValue: "general",
		},
		{
			name: "isActive",
			title: "Active",
			type: "boolean",
			initialValue: true,
		},
	],
	preview: {
		select: {
			question: "question",
			question_zh: "question_zh",
			language: "language",
			blogPost: "blogPost.title",
			order: "order",
		},
		prepare(selection: any) {
			const { question, question_zh, language, blogPost, order } = selection;
			const displayQuestion = language === "zh-Hant" ? question_zh || question : question;
			return {
				title: displayQuestion,
				subtitle: `${blogPost} (Order: ${order}, Lang: ${language})`,
			};
		},
	},
};

export default blogFAQ;