import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
const Header = () => {
    return (
        <header>
            <Navbar className='py-3' bg="dark" variant='dark' expand="lg">
                <Container>
                    <LinkContainer to={'/'}>
                        <Navbar.Brand>ShopNow</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to={'/cart'}>
                                <Nav.Link ><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={'/login'}>
                                <Nav.Link><i className='fas fa-user'></i> Login</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header