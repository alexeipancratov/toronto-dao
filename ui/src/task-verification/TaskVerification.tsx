import { Button, Form } from "react-bootstrap";
import { ethers } from "ethers";
import { useMetaMask } from "metamask-react";
import { useState } from "react";
import contractAbi from "../abis/abi.json";

function TaskVerification() {
  const [ethAddress, setEthAddress] = useState("");
  const { ethereum } = useMetaMask();

  const sendTransaction = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS || "", contractAbi, provider);
    const contractWithSigner = contract.connect(signer);

    const tx = await contractWithSigner.createMember(ethAddress);
    console.log(tx);

    alert("Transaction sent!");
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();

    sendTransaction();
  };

  const onAddressChange = (e: any) => {
    setEthAddress(e.target.value);
  }

  return (
    <Form onSubmit={onFormSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>ETH Address</Form.Label>
        <Form.Control type="text" placeholder="0x000000000000000000" value={ethAddress} onChange={onAddressChange} />
      </Form.Group>

      <div className='text-center qr-code'>
        <img src="./qr-code.png" className="img-fluid" alt="..." width="100"></img>
      </div>

      <section className='main-section'>
        <Form.Group>
          <Form.Label>Task</Form.Label>
          <Form.Select>
            <option value="1">Member registration</option>
            <option value="2">Event attendance</option>
          </Form.Select>
        </Form.Group>

        <div className='mt-5 text-center d-grid gap-2'>
          <Button variant="primary" type="submit" size='lg'>
            Confirm
          </Button>
        </div>
      </section>
    </Form>
  );
}

export default TaskVerification;
