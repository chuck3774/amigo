import React, {useState} from 'react';
import { Accordion, Button, Card, Row, Modal, Form, ListGroup, Col } from 'react-bootstrap';
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
    <Col>

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

          <Button variant="primary" onClick={(e) => submit(e)}
            style={{
              marginLeft: '145px',
             marginTop: '20px',
             marginBottom: '10px',
             backgroundColor: '#A11100',
             borderWidth: '3px',
             borderColor: '#E9A637'
           }}
          >Send Response!</Button>
        </Form>
      </Modal>
      <Modal show={show2} onHide={handleClose2}>
        <Form>
        <Modal.Header closeButton>
        <Modal.Title>Recommendation</Modal.Title>
        </Modal.Header>
        <Form.Group>
       <Form.Control type="text" placeholder="Enter here..." />
       </Form.Group>


          <Button variant="primary" onClick={(e) => submit2(e)}
             style={{
               marginLeft: '145px',
              marginTop: '20px',
              marginBottom: '10px',
              backgroundColor: '#A11100',
              borderWidth: '3px',
              borderColor: '#E9A637'
            }}
          >Send Recommendation!</Button>

        </Form>
      </Modal>

    <Row>

          <Card style={{
            display: 'block',
            margin: 'auto',
            marginTop: '20px',
            width: '50rem',
            borderColor: '#A11100'
            }}>
            <Card.Body>
          <ListGroup>

            {
          props.notifications.map((notObj) => {
            return (
              notObj.recommendation === '' ?
                <ListGroup.Item style={{
                  borderColor: '#E9A637',
                  color: '#A11100'
                  }}>{`@${notObj.fromUser} would like you to join them at ${notObj.join}!`}
                 <Button variant='primary' onClick={handleShow}
                 style={{
                  float: 'right',
                  backgroundColor: '#E9A637',
                  borderWidth: '3px',
                  borderColor: '#A11100',

               }}
                 >Respond</Button>
                </ListGroup.Item> :
                <ListGroup.Item style={{
                  borderColor: '#E9A637',
                  color: '#A11100'
                  }}>{`@${notObj.fromUser} would like recommendations for ${notObj.recommendation}!`}
                <Button variant='primary' onClick={handleShow2}
                style={{
                  float: 'right',
                  backgroundColor: '#E9A637',
                  borderWidth: '3px',
                  borderColor: '#A11100',

               }}
                >Respond</Button>
                </ListGroup.Item>

            )
          })
            }
            </ListGroup>
            </Card.Body>
          </Card>
    </Row>
    </Col>





  )
}



export default Notifications;