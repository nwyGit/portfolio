const project = {
	name: "project",
	title: "Project",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
		},
		{
			name: "summary",
			title: "Summary",
			type: "text",
		},
		{
			name: "desktopImage",
			title: "DesktopImage",
			type: "image",
		},
		{
			name: "mobileImage",
			title: "MobileImage",
			type: "image",
		},
		{
			name: "technologies",
			title: "Technologies",
			type: "array",
			of: [{ type: "reference", to: { type: "skill" } }],
		},
		{
			name: "category",
			title: "Category",
			type: "reference",
			to: [{ type: "category" }],
		},
		{
			name: "dateCompleted",
			title: "DateCompleted",
			type: "date",
		},
		{
			name: "order",
			title: "Order",
			type: "number",
		},
		{
			name: "demoLink",
			title: "DemoLink",
			type: "url",
		},
		{
			name: "githubLink",
			title: "GithubLink",
			type: "url",
		},
	],
};

export default project;
