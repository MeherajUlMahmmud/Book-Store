const Book = require('../models/book.model');
const BookBorrow = require('../models/bookBorrow.model');

// Get all borrowed books
exports.getAllBorrowedBooks = async (req, res) => {
	try {
		const borrowedBooks = await BookBorrow.find().populate('book');
		res.json(borrowedBooks);
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};

// Get borrow details by book ID where returned date is null
exports.getBorrowDetails = async (req, res) => {
	try {
		const { bookId } = req.params;

		const borrow = await BookBorrow.findOne({
			book: bookId,
			returnedDate: null,
		}).populate('user');
		res.json(borrow);
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
}

// Book borrow history for a book
exports.bookBorrowHistory = async (req, res) => {
	try {
		const { bookId } = req.params;

		const book = await Book.findById(bookId);
		if (!book) {
			return res.status(404).json({ message: 'Book not found' });
		}

		const borrowHistory = await BookBorrow.find({ book: bookId }).populate('user');
		res.json(borrowHistory);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
}

// User borrow history
exports.userBorrowHistory = async (req, res) => {
	try {
		const { userId } = req.params;

		const borrowHistory = await BookBorrow.find({ user: userId }).populate('book');
		res.json(borrowHistory);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}

// Borrow a book
exports.borrowBook = async (req, res) => {
	try {
		const { bookId, userId } = req.body;

		if (!bookId || !userId) {
			return res.status(400).json({ error: 'Book ID and user ID are required' });
		}

		// Check if the book is available for borrowing
		const book = await Book.findById(bookId);
		if (!book || book.status !== 'Available') {
			return res.status(400).json({ error: 'Book not available for borrowing' });
		}

		// Create a borrow record
		const borrow = new BookBorrow({
			book: bookId,
			user: userId,
			borrowDate: Date.now(),
			dueDate: Date.now() + 7 * 24 * 60 * 60 * 1000,
		});
		await borrow.save();

		// Update the book status to 'Borrowed'
		book.status = 'Borrowed';
		await book.save();

		res.json(borrow);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

// Return a borrowed book
exports.returnBook = async (req, res) => {
	try {
		const borrowId = req.params.borrowId;

		// Check if the borrow record exists
		const borrow = await BookBorrow.findById(borrowId);
		if (!borrow) {
			return res.status(400).json({ error: 'Borrow record not found' });
		}

		// Update the book status to 'Available'
		const book = await Book.findById(borrow.book);
		book.status = 'Available';
		await book.save();

		// Delete the borrow record
		await borrow.deleteOne();

		res.json({ message: 'Book returned successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal server error' });
	}
};
