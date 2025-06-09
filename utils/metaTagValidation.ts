export function validateMetaTags({
	title,
	description,
	canonical,
	image,
}: {
	title?: string;
	description?: string;
	canonical?: string;
	image?: string;
}) {
	const errors: string[] = [];
	if (!title || title.length < 10)
		errors.push("Title is missing or too short.");
	if (!description || description.length < 30)
		errors.push("Description is missing or too short.");
	if (canonical && !/^https?:\/\//.test(canonical))
		errors.push("Canonical URL must be absolute.");
	if (image && !/^https?:\/\//.test(image))
		errors.push("Image URL must be absolute.");
	return errors;
}
