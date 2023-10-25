const Book = require('../models/book.model');
const BookReserve = require('../models/bookReserve.model');

// Get all reserved books
exports.getAllReservedBooks = async (req, res) => {
	try {
		const reservedBooks = await BookReserve.find().populate('book');
		res.json(reservedBooks);
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};

// Get reserve details by book ID
exports.getReserveDetails = async (req, res) => {
	try {
		const { bookId } = req.params;

		const borrow = await BookReserve.findOne({
			book: bookId,
		}).populate('user');
		res.json(borrow);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

// Reserve a book
exports.reserveBook = async (req, res) => {
	try {
		const { bookId, userId } = req.body;

		// Check if the book is available for reservation
		const book = await Book.findById(bookId);
		if (!book) {
			return res.status(400).json({ message: 'Book not found' });
		}

		const existingReserve = await BookReserve.findOne({ book: bookId });
		if (existingReserve) {
			return res.status(400).json({ message: 'Book is already reserved' });
		}

		// Create a reservation record
		const reserve = new BookReserve({
			book: bookId,
			user: userId,
		});
		await reserve.save();

		res.json(reserve);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

// Cancel a book reservation
exports.cancelReservation = async (req, res) => {
	try {
		const reserveId = req.params.id;

		// Check if the reservation record exists
		const reserve = await BookReserve.findById(reserveId);
		if (!reserve) {
			return res.status(400).json({ message: 'Reservation record not found' });
		}

		// Delete the reservation record
		await reserve.deleteOne();

		res.json({ message: 'Reservation canceled successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};
