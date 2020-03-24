import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class NavBar extends Component{
  constructor(props){
    super(props);
    this.state={
      username: '',
      password: ''
    }
  }

  render(){
    return(
      <div id="loginContainer">
        <form id="loginForm" onSubmit={this.login}>
          <h1 className="form-title">Login</h1>
          <input type='text' name="username" id="usernameInput" placeholder="username" value={this.state.username} onChange={this.handleChange}></input>
          <input type='password' name="password" id="passwordInput" placeholder="password" value={this.state.password} onChange={this.handleChange}></input>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  login = (e) => {
    e.preventDefault();
    console.log("Funciona");
  }

  handleChange = (e) => {
    let newState = {}
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }
}

export default NavBar;