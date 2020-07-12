import jwtDecode from "jwt-decode";
import auth from "./auth";

const userToken = () => auth.getCurrentUser();
const getUserDetails = () => jwtDecode(userToken());
const getUserEmail = () => getUserDetails().email;
const getUserId = () => getUserDetails().id;
const getUserName = () => getUserDetails().name;
const expTime = () => getUserDetails().exp;

export default {
	userToken,
	getUserDetails,
	getUserEmail,
	getUserId,
	getUserName,
	expTime,
};
