const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require("./../database");
const User = require("../models/user.model");

require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async function (req, res) {
	console.log(req.body);
	const { username, email, name, password } = req.body;

	if (!username || !email || !name || !password) {
		return res.status(400).json({
			message: 'Username, email, name and password are required fields',
		});
	}

	try {
		// check for existing user with the same username or email
		const existingUser = await User.findOne({ $or: [{ username }, { email }] });
		if (existingUser) {
			return res.status(404).json({ error: 'User already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({
			_id: new database.Types.ObjectId(),
			username,
			email,
			name,
			password: hashedPassword,
		});

		await user.save();
		res.json({ message: 'User registered successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error registering user' });
	}
};

exports.login = async function (req, res) {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({ message: 'Please provide username and password' });
	}

	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Invalid password' });
		}

		const token = jwt.sign({ userId: user._id }, JWT_SECRET);
		res.json({ token });
	} catch (error) {
		res.status(500).json({
			message: 'Error during login',
		});
	}
};
