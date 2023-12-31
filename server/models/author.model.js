const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	dateOfBirth: {
		type: Date,
	},
	nationality: {
		type: String,
	},
	biography: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
