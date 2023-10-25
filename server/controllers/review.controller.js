const Book = require('../models/book.model');
const Review = require('../models/review.model');
const User = require('../models/user.model');

// Controller for fetching all reviews for a book
exports.getReviewsForBook = async (req, res) => {
	const { bookId } = req.params;
	try {
		const reviews = await Review.find({ book: bookId }).populate('user');
		res.json(reviews);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Controller for creating a new review
exports.createReview = async (req, res) => {
	const { bookId, userId, rating, comment } = req.body;

	if (!bookId || !userId || !rating) {
		return res.status(400).json({ message: 'Book ID, user id, and rating are required' });
	} else if (rating < 1 || rating > 5) {
		return res.status(400).json({ message: 'Rating must be between 1 and 5' });
	} else if (rating % 0.5 !== 0) {
		return res.status(400).json({ message: 'Rating must be like 1 or 1.5 or 2 or 2.5 or 3 or 3.5 or 4 or 4.5 or 5' });
	}

	try {
		const book = await Book.findById(bookId);
		if (!book) {
			return res.status(404).json({ message: 'Book not found' });
		}
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		const existingReview = await Review.find({ book: bookId, user: userId });
		if (existingReview.length > 0) {
			return res.status(400).json({ message: 'You have already reviewed this project' });
		}

		const review = new Review({
			book: bookId,
			user: userId,
			rating,
			comment,
		});
		const newReview = await review.save();

		// Update the book's rating
		book.averageRating = (book.averageRating * book.totalReviews + rating) / (book.totalReviews + 1);
		book.totalReviews = book.totalReviews + 1;
		await book.save();

		res.status(201).json(newReview);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

// Controller for updating an existing review
exports.updateReview = async (req, res) => {
	try {
		const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
		res.json(updatedReview);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

// Controller for deleting a review by ID
exports.deleteReview = async (req, res) => {
	try {
		await Review.findByIdAndRemove(req.params.id);
		res.json({ message: 'Review deleted' });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};
