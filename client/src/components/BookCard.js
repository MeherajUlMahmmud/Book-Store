import React from 'react'
import { Card, CardFooter, Col } from 'react-bootstrap'

function BookCard({ book }) {
	return (
		<Col>
			<Card className="m-1">
				<Card.Body>
					<img
						src="https://picsum.photos/200/300"
						alt="book"
						className='w-100 mb-2 rounded'
						style={{
							height: '200px',
							objectFit: 'cover'
						}}
					/>
					<h5>{book?.title}</h5>
					<h6>by {book?.author?.firstName} {book?.author?.lastName}</h6>
					{
						book?.status === 'Available' ? (
							<span className='text-light p-1 rounded bg-success'>{book?.status}</span>
						) : (
							<span className='text-dark p-1 rounded bg-info'>{book?.status}</span>
						)
					}
				</Card.Body>
				<CardFooter className='d-flex justify-content-center align-items-center flex-wrap p-2'>
					<a
						href={`/book/${book?._id}`}
						className='btn btn-primary m-1' block>View</a>
				</CardFooter>
			</Card>
		</Col>
	)
}

export default BookCard