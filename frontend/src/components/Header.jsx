import React from 'react'
import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap'
import { userLogout } from '../actions/userAction';
import SearchBox from './SearchBox';
import Icon from '../images/icon.ico'

const Header = () => {

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(userLogout())
    }

    return (
        <header>
            <Navbar className='py-3' bg="dark" variant='dark' expand="lg">
                <Container>
                    <LinkContainer to={'/'}>
                        <Navbar.Brand>
                            <img
                                src={Icon}
                                width="30"
                                height="30"
                                className="d-inline-block align-top me-2"
                                alt="React Bootstrap logo"
                            />
                            ShopNow</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to={'/cart'}>
                                <Nav.Link ><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.username}>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to={'/login'}>
                                    <Nav.Link><i className='fas fa-user'></i> Login</Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                        <SearchBox />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header