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

                    <NavDropdown title="Course" id="course-dropdown">
                        <NavDropdown.Item href="https://www.zybooks.com">Zybooks</NavDropdown.Item>
                        <NavDropdown.Item href="https://tophat.com">TopHat</NavDropdown.Item>
                        <NavDropdown.Item href="https://www.google.com/drive/">Google Drive</NavDropdown.Item>
                        <NavDropdown.Item href="https://www.w3schools.com">W3Schools</NavDropdown.Item>
                    </NavDropdown>

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
                        <LinkContainer to="/browser/window">
                            <NavDropdown.Item>Window</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/browser/screen">
                            <NavDropdown.Item>Screen</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/browser/location">
                            <NavDropdown.Item>Location</NavDropdown.Item>
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
                {/*<Form inline>*/}
                {/*    <FormControl type="text" placeholder="Search" className="mr-sm-2" />*/}
                {/*    <Button variant="outline-success">Search</Button>*/}
                {/*</Form>*/}
                <LinkContainer to="/admin" className="btn btn--outline-light" id="admin">
                    <Nav.Link>Admin</Nav.Link>
                </LinkContainer>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MyNavbar;