const express = require('express');
const router = express.Router();

const authorizeLoggedInUser = require('../middlewares/authorizeLoggedInUser');
const authorizeAdminUser = require('../middlewares/authorizeAdminUser');
const authorController = require('../controllers/author.controller');

// Define routes for authors
router.get('/authors', authorizeLoggedInUser, authorController.getAllAuthors);
router.get('/authors/:id', authorizeLoggedInUser, authorController.getAuthorById);
router.post('/authors', authorizeAdminUser, authorController.createAuthor);
router.put('/authors/:id', authorizeAdminUser, authorController.updateAuthor);
router.delete('/authors/:id', authorizeAdminUser, authorController.deleteAuthor);

module.exports = router;
