import React, { useEffect, useState } from 'react'
import CustomNavbar from '../../components/CustomNavbar'
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import { loadStorage } from '../../utils/persistLocalStorage';
import { useNavigate } from 'react-router-dom';
import BookCard from '../../components/BookCard';
import { sendGetRequest } from '../../apis/api';
import { BOOKS_URL } from '../../utils/urls';

function HomePage() {
	const token = loadStorage("token");
	const user = loadStorage("user");
	const navigate = useNavigate();

	const [books, setBooks] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!token) {
			navigate('/auth/login');
		} else {
			fetchAllBooks();
		}
	}, []);

	const fetchAllBooks = () => {
		sendGetRequest(BOOKS_URL, token)
			.then((res) => {
				console.log(res.data);
				setBooks(res.data);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err?.message);
				setIsLoading(false);
			});
	}

	return (
		<>
			<CustomNavbar user={user} />
			<Container className="d-flex flex-column align-items-center" style={{
				minHeight: 'calc(100vh - 60px)'
			}}>
				<h1 className='m-2'>
					Bookie
				</h1>
				<h3 className='m-2'>
					Book your favorite books
				</h3>
				<hr className='w-100' />
				<h3 className='m-2'>
					Most popular books
				</h3>
				{
					isLoading ?
						<Spinner animation="border" role="status" className='mt-5' />
						:
						error ?
							<h3>{error}</h3>
							:
							<Row xs={1} md={2} lg={3} xl={4} className="w-100">
								{books.map((book) => (
									<BookCard book={book} key={book?._id} />
								))}
							</Row>
				}
			</Container>
		</>
	)
}

export default HomePage