/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
import React from 'react';
import Feed from './components/Feed.jsx';
import Friends from './components/Friends.jsx';
import Notifications from './components/Notifications.jsx';
import { Accordion, Button } from 'react-bootstrap';
import './style.css';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view: 'feed', usersInfo: '', signals: [], restaurants: [], groups: [], loginInfo: {id: '60272ae837e4dc74bfb18fe5', isLoggedIn: true, userName: 'chuck3774'}};
  }

  componentDidMount () {
    axios.get(`http://localhost:3001/signals/${this.state.loginInfo.id}`)
    .then((data) => {
      this.setState({signals: data.data})
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

  changeView(e) {
    const newView = e.target.name;
    this.setState({view: newView})
  }

  renderView() {
    const {view} = this.state;

    if (view === 'feed') {
      return <Feed signals={this.state.signals} restaurants={this.state.restaurants} groups={this.state.groups} friends={this.state.usersInfo}
      updateSignals={this.updateSignals.bind(this)}/>;
  } else if (view === 'friends') {
    return <Friends />
  } else if (view === 'notifications') {
    return <Notifications />
  }
}



  render() {
    return (
      <div className="page">
        <div className="header">
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