import { Button, Form } from "react-bootstrap";
import { ethers } from "ethers";
import { useMetaMask } from "metamask-react";
import { useState } from "react";
import contractAbi from "../abis/abi.json";

function TaskVerification() {
  const [ethAddress, setEthAddress] = useState("");
  const [task, setTask] = useState("1");
  const { ethereum } = useMetaMask();

  const sendTransaction = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS || "", contractAbi, provider);
    const contractWithSigner = contract.connect(signer);

    if (task === "1") {
      const tx = await contractWithSigner.createMember(ethAddress);
      console.log(tx);
    } else {
      const tx = await contractWithSigner.redeemTask(parseInt(task), ethAddress);
      console.log(tx);
    }

    alert("Transaction sent!");
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();

    sendTransaction();
  };

  const onAddressChange = (e: any) => {
    setEthAddress(e.target.value);
  }

  const onTaskChange = (e: any) => {
    setTask(e.target.value);
  }

  return (
    <>
      <h1 className='text-left'>Verify Task</h1>
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
            <Form.Select value={task} onChange={onTaskChange}>
              <option value="1">Member registration</option>
              <option value="2">ETH Waterloo 2023</option>
              <option value="3">Collision 2023</option>
              <option value="4">Blockchain Futurist Conference</option>
            </Form.Select>
          </Form.Group>

          <div className="mt-4">
            {task === "1" && (
              <>
                <p>Event: Pragma Waterloo</p>
                <p>When: June 22, 2023</p>
                <p>Location: CIGI Campus (Waterloo)</p>
              </>
            )}
            {task === "2" && (
              <>
                <p>Event: ETH Waterloo</p>
                <p>When: June 23, 2023</p>
                <p>Location: CIGI Campus (Waterloo)</p>
              </>
            )}
          </div>

          <div className='mt-5 text-center d-grid gap-2'>
            <Button variant="primary" type="submit" size='lg'>
              Confirm
            </Button>
          </div>
        </section>
      </Form>
    </>
  );
}

export default TaskVerification;
