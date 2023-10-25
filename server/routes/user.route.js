const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");
const authorizeLoggedInUser = require("../middlewares/authorizeLoggedInUser");


router.get(
	"/users",
	authorizeLoggedInUser,
	UserController.get_all_users
);
router.get(
	"/users/profile",
	authorizeLoggedInUser,
	UserController.get_user_profile
);

module.exports = router;