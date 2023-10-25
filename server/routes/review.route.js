const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/review.controller');

router.get('/reviews/book/:bookId', reviewController.getReviewsForBook);
router.post('/reviews/', reviewController.createReview);
router.put('/reviews/:id', reviewController.updateReview);
router.delete('/reviews/:id', reviewController.deleteReview);

module.exports = router;
