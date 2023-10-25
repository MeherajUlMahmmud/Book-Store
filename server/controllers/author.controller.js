const Author = require("../models/author.model");

// Controller for fetching all authors
exports.getAllAuthors = async (req, res) => {
	try {
		const authors = await Author.find();
		res.json(authors);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Controller for fetching a single author by ID
exports.getAuthorById = async (req, res) => {
	try {
		const author = await Author.findById(req.params.id);
		if (!author) {
			return res.status(404).json({ message: 'Author not found' });
		}
		res.json(author);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Controller for creating a new author
exports.createAuthor = async (req, res) => {
	const { firstName, lastName, dateOfBirth, nationality, biography } = req.body;

	if (!firstName || !lastName) {
		return res.status(400).json({ message: 'First name and last name are required fields' });
	}

	try {
		const author = new Author({
			firstName,
			lastName,
			dateOfBirth,
			nationality,
			biography,
		});

		const newAuthor = await author.save();
		res.status(201).json(newAuthor);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

// Controller for updating an existing author
exports.updateAuthor = async (req, res) => {
	try {
		const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
		res.json(updatedAuthor);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

// Controller for deleting an author by ID
exports.deleteAuthor = async (req, res) => {
	try {
		await Author.findByIdAndRemove(req.params.id);
		res.json({ message: 'Author deleted' });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};
