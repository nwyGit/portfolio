import jwtDecode from "jwt-decode";

import { createSlice } from "@reduxjs/toolkit";
import authServices from "@/app/services/auth";

import { AppDispatch } from "../store";
import { Credentials, currentUser } from "../../types";
import { setFavorites } from "./favoritesReducer";

const initialState: currentUser = {
	sub: "",
	username: "",
	avatarKey: "",
	favoriteIds: [],
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserReducer(state, action) {
			return action.payload;
		},
	},
});

export const { setUserReducer } = userSlice.actions;

export const setUser = (credentials: Credentials | string) => {
	return async (dispatch: AppDispatch) => {
		try {
			const typeOfCredentials = typeof credentials;
			if (typeOfCredentials == "object") {
				const token = await authServices.loginUser(credentials as Credentials);
				localStorage.setItem("access_token", token);
				const decodedToken: currentUser = jwtDecode(token);
				dispatch(setUserReducer(decodedToken));
			} else {
				if (credentials == "logout") {
					dispatch(setUserReducer(null));
				} else {
					const decodedToken: currentUser = jwtDecode(credentials as string);
					dispatch(setUserReducer(decodedToken));
				}
			}
		} catch (error) {
			throw error;
		}
	};
};

export default userSlice.reducer;