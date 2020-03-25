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
                <img class="img-fluid mx-auto" src={logo} alt="logo" style={{maxHeight: 75}}></img>
                <button class="navbar-toggler button-toggle" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                  <span class="navbar-toggler-icon"></span>
                </button>
            </div>
            <div className="col-xl-8 collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                <ul className="nav navbar-nav">
                    <li className="navbar-text active custom-active">
                    Texto
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