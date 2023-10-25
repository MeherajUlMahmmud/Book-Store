const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookBorrowSchema = new Schema({
	book: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Book',
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	borrowDate: {
		type: Date,
		required: true,
	},
	dueDate: {
		type: Date,
		required: true,
	},
	returnDate: {
		type: Date,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const BookBorrow = mongoose.model('BookBorrow', bookBorrowSchema);

module.exports = BookBorrow;
