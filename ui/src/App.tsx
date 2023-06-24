import React from 'react';
import './App.css';
import { Col, Container, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap';
import TaskVerification from './task-verification/TaskVerification';

function App() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Toronto DAO</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid className='header'>
        <Row>
          <Col>
            <TaskVerification />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
