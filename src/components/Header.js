import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem('access_token');
        navigate('/login');
    }

    return (
        <Navbar bg="light" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/">Autotrading Admin</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/users">Користувачі</Nav.Link>
                    <Nav.Link as={Link} to="/accounts">Аккаунти</Nav.Link>
                    <Nav.Link as={Link} to="/sources">Джерела</Nav.Link>
                    <Nav.Link as={Link} to="/transactions">Транзакції</Nav.Link>
                    <Nav.Link as={Link} to="/cabinets">Кабінети</Nav.Link>
                </Nav>
                <Button variant="outline-secondary" onClick={handleLogout}>Вийти</Button>
            </Container>
        </Navbar>
    );
}