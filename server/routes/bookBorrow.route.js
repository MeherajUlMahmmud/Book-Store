const express = require('express');
const router = express.Router();

const borrowController = require('../controllers/bookBorrow.controller');
const authorizeLoggedInUser = require('../middlewares/authorizeLoggedInUser');

router.get('/borrows', authorizeLoggedInUser, borrowController.getAllBorrowedBooks);
router.get('/borrows/:bookId', authorizeLoggedInUser, borrowController.getBorrowDetails);
router.get('/borrows/book/:bookId', authorizeLoggedInUser, borrowController.bookBorrowHistory);
router.get('/borrows/user/:userId', authorizeLoggedInUser, borrowController.userBorrowHistory);
router.post('/borrows/borrow', authorizeLoggedInUser, borrowController.borrowBook);
router.put('/borrows/return/:borrowId', authorizeLoggedInUser, borrowController.returnBook);

module.exports = router;
