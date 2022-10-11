import axiosInstance from "../../../utilities/axios.service"
import localStorageService from "../../../utilities/local.storage.service";

const LOGIN_URL = '/opn/v1/authenticate';

const logIn = ({username, password}) => {

	return axiosInstance.post(LOGIN_URL,
		{username, password})
		.then(response => {
			localStorageService.setToken(response.data.token);
			localStorageService.setRole(response.data.role.toLowerCase());
			localStorageService.setIsAuthenticated(true);

			return response;

		})
		.catch(err => {
			throw err
		})
}

const logOut = () => {

	localStorageService.clear();
}

export {logIn, logOut}
