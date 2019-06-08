import React, { Component } from "react";
// import firebase from "./firebase.js";
import firebase, { auth, provider } from "./firebase.js";
// import logo from './logo.svg';
// import './App.css';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: "",
      username: "",
      items: [],
      user: { displayName: "", email: "" } // <-- add this line
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this); // <-- add this line
    this.logout = this.logout.bind(this); // <-- add this line
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref("items");
    // const item = {
    //   title: this.state.currentItem,
    //   user: this.state.username
    // };
    const item = {
      title: this.state.currentItem,
      user: this.state.user.displayName || this.state.user.email
    };
    itemsRef.push(item);
    this.setState({
      currentItem: "",
      username: ""
    });
  }
  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  logout() {
    auth.signOut().then(() => {
      this.setState({
        user: { displayName: null, email: null }
      });
    });
  }

  login() {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      this.setState({
        user
      });
    });
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
    console.log(this.state.user);
    /**
     * fetch('https://api.mydomain.com')
      .then(response => response.json())
      .then(data => this.setState({ data }));

      https://www.robinwieruch.de/react-fetching-data/
     */
    const itemsRef = firebase.database().ref("items");
    itemsRef.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user
        });
      }
      this.setState({
        items: newState
      });
    });
  }
  //
  render() {
    console.log(this.state.user.displayName);
    return (
      <div className="app">
        <div className="container">
          <section className="add-item">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Name?"
                onChange={this.handleChange}
                value={this.state.user.displayName || this.state.user.email}
              />
              <input
                type="text"
                name="currentItem"
                placeholder="Item?"
                onChange={this.handleChange}
                value={this.state.currentItem}
              />
              <button>Add Item</button>
            </form>
            <br />
            {/* <div className="wrapper">  */}
            {this.state.user.displayName ? (
              <button onClick={this.logout}>Log Out</button>
            ) : (
              <button onClick={this.login}>Log In</button>
            )}
            {/* </div> */}
          </section>

          <section className="display-item">
            <div className="wrapper">
              <ul>
                {this.state.items.map(item => {
                  return (
                    <li key={item.id}>
                      <h3>{item.title}</h3>
                      <p>
                        brought by: {item.user}
                        {item.user === this.state.user.displayName ||
                        item.user === this.state.user.email ? (
                          <button onClick={() => this.removeItem(item.id)}>
                            Remove Item
                          </button>
                        ) : null}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default Main;
