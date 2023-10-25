import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { sendAuthRequest, sendGetRequest } from '../../apis/api';
import CustomNavbar from '../../components/CustomNavbar';
import { loadStorage, saveStorage } from '../../utils/persistLocalStorage';
import { useNavigate } from 'react-router-dom';
import { LOGIN_URL, PROFILE_URL } from '../../utils/urls';

function LoginPage() {
	const token = loadStorage("token");
	const navigate = useNavigate();

	const [inputs, setInputs] = useState({ username: '', password: '' });
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (token) {
			console.log("User already logged in");
			navigate('/');
		}
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		setIsLoading(true);
		setError(null);

		sendAuthRequest(LOGIN_URL, inputs)
			.then((response) => {
				setIsLoading(false);
				console.log(response);
				fetchUser(response.data.token);
			})
			.catch((error) => {
				setIsLoading(false);
				setError(error);
			});
	};

	const fetchUser = (token) => {
		sendGetRequest(PROFILE_URL, token)
			.then((response) => {
				console.log(response);
				saveStorage("token", token);
				saveStorage("user", response.data.user);
				navigate('/');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<CustomNavbar />
			<Container className="d-flex align-items-center justify-content-center" style={{
				minHeight: 'calc(100vh - 60px)'
			}}>
				<div className="w-100" style={{ maxWidth: '400px' }}>
					<h2 className="text-center mb-4">Login</h2>
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3">
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter username"
								value={inputs.username}
								onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								value={inputs.password}
								onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
								required
							/>
						</Form.Group>
						<Button variant="primary" type="submit" block disabled={isLoading}>
							Submit
						</Button>
					</Form>
				</div>
			</Container>
		</>
	);
}

export default LoginPage;
