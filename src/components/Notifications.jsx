import React, {useState} from 'react';
import { Accordion, Button, Card, Row, Modal, Form, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const Notifications = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
   const handleShow2 = () => setShow2(true);
   const [join, setJoin] = useState('');
   const [rec, setRec] = useState('');


  const submit = () => {
     let toUser = props.notifications[1].toUser;
     let id = props.notifications[1]._id;
     axios.delete(`/joinRequest/${id}`)
     .then((data) => {
        props.deleteNotification(data.data)
        handleClose();
        ;
     })
     .catch((error) => {
       console.log(error);
     })

   }

   const submit2 = () => {
    let toUser = props.notifications[0].toUser;
    let id = props.notifications[0]._id;
    axios.delete(`/recRequest/${id}`)
    .then((data) => {
       props.deleteNotification(data.data)
       handleClose2();
       ;
    })
    .catch((error) => {
      console.log(error);
    })

  }
  return (
    <div className="notifications">
      <h2>Your Notifications</h2>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Want to join?</Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Group controlId="join">
            <Form.Control as="select" onChange={(e) => setJoin(e.target.value)}>
              <option>Select answer...</option>
              <option>Yes</option>
              <option>No</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" onClick={(e) => submit(e)}>Send Response!</Button>
        </Form>
      </Modal>
      <Modal show={show2} onHide={handleClose2}>
        <Form>
        <Modal.Header closeButton>
        <Modal.Title>Recommendations</Modal.Title>
        </Modal.Header>
        <Form.Group>
       <Form.Control type="text" placeholder="Enter here..." />
       </Form.Group>


          <Button variant="primary" onClick={(e) => submit2(e)}>Send Recommendation!</Button>

        </Form>
      </Modal>


          <Card style={{width: '50rem'}}>
            <Card.Body>
          <ListGroup>

            {
          props.notifications.map((notObj) => {
            return (
              notObj.recommendation === '' ?
                <ListGroup.Item>{`@${notObj.fromUser} would like you to join them at ${notObj.join}!`}
                 <Button variant='primary' onClick={handleShow}>Respond</Button>
                </ListGroup.Item> :
                <ListGroup.Item>{`@${notObj.fromUser} would like recommendations for ${notObj.recommendation}!`}
                <Button variant='primary' onClick={handleShow2}>Respond</Button>
                </ListGroup.Item>

            )
          })
            }
            </ListGroup>
            </Card.Body>
          </Card>



    </div>

  )
}



export default Notifications;