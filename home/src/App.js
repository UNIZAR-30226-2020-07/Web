import React, {Component} from 'react';
import logo from './Lgo Empresa2.png'
import './App.css';
import './index.css';

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
    <nav className="navbar navbar-expand-md navbar-dark custom-navbar">
            <div className="col-xl-4 navbar-header">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <img className="img-fluid mx-auto" src={logo} alt="logo"></img>
            </div>
            <div className="col-xl-8 collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                <ul className="nav navbar-nav">
                    <li className="navbar-text active custom-active">
                    <a className="nav-link">Home</a>
                    </li>
                    <li className="navbar-text">
                    <a className="nav-link">Help</a>
                    </li>
                    <li className="navbar-text">
                    <a className="nav-link">Download</a>
                    </li>
                    <li className="divider"></li>
                    <li className="hr" />
                    <li className="navbar-text">
                    <a className="nav-link">Login</a>
                    </li>
                    <li className="navbar-text">
                      <a className="nav-link">Register</a>
                    </li>
                </ul>
            </div> 
    </nav>
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