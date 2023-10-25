const Author = require('../models/author.model');
const Book = require('../models/book.model');

// Create a new book
exports.createBook = async (req, res) => {
	const { title, authorId, description, cover, ISBN } = req.body;

	if (!title || !authorId) {
		return res.status(400).json({ message: 'Title and author id are required fields.' });
	}

	try {
		const author = Author.findById(authorId);
		if (!author) {
			return res.status(404).json({ message: 'Author not found.' });
		}
		const newBook = new Book({
			title,
			author: authorId,
			description: description,
			cover: cover,
			ISBN: ISBN,
		});

		const savedBook = await newBook.save();
		res.status(201).json(savedBook);
	} catch (error) {
		res.status(400).json({ message: 'Failed to create a new book.' });
	}
};

// Get a list of all books
exports.getAllBooks = async (req, res) => {
	try {
		const books = await Book.find().populate('author');
		res.json(books);
	} catch (error) {
		res.status(500).json({ message: 'Failed to retrieve books.' });
	}
};

// Get a single book by ID
exports.getBookById = async (req, res) => {
	try {
		const book = await Book.findById(req.params.id).populate('author');
		if (!book) {
			return res.status(404).json({ message: 'Book not found.' });
		}
		res.json(book);
	} catch (error) {
		res.status(500).json({ message: 'Failed to retrieve the book.' });
	}
};

// Update a book by ID
exports.updateBookById = async (req, res) => {
	try {
		const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!updatedBook) {
			return res.status(404).json({ message: 'Book not found.' });
		}
		const validationError = updatedBook.validateSync(); // Validate against the schema
		if (validationError) {
			return res.status(400).json({ message: validationError.errors });
		}
		res.json(updatedBook);
	} catch (error) {
		res.status(500).json({ message: 'Failed to update the book.' });
	}
};

// Delete a book by ID
exports.deleteBookById = async (req, res) => {
	try {
		const deletedBook = await Book.findByIdAndRemove(req.params.id);
		if (!deletedBook) {
			return res.status(404).json({ message: 'Book not found.' });
		}
		res.json(deletedBook);
	} catch (error) {
		res.status(500).json({ message: 'Failed to delete the book.' });
	}
};
