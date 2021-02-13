import React, {useState} from 'react';
import { Accordion, Button, Card, Row, Modal, Form } from 'react-bootstrap';
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
  <div className="feed">
    <h2>Your Signals</h2>
    <Button variant='primary' onClick={handleShow}>Create Signal</Button>
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
          <Button variant="primary" onClick={(e) => submit(e)}>Amigos Unite!</Button>
        </Form>
      </Modal>
    <div>{
      props.signals.map((signalObj, i) => {
        return (
        <Card style={{width: '30rem'}}>
          <Card.Body>
            <Card.Title key={i}>{signalObj.signal}</Card.Title>
            <Row>
              <Accordion>
                <Accordion.Toggle as={Button} varian="link" eventKey="0">
                  Recommendations
                </Accordion.Toggle>

                {signalObj.recommendations[0] ? signalObj.recommendations.map((recObj) => {
                  return <Accordion.Collapse eventKey="0">
                    <div>{recObj}</div>
                  </Accordion.Collapse>
                }) : <Accordion.Collapse eventKey="0">
                  <div>Nothing yet!</div>
                  </Accordion.Collapse>}
              </Accordion>
              <Accordion>
                <Accordion.Toggle as={Button} varian="link" eventKey="1">
                  Friends who'd like to join
                </Accordion.Toggle>

                {signalObj.join[0] ? signalObj.join.map((joinObj) => {
                  return <Accordion.Collapse eventKey="1">
                    <div>{joinObj}</div>
                  </Accordion.Collapse>
                }) : <Accordion.Collapse eventKey="1">
                  <div>No one yet!</div>
                  </Accordion.Collapse>}
              </Accordion>
           </Row>
          </Card.Body>
        </Card>

        )
      })
      }</div>

  </div>
)
}


export default Feed;