const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookReserveSchema = new Schema({
	book: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Book',
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const BookReserve = mongoose.model('BookReserve', bookReserveSchema);

module.exports = BookReserve;
