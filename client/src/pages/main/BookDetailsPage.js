import React, { useEffect, useState } from 'react'
import { loadStorage } from '../../utils/persistLocalStorage';
import { useNavigate, useParams } from 'react-router-dom';
import CustomNavbar from '../../components/CustomNavbar';
import { Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { sendDeleteRequest, sendGetRequest, sendPostRequest, sendPutRequest } from '../../apis/api';
import { BOOKS_URL, BORROWS_URL, RESERVES_URL, REVIEWS_URL } from '../../utils/urls';
import { calculateTimeAgo, formatDateTime } from '../../utils/helper';

function BookDetailsPage() {
	const bookId = useParams().id;

	const token = loadStorage("token");
	const user = loadStorage("user");
	const navigate = useNavigate();

	const [book, setBook] = useState({});
	const [bookBorrowData, setBookBorrowData] = useState(null);
	const [bookReserveData, setBookReserveData] = useState(null);
	const [reviews, setReviews] = useState([]);

	const [reviewInputs, setReviewInputs] = useState({
		bookId: bookId,
		userId: user?._id,
		rating: 3,
		comment: '',
	});
	const [updateReviewInputs, setUpdateReviewInputs] = useState({
		bookId: bookId,
		user: user?._id,
		rating: 0,
		comment: '',
	});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!token) {
			navigate('/auth/login');
		} else if (bookId === undefined) {
			navigate('/');
		} else {
			fetchBook();
			fetchBookBorrowData();
			fetchBookReserveData();
			fetchAllReviews();
		}
	}, []);

	const fetchBook = () => {
		sendGetRequest(BOOKS_URL + `/${bookId}`, token)
			.then((response) => {
				console.log(response);
				setBook(response.data);
			})
			.catch((error) => {
				console.log(error);
				setIsLoading(false);
			});
	}

	const fetchBookBorrowData = () => {
		sendGetRequest(BORROWS_URL + `/${bookId}`, token)
			.then((response) => {
				console.log(response);
				setBookBorrowData(response.data);
			})
			.catch((error) => {
				console.log(error);
				setIsLoading(false);
			});
	}

	const fetchBookReserveData = () => {
		sendGetRequest(RESERVES_URL + `/${bookId}`, token)
			.then((response) => {
				console.log(response);
				setBookReserveData(response.data);
			})
			.catch((error) => {
				console.log(error);
				setIsLoading(false);
			});
	}

	const fetchAllReviews = () => {
		sendGetRequest(REVIEWS_URL + `/book/${bookId}`, token)
			.then((response) => {
				console.log(response);
				setReviews(response.data);

				// check if user has already reviewed this book, if yes, set the reviewInputs to the user's review
				const userReview = response.data.filter((review) => review.userId === user.id);
				if (userReview.length > 0) {
					setUpdateReviewInputs({
						rating: userReview[0].rating,
						review: userReview[0].review,
					});
				}
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setIsLoading(false);
			});
	}

	const handleBookBorrow = (event) => {
		event.preventDefault();
		setIsLoading(true);

		sendPostRequest(BORROWS_URL + '/borrow', {
			bookId: bookId,
			userId: user?._id,
		}, token)
			.then((response) => {
				setIsLoading(false);
				console.log(response);
				fetchBookBorrowData();
			})
			.catch((error) => {
				console.log(error);
				setIsLoading(false);
				alert(error?.response?.data?.message);
			});
	}

	const handleBookReturn = (event) => {
		event.preventDefault();

		sendPutRequest(BORROWS_URL + `/return/${bookBorrowData?._id}`, {}, token)
			.then((response) => {
				setIsLoading(false);
				console.log(response);
				fetchBookBorrowData();
			})
			.catch((error) => {
				console.log(error);
				setIsLoading(false);
				alert(error?.response?.data?.message);
			});
	}

	const handleBookReserve = (event) => {
		event.preventDefault();

		sendPostRequest(RESERVES_URL + '/reserve', {
			bookId: bookId,
			userId: user?._id,
		}, token)
			.then((response) => {
				setIsLoading(false);
				console.log(response);
				fetchBookReserveData();
			})
			.catch((error) => {
				console.log(error);
				setIsLoading(false);
				alert(error?.response?.data?.message);
			});
	}

	const handleBookCancelReservation = (event) => {
		event.preventDefault();

		sendDeleteRequest(RESERVES_URL + `/cancel/${bookReserveData?._id}`, token)
			.then((response) => {
				setIsLoading(false);
				console.log(response);
				fetchBookReserveData();
			})
			.catch((error) => {
				console.log(error);
				setIsLoading(false);
				alert(error?.response?.data?.message);
			});
	}

	const handleReviewSubmit = (event) => {
		event.preventDefault();
		setIsLoading(true);

		sendPostRequest(REVIEWS_URL, reviewInputs)
			.then((response) => {
				setIsLoading(false);
				console.log(response);
				setReviewInputs({
					rating: 3,
					review: '',
				});
				fetchAllReviews();
			})
			.catch((error) => {
				console.log(error);
				setIsLoading(false);
				setReviewInputs({
					rating: 3,
					review: '',
				});
				alert(error?.response?.data?.message);
			});
	}

	return (
		<>
			<CustomNavbar user={user} />
			<Container className="d-flex flex-column align-items-center" style={{
				minHeight: 'calc(100vh - 60px)'
			}}>
				{
					isLoading ?
						<Spinner animation="border" role="status" className='mt-5' />
						: (
							<>
								<Row xs={1} md={2} lg={2} xl={2} className="w-100">
									<Col>
										<img
											src="https://picsum.photos/200/300"
											alt="book"
											className='w-100 mb-2 rounded'
											style={{
												height: '600px',
												objectFit: 'cover'
											}}
										/>
									</Col>
									<Col className='d-flex flex-column justify-content-start '>
										<h2 className='mt-2 mb-3'>
											{book?.title}
										</h2>
										<h4 className='mt-1 mb-3'>
											Author: {book?.author?.firstName} {book?.author?.lastName}
										</h4>
										<p>{book?.description}</p>
										<h5 className='mt-1 mb-3'>
											Book Rating : {
												Array.from(Array(5), (e, i) => {
													if (i < Math.floor(book?.averageRating)) {
														// Full golden star
														return <i className="fas fa-star" key={i}></i>;
													} else if (i === Math.floor(book?.averageRating) && book?.averageRating % 1 !== 0) {
														// Half golden star
														return <i className="fas fa-star-half-alt" key={i}></i>;
													} else {
														// White star
														return <i className="far fa-star" key={i}></i>;
													}
												})
											}
										</h5>
										<h5>
											Book Status: {
												book?.status === 'Available' ? (
													<span className='text-light p-1 rounded bg-success'>{book?.status}</span>
												) : (
													<span className='text-dark p-1 rounded bg-info'>{book?.status}</span>
												)
											}
										</h5>
										<Row xs={1} md={2} lg={2} xl={2} className="w-100 mt-3 mb-3">
											{
												bookBorrowData && (
													<Col className='d-flex flex-column justify-content-start '>
														<Card className="">
															<Card.Body>
																<h5>
																	Book Borrow Details
																</h5>
																<h6 className=''>
																	Borrowed by: {bookBorrowData?.user?.name}
																</h6>
																<h6 className=''>
																	Borrowed on: {formatDateTime(bookBorrowData?.createdAt)} ({calculateTimeAgo(bookBorrowData?.createdAt)})
																</h6>
																<h6 className=''>
																	Due on: {formatDateTime(bookBorrowData?.dueDate)}
																</h6>

															</Card.Body>
														</Card>
													</Col>
												)
											}
											{
												bookReserveData && (
													<Col className='d-flex flex-column justify-content-start '>
														<Card className="">
															<Card.Body>
																<h5>
																	Book Reserve Details
																</h5>
																<h6 className=''>
																	Reserved by: {bookReserveData?.user?.name}
																</h6>
																<h6 className=''>
																	Reserved on: {formatDateTime(bookReserveData?.createdAt)} ({calculateTimeAgo(bookReserveData?.createdAt)})
																</h6>

															</Card.Body>
														</Card>
													</Col>
												)
											}
										</Row>

										<div className='d-flex justify-content-center align-items-center flex-wrap p-2'>
											{
												!bookBorrowData && (
													<button
														className='btn btn-primary m-1'
														onClick={(e) => handleBookBorrow(e)}
													>Borrow Book</button>
												)
											}
											{
												bookBorrowData && bookBorrowData?.user?._id === user?._id && (
													<button
														className='btn btn-danger m-1'
														onClick={(e) => handleBookReturn(e)}
													>Return Book</button>
												)
											}
											{
												bookBorrowData && bookBorrowData?.user?._id !== user?._id && (
													!bookReserveData && (
														<button
															className='btn btn-info m-1'
															onClick={(e) => handleBookReserve(e)}
														>Reserve Book</button>
													)
												)
											}
											{
												bookReserveData && bookReserveData?.user?._id === user?._id && (
													<button
														className='btn btn-danger m-1'
														onClick={(e) => handleBookCancelReservation(e)}
													>Cancel Reservation</button>
												)
											}
										</div>
									</Col>
								</Row>
								<hr className='w-100' />
								{/* rating and reviews */}
								<Row xs={1} md={1} lg={1} xl={1} className="w-100">
									<Col className='d-flex flex-column justify-content-start '>
										<h3 className='mt-2 mb-3'>
											Write a review
										</h3>
									</Col>
									<Col className='mb-2 w-50'>
										<Form onSubmit={handleReviewSubmit}>
											<Form.Group className="mb-1">
												<Form.Label>Rating</Form.Label>
												<Form.Control
													type="number"
													placeholder="Rating (0 - 5)"
													min={0}
													max={5}
													step={0.5}
													value={reviewInputs.rating}
													onChange={(e) => setReviewInputs({ ...reviewInputs, rating: e.target.value })}
													required
												/>
											</Form.Group>
											<Form.Group className="mb-3">
												<Form.Label>Write a review</Form.Label>
												{/* textarea */}
												<Form.Control
													as="textarea"
													rows={3}
													placeholder="Write a review"
													value={reviewInputs.review}
													onChange={(e) => setReviewInputs({ ...reviewInputs, review: e.target.value })}
													required
												/>
											</Form.Group>
											<Button variant="primary" type="submit" block disabled={isLoading}>
												Submit
											</Button>
										</Form>
									</Col>
									<hr className='w-100' />
									<Col className='d-flex flex-column justify-content-start '>
										<h3 className='mt-2 mb-3'>
											Reviews
										</h3>
									</Col>
									<Col>
										{
											reviews.map((review) => (
												<div className='d-flex flex-column justify-content-start align-items-start p-2 mb-2 border rounded'>
													<p className='mb-0'>{review?.user?.name} says,</p>
													<h6>{review?.comment}</h6>
													<h6 className=''>
														{review?.rating} / 5
													</h6>
													<span style={{
														fontSize: '0.8rem',
													}}>
														{
															Array.from(Array(5), (e, i) => {
																if (i < Math.floor(review?.rating)) {
																	// Full golden star
																	return <i className="fas fa-star" key={i}></i>;
																} else if (i === Math.floor(review?.rating) && review?.rating % 1 !== 0) {
																	// Half golden star
																	return <i className="fas fa-star-half-alt" key={i}></i>;
																} else {
																	// White star
																	return <i className="far fa-star" key={i}></i>;
																}
															})
														}
													</span>
													<small className='text-muted'>
														Reviewed {calculateTimeAgo(review?.createdAt)}
													</small>
												</div>
											))
										}
									</Col>
								</Row>
							</>
						)
				}
			</Container>
		</>
	)
}

export default BookDetailsPage