export const fetchHero = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getHero`);
	const data = res.json();
	return data;
};

export const fetchAbout = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAbout`);
	const data = res.json();
	return data;
};

export const fetchSkills = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSkills`);
	const data = res.json();
	return data;
};

export const fetchProjects = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getProjects`);
	const data = res.json();
	return data;
};

export const fetchResume = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getResume`);
	const data = res.json();
	return data;
};
