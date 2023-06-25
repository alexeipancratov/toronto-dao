import { useMetaMask } from "metamask-react";
import { useState } from "react";
import { Badge, Button, Col, Form, ProgressBar, Row } from "react-bootstrap";
import "./ReputationSummary.css";
import { AuthType, SismoConnectButton, SismoConnectConfig, SismoConnectResponse } from "@sismo-core/sismo-connect-react";

function ReputationSummary() {
  const [ethAddress, setEthAddress] = useState("");
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const { ethereum } = useMetaMask();

  const onAddressChange = (e: any) => {
    setEthAddress(e.target.value);
  }

  const onFormSubmit = (e: any) => {
    setFormIsSubmitted(true);
    e.preventDefault();
  };

  const config: SismoConnectConfig = {
    // you will need to get an appId from the Factory
    appId: "0xa56b3f764eb6677be415e798ff52ede5",
  };

  return (
    <>
      <h1 className='text-left'>Reputation Summary</h1>
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
        {formIsSubmitted && (
          <>
            <ProgressBar now={60} label={'Technology'} variant="success" />
            <ProgressBar now={30} label={'Governance'} variant="info" className="mt-2" />
            <ProgressBar now={80} label={'Finance'} variant="warning" className="mt-2" />
            <ProgressBar now={90} label={'General'} variant="danger" className="mt-2" />
          </>
        )}

        <div className="mt-2">
          <SismoConnectButton
            config={config}
            auth={{ authType: AuthType.EVM_ACCOUNT }}
            onResponseBytes={async (bytes: string) => {
              //Send the response to your contract to verify it
              //thanks to the @sismo-core/sismo-connect-solidity package
            }}
          />
        </div>
      </section>
    </>
  );
}

export default ReputationSummary;