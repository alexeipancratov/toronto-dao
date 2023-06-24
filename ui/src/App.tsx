import React from 'react';
import './App.css';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import TaskVerification from './task-verification/TaskVerification';
import { useMetaMask } from "metamask-react";
import { Link, Route, Routes } from 'react-router-dom';
import ReputationSummary from './reputation-summary/ReputationSummary';

function App() {
  const { status, connect } = useMetaMask();

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Toronto DAO</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {
                status === "notConnected"
                && <Nav.Link onClick={connect}>Connect</Nav.Link>
              }
              {
                status === "connected"
                && <Nav.Link>Connected</Nav.Link>
              }
            </Nav>
            <Nav>
              <Link to="taskVerification" className="nav-link">Verify Task</Link>
            </Nav>
            <Nav>
              <Link to="reputationSummary" className="nav-link">Reputation Summary</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid className='header'>
        <Row>
          <Col>
            <Routes>
              <Route path="/" element={<TaskVerification />} />
              <Route path="taskVerification" element={<TaskVerification />} />
              <Route path="reputationSummary" element={<ReputationSummary />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
