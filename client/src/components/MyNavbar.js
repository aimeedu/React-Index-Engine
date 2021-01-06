import { Navbar, Nav, NavDropdown} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import './Components.css';

const MyNavbar = (props) => {
    return (
        <Navbar collapseOnSelect="true" variant="dark" expand="lg" className="myStyle">
            <LinkContainer to="/">
                <Navbar.Brand>CS355</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/">
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>

                    <NavDropdown title="Search" id="search-dropdown">
                        <LinkContainer to="/file">
                            <NavDropdown.Item>Search From A File</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/google">
                            <NavDropdown.Item>Google Search</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/custom">
                            <NavDropdown.Item>Custom Search Engine</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>

                    <NavDropdown title="Browser" id="basic-nav-dropdown">
                        <LinkContainer to="/browser/navigator">
                            <NavDropdown.Item>Navigator</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/browser/screen">
                            <NavDropdown.Item>Screen</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/browser/geolocation">
                            <NavDropdown.Item>Geolocation</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>

                    <NavDropdown title="About" id="about-dropdown">
                        <LinkContainer to="/about/developers">
                            <NavDropdown.Item>Developers</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/about/contact">
                            <NavDropdown.Item>Contact Us</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>

                </Nav>

                <LinkContainer to="/admin" className="btn btn--outline-light" id="admin">
                    <Nav.Link>Indexing Launcher</Nav.Link>
                </LinkContainer>
                
                <LinkContainer to="/custom" className="btn btn--outline-light" id="admin">
                    <Nav.Link>Custom Search Engine</Nav.Link>
                </LinkContainer>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MyNavbar;