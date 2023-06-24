import { Button, Form } from "react-bootstrap";

function TaskVerification() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>ETH Address</Form.Label>
        <Form.Control type="email" placeholder="0x000000000000000000" />
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
          <Button variant="primary" size='lg'>
            Confirm
          </Button>
        </div>
      </section>
    </Form>
  );
}

export default TaskVerification;
