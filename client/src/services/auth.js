import axios from "axios";

const login = (email, password) => {
	return axios.post("/api/login", { email, password });
};

const signup = (email, password, fullname) => {
	return axios.post("/api/signup", { email, password, fullname });
};

const getCurrentUser = () => {
	return localStorage.getItem("token");
};

const authHeader = () => {
	const user = getCurrentUser();
	if (user && user.token) {
		return { "x-access-token": user.accessToken };
	} else {
		return {};
	}
};

export default {
	login,
	signup,
	getCurrentUser,
	authHeader,
};
