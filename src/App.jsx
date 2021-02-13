/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
import React from 'react';
import Feed from './components/Feed.jsx';
import Friends from './components/Friends.jsx';
import Notifications from './components/Notifications.jsx';
import { Accordion, Button, Navbar, Nav, DropdownButton } from 'react-bootstrap';
import './style.css';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view: 'feed', usersInfo: '', signals: [], allUsers: [], restaurants: [], groups: [], loginInfo: {id: '60282871a9ac708cf0dfba31', isLoggedIn: true, userName: 'chuck3774'}};
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

  changeView(e) {
    const newView = e.target.name;
    this.setState({view: newView})
  }

  renderView() {
    const {view} = this.state;

    if (view === 'feed') {
      return <Feed
      signals={this.state.signals} restaurants={this.state.restaurants} groups={this.state.groups}
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
    return <Notifications />
  }
}



  render() {
    return (
      <div className="page">
        <div className="header">
        <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Amigo!</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Nav.Link style={{width: '80px'}}
        name="feed"
        onClick={(e) => this.changeView(e)}>Feed</Nav.Link>
      <Nav.Link style={{width: '100px'}}
        name="friends"
        onClick={(e) => this.changeView(e)}>Friends</Nav.Link>
      <Nav.Link style={{width: '120px'}}
        name="notifications"
        onClick={(e) => this.changeView(e)}>Notifications</Nav.Link>
    <DropdownButton id="dropdown-basic-button" title="☰">
    <Nav.Link style={{width: '80px'}}
        name="feed"
        onClick={(e) => this.changeView(e)}>Feed</Nav.Link>
      <Nav.Link style={{width: '100px'}}
        name="friends"
        onClick={(e) => this.changeView(e)}>Friends</Nav.Link>
      <Nav.Link style={{width: '120px'}}
        name="notifications"
        onClick={(e) => this.changeView(e)}>Notifications</Nav.Link>
</DropdownButton>

    </Nav>
  </Navbar.Collapse>
</Navbar>
          <h1>Amigo!</h1>
        <Accordion>
          <Accordion.Toggle
          style={{width: '120px'}}
          as={Button}
          variant="link"
          eventKey="0">
          ☰
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
          <Button
        style={{width: '120px'}}
        name="feed"
        onClick={(e) => this.changeView(e)}
        >Feed</Button>
          </Accordion.Collapse>
          <Accordion.Collapse eventKey="0">
          <Button
        style={{width: '120px'}}
        name="friends"
        onClick={(e) => this.changeView(e)}>Friends </Button>
        </Accordion.Collapse>
        <Accordion.Collapse eventKey="0">
        <Button
        style={{width: '120px'}}
        name="notifications"
        onClick={(e) => this.changeView(e)}>Notifications</Button>
        </Accordion.Collapse>
        </Accordion>
         </div>
      <div className="main">
      {this.renderView()}
      </div>
     </div>

    );
  }
}

export default App;