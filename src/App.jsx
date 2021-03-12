/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
import React from 'react';
import Feed from './components/Feed.jsx';
import Friends from './components/Friends.jsx';
import Notifications from './components/Notifications.jsx';
import { Accordion, Button, Navbar, Nav, DropdownButton, Container, Row, Col } from 'react-bootstrap';
import './style.css';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view: 'feed', usersInfo: '', signals: [], allUsers: [], restaurants: [], groups: [], loginInfo: {id: '6031b0ac7540166764d399d7', isLoggedIn: true, userName: 'chuck3774'}};
  }

  componentDidMount () {
    axios.get(`http://localhost:3001/signals/${this.state.loginInfo.id}`)
    .then((data) => {
      this.setState({signals: data.data})
    })
    .catch((error) => {
      console.log(error);
    })
    axios.get(`http://localhost:3001/allUsers`)
    .then((data) => {
      this.setState({allUsers: data.data})
    })
    .catch((error) => {
      console.log(error);
    })
    axios.get(`/users/${this.state.loginInfo.id}`)
    .then((data) => {
      this.setState({usersInfo: data.data})
    })
    .catch((error) => {
      console.log(error);
    })
    axios.get(`/groups/${this.state.loginInfo.id}`)
    .then((data) => {
      this.setState({groups: data.data})
    })
    .catch((error) => {
      console.log(error);
    })
    axios.get(`/restaurants`)
    .then((data) => {
      this.setState({restaurants: data.data})
    })
    .catch((error) => {
      console.log(error);
    })
    axios.get(`/notifications/${this.state.loginInfo.id}`)
    .then((data) => {
      this.setState({notifications: data.data})
    })
    .catch((error) => {
      console.log(error);
    })

  }

  updateSignals(sig) {
    let newArray = [sig, ...this.state.signals];
    this.setState({signals: newArray})
  }

  updateFriends(friend) {
    let user = this.state.usersInfo;
    let friends = this.state.usersInfo[0].friends;
    user[0].friends = friend;
    this.setState({usersInfo: user});

  }

  updateGroups(group) {
    this.setState({groups: [...this.state.groups, group]});

  }

  deleteNotification(note) {
    let notes = this.state.notifications;
    let newNotes = [];
    notes.map((noteObj) => {
      if (noteObj._id !== note._id) {
        newNotes.push(noteObj);
      }
    })
    this.setState({notifications: newNotes})
  }

  changeView(e) {
    const newView = e.target.name;
    this.setState({view: newView})
  }

  renderView() {
    const {view} = this.state;

    if (view === 'feed') {
      return <Feed
      signals={this.state.signals}
      restaurants={this.state.restaurants}
      groups={this.state.groups}
      friends={this.state.usersInfo}
      updateSignals={this.updateSignals.bind(this)}/>;
  } else if (view === 'friends') {
    return <Friends
    allUsers={this.state.allUsers}
    friends={this.state.usersInfo}
    groups={this.state.groups}
    loginInfo={this.state.loginInfo}
    updateFriends={this.updateFriends.bind(this)}
    updateGroups={this.updateGroups.bind(this)}
    />
  } else if (view === 'notifications') {
    return <Notifications
    notifications={this.state.notifications}
    deleteNotification={this.deleteNotification.bind(this)}
    />
  }
}



  render() {
    return (
        <Container>
          <Row>
        <Col >
        <img class="d-block m-auto" src="https://chuck3774bucket.s3.us-east-2.amazonaws.com/2.png"/>
         </Col>
          </Row>

          <Row>
            <Col>

          <Nav
          style={{
            backgroundColor: '#E9A637',
            borderRadius: '5px',
            borderColor: '#A11100',
          }}
          className="justify-content-center">
    <Nav.Link
       style={{
         color: '#A11100'
        }}
        name="feed"
        onClick={(e) => this.changeView(e)}>Feed</Nav.Link>
      <Nav.Link
      style={{
        color: '#A11100'
      }}
      name="friends"
      onClick={(e) => this.changeView(e)}>Friends</Nav.Link>
      <Nav.Link
      style={{
        color: '#A11100'
      }}
      name="notifications"
      onClick={(e) => this.changeView(e)}>Notifications</Nav.Link>
       </Nav>

            </Col>
          </Row>
    <Row>

      {this.renderView()}

    </Row>
    </Container>

    );
  }
}

export default App;