const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

async function authorizeAdminUser(req, res, next) {
	const { authorization } = req.headers;
	if (!authorization) {
		return res.status(401).json({ error: 'Unauthorized. Please log in.' });
	}

	const token = authorization.replace('Bearer ', '');
	if (!token) {
		return res.status(401).json({ error: 'Unauthorized. Please log in.' });
	}

	try {
		// Verify and decode the JWT token
		const { userId } = jwt.verify(token, JWT_SECRET);

		const user = await User.findById(userId).select('isAdmin');
		if (!user.isAdmin) {
			return res.status(403).json({ error: 'Forbidden. You are not an admin.' });
		}

		req.userId = userId;

		next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({ error: 'Invalid token. Please log in again.' });
	}
}

module.exports = authorizeAdminUser;
