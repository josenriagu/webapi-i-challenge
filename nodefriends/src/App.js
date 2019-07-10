import React, { Component } from 'react';
import './App.css';

const baseUrl = 'http://localhost:5000/api/users';

export default class App extends Component {
  state = {
    friends: [],
    form: {
      name: "",
      bio: ""
    },
    editMode: false,
    friendToEdit: null
  }

  fetchFriend = () => {
    fetch(baseUrl)
      .then(response => {
        return response.json();
      })
      .then(res => {
        this.setState({ ...this.state, friends: res.users })
      })
      .catch(error => {
        console.table(error);
      })
  }
  postRequest = (endpoint, data , type) => {
    return fetch(`${baseUrl}/${endpoint}`, {
      credentials: 'same-origin', // 'include', default: 'omit'
      method: type, // 'GET', 'POST' 'PUT', 'DELETE', etc.
      body: (type !== 'GET') ? JSON.stringify(data) : null, // Coordinate the body type with 'Content-Type'
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    });
  }

  componentDidMount() {
    this.fetchFriend();
  }

  deleteFriend = (event, id) => {
    event.preventDefault();
    this.postRequest(`${id}`, {}, 'DELETE')
      .then(() => this.fetchFriend());
  }

  render() {
    return (
      <div className="app">
        <form>
          <input type="text" name="name" placeholder="enter name" />
          <input type="text" name="name" placeholder="enter bio" />
          <input type="submit" />
        </form>
        <div className="friends-list">
          {
            this.state.friends.map(friend =>
              <div key={friend.id} className="friend-wrapper">
                <div>{friend.name}</div>
                <div>{friend.bio}</div>
                <div>{friend.created_at}</div>
                <div>{friend.updated_at}</div>
                <div>
                  <button>Edit</button>
                  <button onClick={(event) => this.deleteFriend(event, friend.id)}>Delete</button>
                </div>
              </div>)
          }
        </div>
      </div>
    );
  }
}