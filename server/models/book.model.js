const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Author',
	},
	description: {
		type: String,
	},
	cover: {
		type: String,
	},
	ISBN: String,
	totalReviews: {
		type: Number,
		default: 0,
	},
	averageRating: {
		type: Number,
		default: 0,
	},
	status: {
		type: String,
		default: 'Available',
		enum: ['Available', 'Borrowed', 'Reserved'],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
