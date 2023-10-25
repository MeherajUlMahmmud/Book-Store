var BASE_URL, MAT_URL;

BASE_URL = "http://localhost:8000/api";
MAT_URL = "http://localhost:8000";

export { BASE_URL, MAT_URL };

// AUTH
export const AUTH_URL = "/auth";
export const SIGNUP_URL = AUTH_URL + "/signup";
export const LOGIN_URL = AUTH_URL + "/login";

// BOOKS
export const BOOKS_URL = "/books";

// REVIEWS
export const REVIEWS_URL = "/reviews";

// BORROW
export const BORROWS_URL = "/borrows";

// RESERVE
export const RESERVES_URL = "/reserves";

// User
export const USER_URL = "/users";
export const PROFILE_URL = USER_URL + "/profile"
export const GET_ALL_USERS_URL = USER_URL + "/list";
export const GET_USER_DETAILS_URL = USER_URL + "/get";
export const UPDATE_USER_INFO_URL = USER_URL + "/update";
export const UPDATE_USERNAME_URL = USER_URL + "/update_username";
export const UPDATE_PASSWORD_URL = USER_URL + "/update_password";