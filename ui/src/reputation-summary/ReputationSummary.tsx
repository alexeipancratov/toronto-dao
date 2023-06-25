import { useMetaMask } from "metamask-react";
import { useState } from "react";
import { Badge, Button, Col, Form, ProgressBar, Row } from "react-bootstrap";
import "./ReputationSummary.css";

function ReputationSummary() {
  const [ethAddress, setEthAddress] = useState("");
  const { ethereum } = useMetaMask();

  const onAddressChange = (e: any) => {
    setEthAddress(e.target.value);
  }

  const onFormSubmit = (e: any) => {
    return false;
  };

  return (
    <>
      <h1 className='text-left'>Verify Task</h1>
      <Form onSubmit={onFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>ETH Address</Form.Label>
          <Form.Control type="text" placeholder="0x000000000000000000" value={ethAddress} onChange={onAddressChange} />
        </Form.Group>

        <div className='text-center qr-code'>
          <img src="./medium.jpeg" className="img-fluid" alt="medium" width="100"></img>
        </div>

        <div className='mt-2 text-center d-grid gap-2'>
          <Button variant="light" type="submit">
            Retrieve reputation summary
          </Button>
        </div>
      </Form>
      <section className='main-section mt-2'>


        <Row>
          <Col>
            <span className="category-icon">🤖</span>
            <span className="category-name">Technology</span>
          </Col>
          <Col>
            <Badge bg="primary">123</Badge>
          </Col>
        </Row>
        <Row>
          <Col>img</Col>
          <Col>Technology</Col>
          <Col><Badge bg="secondary">123</Badge></Col>
        </Row>
        <Row>
          <Col>img</Col>
          <Col>Technology</Col>
          <Col><Badge bg="secondary">123</Badge></Col>
        </Row>
        <Row>
          <Col>img</Col>
          <Col>Technology</Col>
          <Col><Badge bg="secondary">123</Badge></Col>
        </Row>

        <ProgressBar now={60} label={'Technology'} variant="success" />
        <ProgressBar now={30} label={'Governance'} variant="info" className="mt-2" />
        <ProgressBar now={80} label={'Finance'} variant="warning" className="mt-2" />
        <ProgressBar now={90} label={'General'} variant="danger" className="mt-2" />
      </section>
    </>
  );
}

export default ReputationSummary;