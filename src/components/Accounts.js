import React, {Component} from 'react';

import User from '../models/user';

class Accounts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loginUsername: '',
      loginPassword: '',
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

  // on login username field change, update state
  handleLoginUsername = (e) => {
    let loginUsername = e.target.value;
    this.setState({loginUsername: loginUsername});
    console.log(this.state.loginUsername);
  }

  // on login password field change, update state
  handleLoginPassword = (e) => {
    let loginPassword = e.target.value;
    this.setState({loginPassword: loginPassword});
    console.log(this.state.loginPassword);
  }

  // handle form submit
  handleSubmit = (e) => {
    e.preventDefault();

    // If username and password aren't blank, create a user, else throw error
    if (this.state.username !== '' && this.state.password !== '') {
      User.signup({username: this.state.username, password: this.state.password}).then(() => {
        this.setState({username: '', password: ''});
        this.props.history.push('/home');
      });
    } else {
      this.setState({errorMessage: 'You must have both a username and password to create an account!'})
    }
  }

  // handle login form submit
  handleLoginSubmit = (e) => {
    e.preventDefault();
    // If username and password aren't blank, create a user, else throw error
    User.login({username: this.state.loginUsername, password: this.state.loginPassword}).then(() => {
      this.setState({loginUsername: '', loginPassword: ''});
      this.props.history.push('/home');
    });
  }

  render() {
    return (<div className='accounts-main-container'>

      <section className='login-area'>
        <h4>Login:</h4>
        <form onSubmit={this.handleLoginSubmit}>
          <div className="row">
            <input onChange={this.handleLoginUsername} type="text" className="twelve columns" placeholder="Username" value={this.state.loginUsername}/>
          </div>
          <div className="row">
            <input onChange={this.handleLoginPassword} type="password" className="twelve columns" placeholder="Password" value={this.state.loginPassword}/>
          </div>
          <div className='row'>
            <button type="submit" className="six columns offset-by-three submit-button">Submit</button>
          </div>
        </form>

        <h4>Create Account:</h4>
        {
          this.state.errorMessage
            ? <h2>{this.state.errorMessage}</h2>
            : null
        }
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <input onChange={this.handleUsername} type="text" className="twelve columns" placeholder="Username" value={this.state.username}/>
          </div>
          <div className="row">
            <input onChange={this.handlePassword} type="password" className="twelve columns" placeholder="Password" value={this.state.password}/>
          </div>
          <div className='row'>
            <button type="submit" className="six columns offset-by-three submit-button">Submit</button>
          </div>
        </form>
      </section>

    </div>)
  }
};

export default Accounts;
