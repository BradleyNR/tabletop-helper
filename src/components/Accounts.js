import React, { Component } from 'react';

import User from '../models/user';

class Accounts extends Component{
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: '',
      errorMessage: null
    }
  }

  // on username field change, update state
  handleUsername = (e) => {
    let username = e.target.value;
    this.setState({username: username});
    console.log(this.state.username);
  }

  // on password field change, update state
  handlePassword = (e) => {
    let password = e.target.value;
    this.setState({password: password});
    console.log(this.state.password);
  }

  // handle form submit
  handleSubmit = (e) => {
    e.preventDefault();

    // If username and password aren't blank, create a user, else throw error
    if (this.state.username != '' && this.state.password != '') {
      User.signup({username: this.state.username, password: this.state.password});
      this.setState({username: '', password: ''});
    } else {
      this.setState({errorMessage: 'You must have both a username and password to log in!'})
    }
  }

  render(){
    return(
      <div>
        <h1>Create Account:</h1>
        {this.state.errorMessage ? <h2>{this.state.errorMessage}</h2> : null}
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <label htmlFor="username">Username:</label>
            <input onChange={this.handleUsername} type="text" className="eight columns offset-by-two" id="username" placeholder="Username" value={this.state.username}/>
          </div>
          <div className="row">
            <label htmlFor="password">Password:</label>
            <input onChange={this.handlePassword} type="password" className="eight columns offset-by-two" id="password" placeholder="Password" value={this.state.password}/>
          </div>
          <button type="submit" className="">Submit</button>
        </form>
      </div>
    )
  }
};

export default Accounts;
