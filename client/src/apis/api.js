import axios from "axios";
import { BASE_URL } from "../utils/urls";

export const sendAuthRequest = (URL, data) => {
	return axios({
		method: 'POST',
		url: BASE_URL + URL,
		data: data,
		headers: {
			'Content-Type': 'application/json',
		}
	});
};

export const sendAuthorizedAuthRequest = (URL, data, token) => {
	return axios({
		method: 'POST',
		url: BASE_URL + URL,
		data: data,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		}
	});
}

export const sendGetRequest = (url, accessToken) => {
	return axios({
		method: 'GET',
		url: BASE_URL + url,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		}
	});
};

export const sendPostRequest = (url, data, accessToken, hasFile = false) => {
	return axios({
		method: 'POST',
		url: BASE_URL + url,
		data: data,
		headers: {
			'Content-Type': hasFile ? 'multipart/form-data' : 'application/json',
			Authorization: `Bearer ${accessToken}`
		}
	});
};

export const sendPutRequest = (url, data, accessToken, hasFile = false) => {
	return axios({
		method: 'PUT',
		url: BASE_URL + url,
		data: data,
		headers: {
			'Content-Type': hasFile ? 'multipart/form-data' : 'application/json',
			Authorization: `Bearer ${accessToken}`
		}
	});
};

export const sendDeleteRequest = (url, accessToken) => {
	return axios({
		method: 'DELETE',
		url: BASE_URL + url,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		}
	});
};