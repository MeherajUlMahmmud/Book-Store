const express = require('express');
const router = express.Router();

const reserveController = require('../controllers/bookReserve.controller');
const authorizeLoggedInUser = require('../middlewares/authorizeLoggedInUser');

router.get('/reserves', authorizeLoggedInUser, reserveController.getAllReservedBooks);
router.get('/reserves/:bookId', authorizeLoggedInUser, reserveController.getReserveDetails);
router.post('/reserves/reserve', authorizeLoggedInUser, reserveController.reserveBook);
router.delete('/reserves/cancel/:id', authorizeLoggedInUser, reserveController.cancelReservation);

module.exports = router;
