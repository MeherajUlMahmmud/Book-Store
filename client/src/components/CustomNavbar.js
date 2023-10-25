import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/helper';

function CustomNavbar({ user }) {
	const navigate = useNavigate();

	const handleLogout = (e) => {
		e.preventDefault();
		console.log("Logout");
		logout(navigate);
	};

	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href="/">Bookie</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link href="/books">All Books</Nav.Link>
						{/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">
								Separated link
							</NavDropdown.Item>
						</NavDropdown> */}
					</Nav>
				</Navbar.Collapse>
				<Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
					<Nav className="">
						{
							!user ? (
								<>
									<Nav.Link href="/auth/login">Login</Nav.Link>
									<Nav.Link href="/auth/signup">Sign Up</Nav.Link>
								</>
							) : (
								<NavDropdown title={user?.name} id="basic-nav-dropdown">
									<NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
									<NavDropdown.Item href="/settings">
										Settings
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item onClick={(e) => handleLogout(e)}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							)
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default CustomNavbar;