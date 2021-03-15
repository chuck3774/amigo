import React, {useState} from 'react';
import { Accordion, Button, Card, Row, Modal, Form, ListGroup, Container, Col } from 'react-bootstrap';
import axios from 'axios';

const Friends = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show2, setShow2] = useState(false);
  const [list, setList] = useState('Group members: ');
  const [newFriend, setNewFriend] = useState('');
  const [group, setGroup] = useState([]);
  const [groupName, setGroupName] = useState('');
  const handleClose2 = () => {
    setShow2(false);
    setList('Group members: ');
    setGroup([]);
  }
  const handleShow2 = () => setShow2(true);
  const friendClick = (e) => {
    let friend = e.target.textContent;
    let currGroup = group;
    let match = false
    group.map((obj) => {
       if (obj.trim() === friend.trim()) {
         match = true;
       }
    })
    if(match === true) {
       return;
    } else {
      currGroup.push(friend);
      setGroup(currGroup);
    }
   let newList = list;
   let joinList = `${list} ${friend},`;
   setList(joinList);
  }
  const submit = () => {
    let user = props.groups[0].userName;
    let id = props.loginInfo.id;
    let friend = newFriend;
    let truncFriend;
    props.allUsers.map((user) => {
      let name = user.userName;
    if(newFriend.includes(name)) {
      truncFriend = name;
    }
    })
    let body = {id: id, userName: user, friend: truncFriend};
    axios.post('/newFriend', body)
    .then((friend) => {
      let newFriends = [...friend.data, truncFriend];
      props.updateFriends(newFriends);
      handleClose();
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const submit2 = () => {
    let user = props.groups[0].userName;
    let body = {userName: user, groupName: groupName, friends: group};
    console.log(body);
    axios.post('/newGroup', body)
    .then((data) => {
      props.updateGroups(data.data)
      handleClose2();
    })
    .catch((error) => {
      console.log(error);
    })
  }

let filteredUsers = [];
props.allUsers.map((allUser) => {
  let match = false;
  props.friends[0].friends.map((friend) => {
    if (allUser.userName === friend || allUser.userName === props.groups[0].userName) {
      match = true;
    }
  })
  if (!match) {
    filteredUsers.push(allUser);
  }
})

return (
 <Col>
       <Modal show={show} onHide={handleClose}>
           <Modal.Header closeButton>
             <Modal.Title>Add a friend</Modal.Title>
           </Modal.Header>
           <Form>
             <Form.Group controlId="friends">
               <Form.Label>Users</Form.Label>
               <Form.Control as="select" onChange={(e) => setNewFriend(e.target.value)}>
                 <option>Select User to add...</option>
                {
               filteredUsers.map((friendObj) => {
                  return (
                     <option>{`@${friendObj.userName}, ${friendObj.firstName} ${friendObj.lastName}`}</option>
                  )
                })}
               </Form.Control>
             </Form.Group>

             <Button variant="primary" onClick={(e) => submit(e)}
             style={{
               backgroundColor: '#A11100',
               borderWidth: '3px',
               borderColor: '#E9A637',
               marginLeft: '170px',
               marginBottom: '10px'
             }}
             >Add new friend!</Button>
           </Form>
         </Modal>
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Group</Modal.Title>
        </Modal.Header>
        <input placeholder="Group name" onChange={(e) => setGroupName(e.target.value)}></input>
        <ListGroup>
        <ListGroup.Item>{list}</ListGroup.Item>
          {
        props.friends[0].friends.map((friend) => {
          return (
              <ListGroup.Item name={friend} onClick={(e) => friendClick(e)}>{friend}</ListGroup.Item>


          )
        })
          }
          </ListGroup>

          <Button variant="primary" onClick={(e) => submit2(e)}
             style={{
              backgroundColor: '#A11100',
              borderWidth: '3px',
              borderColor: '#E9A637'
            }}
          >Add new group!</Button>
      </Modal>
<Row>


<div class="d-block m-auto" >
    <Button variant='primary' onClick={handleShow}
     style={{
      marginTop: '20px',
      marginBottom: '10px',
      backgroundColor: '#A11100',
      borderWidth: '3px',
      borderColor: '#E9A637'
    }}
    >Add a friend</Button>
    <Button variant='primary' onClick={handleShow2}
     style={{
      marginTop: '20px',
      marginBottom: '10px',
      backgroundColor: '#A11100',
      borderWidth: '3px',
      borderColor: '#E9A637',
      marginLeft: '20px'
    }}
    >Add a group</Button>

</div>



</Row>


<Row>
        <Card style={{
          borderColor: '#A11100',
          display: 'block',
          margin: 'auto',
          width: '22rem'}}>
          <Card.Body>
            <Row>
              <Accordion>
                <Accordion.Toggle as={Button} varian="link" eventKey="0"
                style={{
                  marginLeft: "50px",
                  backgroundColor: '#E9A637',
                   borderWidth: '3px',
                   borderColor: '#A11100'
                  }}
                >
                 Friends
                </Accordion.Toggle>

                {props.friends[0] ? props.friends[0].friends.map((friendObj) => {
                  return <Accordion.Collapse eventKey="0">
                    <Card style={{
                      marginLeft: '40px',
                      width: '160px'
                       }}>
                      <Card.Body style={{color: '#A11100'}}>
                      {friendObj}

                      </Card.Body>
                      </Card>
                  </Accordion.Collapse>
                }) : <Accordion.Collapse eventKey="0">
                   <Card style={{
                      marginLeft: '40px',
                      width: '160px'
                       }}>
                      <Card.Body style={{color: '#A11100'}}>
                      No friends yet!

                      </Card.Body>
                      </Card>
                  </Accordion.Collapse>}
              </Accordion>
              <Accordion>
                <Accordion.Toggle as={Button} varian="link" eventKey="1"
                style={{
                  marginLeft: "60px",
                  backgroundColor: '#E9A637',
                   borderWidth: '3px',
                   borderColor: '#A11100'
                  }}
                >
                  Groups
                </Accordion.Toggle>

                {props.groups[0] ? props.groups.map((groupObj) => {
                  return <Accordion.Collapse eventKey="1">
                   <Card style={{
                      marginLeft: '40px',
                      width: '160px'
                       }}>
                      <Card.Body style={{color: '#A11100'}}>
                      {groupObj.groupName}

                      </Card.Body>
                      </Card>
                  </Accordion.Collapse>
                }) : <Accordion.Collapse eventKey="1">
                  <Card style={{
                      marginLeft: '40px',
                      width: '160px'
                       }}>
                      <Card.Body style={{color: '#A11100'}}>
                      No groups yet!

                      </Card.Body>
                      </Card>
                  </Accordion.Collapse>}
              </Accordion>
           </Row>
          </Card.Body>
        </Card>

</Row>
 </Col>





)
}


export default Friends;