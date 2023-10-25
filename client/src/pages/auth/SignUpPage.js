import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { sendAuthRequest } from '../../apis/api';
import CustomNavbar from '../../components/CustomNavbar';
import { loadStorage } from '../../utils/persistLocalStorage';
import { useNavigate } from 'react-router-dom';
import { SIGNUP_URL } from '../../utils/urls';

function SignupPage() {
	const tokens = loadStorage("tokens");
	const navigate = useNavigate();

	const [inputs, setInputs] = useState({ name: '', email: '', username: '', password: '' });
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (tokens) {
			console.log("User already logged in");
			navigate('/');
		}
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		setIsLoading(true);
		setError(null);

		sendAuthRequest(SIGNUP_URL, inputs)
			.then((response) => {
				setIsLoading(false);
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
				setIsLoading(false);
			});
	};

	return (
		<>
			<CustomNavbar />
			<Container className="d-flex align-items-center justify-content-center" style={{
				minHeight: 'calc(100vh - 60px)'
			}}>
				<div className="w-100" style={{ maxWidth: '400px' }}>
					<h2 className="text-center mb-4">Sign Up</h2>
					<Form onSubmit={handleSubmit}>
						<Form.Group className='mb-3'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter your name"
								value={inputs.name}
								onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
								required
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								value={inputs.email}
								onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
								required
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								placeholder="Choose a username"
								value={inputs.username}
								onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
								required
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Create a password"
								value={inputs.password}
								onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
								required
							/>
						</Form.Group>
						<Button variant="primary" type="submit" block disabled={isLoading}>
							Sign Up
						</Button>
					</Form>
				</div>
			</Container>
		</>
	);
}

export default SignupPage;
