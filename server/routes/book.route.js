const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book.controller');
const authorizeAdminUser = require('../middlewares/authorizeAdminUser');

router.post('/books', authorizeAdminUser, bookController.createBook);
router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);
router.put('/books/:id', authorizeAdminUser, bookController.updateBookById);
router.delete('/books/:id', authorizeAdminUser, bookController.deleteBookById);

module.exports = router;
