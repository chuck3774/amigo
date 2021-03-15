import React, {useState} from 'react';
import { Accordion, Button, Card, Row, Modal, Form, Container, Col } from 'react-bootstrap';
import axios from 'axios';

const Feed = (props) => {
  const [show, setShow] = useState(false);
  const [res, setRes] = useState('blah');
  const [invite, setInvite] = useState('');
  const [rec, setRec] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const submit = (e) => {
    e.preventDefault();
    let user = props.groups[0].userName;
    let groupFriends;
    props.groups.map((groupObj) => {
      if (groupObj.groupName === invite) {
        groupFriends = groupObj.friends;
      }
    });
    let inviteFriends;
     if (invite.includes('riends')) {
       inviteFriends = props.friends[0].friends; } else if (invite.includes('Invites')) {
        inviteFriends = '';
       }
       else {inviteFriends = groupFriends;}
    let recFriends;
    if (rec === 'Yes') {
      recFriends = props.friends[0].friends;}
      else {
        recFriends = '';
      }
    let restaurant;
    props.restaurants.map((resObj) => {
      if (res.includes(`${resObj.name}`)) {
        restaurant = resObj.name;
      }
    })
    const notification = {inviteFriends: inviteFriends, RecFriends: recFriends, user: user, restaurant: restaurant};

    const signal = {user: user, restaurant: restaurant, inviteFriends: inviteFriends, RecFriends: recFriends};

    axios.post('/notifications', notification)
    .then((info) => {
      console.log(info.data);
    })
    .catch ((error) => {
      console.log(error);
    })
    axios.post('/signals', signal)
    .then((data) => {
      if (typeof data.data !== 'string') {
        props.updateSignals(data.data);
        handleClose();
       }else{
         handleClose();
       }
    })
    .catch((err) => {
      console.log(err);
    })
}

return (
    <Col>

      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a Signal</Modal.Title>
          </Modal.Header>
          <Form>
            <Form.Group controlId="restaurant">
              <Form.Label>Restaurant</Form.Label>
              <Form.Control as="select" onChange={(e) => setRes(e.target.value)}>
                <option>Select Restaurant...</option>
               {props.restaurants.map((resObj) => {
                 return (
                    <option>{`${resObj.name}, ${resObj.city}, ${resObj.state}`}</option>
                 )
               })}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="invites">
              <Form.Label>Invite friends</Form.Label>
              <Form.Control as="select" onChange={(e) => setInvite(e.target.value)}>
                <option>Invite friends to join...</option>
                <option>All Friends</option>
               {props.groups.map((groupObj) => {
                 return (
                    <option>{groupObj.groupName}</option>
                 )
               })}
               <option>No Invites</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="join">
              <Form.Label>Recommendations</Form.Label>
              <Form.Control as="select" onChange={(e) => setRec(e.target.value)}>
              <option>Looking for Recommendations...</option>
              <option>Yes</option>
               <option>No</option>
              </Form.Control>
            </Form.Group>

            <img
            className="modalButton"
             onClick={(e) => submit(e)}
           src="https://chuck3774bucket.s3.us-east-2.amazonaws.com/Screen+Shot+2021-02-16+at+1.01.29+PM.png"/>


          </Form>
        </Modal>
      <Row>

    <Button
    style={{
      display: 'block',
      margin: 'auto',
      marginTop: '20px',
      marginBottom: '10px',
      backgroundColor: '#A11100',
      borderWidth: '3px',
      borderColor: '#E9A637'
    }}
    variant='primary' onClick={handleShow}>Create Signal</Button>
      </Row>

<Row>


      {
      props.signals.map((signalObj, i) => {
        return (
        <Card
        style={{
          display: 'block',
          margin: 'auto',
          borderColor: '#A11100',
          width: '30rem'}}>
          <Card.Body>
            <Card.Title style={{
              textAlign: 'center',
              textDecoration: 'underline',
              color: '#A11100'
              }} key={i}>{signalObj.signal}</Card.Title>
            <Row>
              <Accordion>
                <Accordion.Toggle as={Button} varian="link" eventKey="0" style={{
                  marginLeft: "30px",
                  backgroundColor: '#E9A637',
                   borderWidth: '3px',
                   borderColor: '#A11100'
                  }}>
                  Recommendations
                </Accordion.Toggle>

                {signalObj.recommendations[0] ? signalObj.recommendations.map((recObj) => {
                  return <Accordion.Collapse eventKey="0">
                    <Card style={{
                      marginLeft: '40px',
                      width: '150px'
                       }}>
                      <Card.Body style={{color: '#A11100'}}>
                      {recObj}

                      </Card.Body>
                      </Card>
                  </Accordion.Collapse>
                }) : <Accordion.Collapse eventKey="0">
                  <Card style={{
                      marginLeft: '40px',
                      width: '150px'
                       }}>
                      <Card.Body style={{color: '#A11100'}}>
                      Nothing yet!

                      </Card.Body>
                      </Card>
                  </Accordion.Collapse>}
              </Accordion>
              <Accordion>
                <Accordion.Toggle as={Button} varian="link" eventKey="1" style={{
                   backgroundColor: '#E9A637',
                   borderWidth: '3px',
                   borderColor: '#A11100',
                  marginLeft: '50px'
                }}>
                  Friends who'd like to join
                </Accordion.Toggle>

                {signalObj.join[0] ? signalObj.join.map((joinObj) => {
                  return <Accordion.Collapse eventKey="1">
                     <Card style={{
                      marginLeft: '80px',
                      width: '150px'
                       }}>
                      <Card.Body style={{color: '#A11100'}}>
                      {joinObj}

                      </Card.Body>
                      </Card>
                  </Accordion.Collapse>
                }) : <Accordion.Collapse eventKey="1">
                   <Card style={{
                      marginLeft: '80px',
                      width: '150px'
                       }}>
                      <Card.Body style={{color: '#A11100'}}>
                      No one yet!

                      </Card.Body>
                      </Card>
                  </Accordion.Collapse>}
              </Accordion>
           </Row>
          </Card.Body>
        </Card>

        )
      })
      }

</Row>

</Col>




)
}


export default Feed;