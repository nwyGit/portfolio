import axios from 'axios';
import jwt_decode from 'jwt-decode';

const setToken = (token) => {
	localStorage.setItem('access_token', token);
};

export const getToken = () => {
	try {
		return localStorage.getItem('access_token');
	} catch (err) {
		return null;
	}
};

export const readToken = () => {
	try {
		const token = getToken();
		return token ? jwt_decode(token) : null;
	} catch (err) {
		return null;
	}
};

export const removeToken = () => {
	return localStorage.removeItem('access_token');
};

export function isAuthenticated() {
	const token = readToken();
	return token ? true : false;
}

export async function authenticateUser(data) {
	const response = await axios
		.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, data)
		.catch((res) => {
			throw new Error(res.response.data.message);
		});

	if (response.status === 200) {
		setToken(response.data.token);
		return response.data.message;
	} else {
		return false;
	}
}
