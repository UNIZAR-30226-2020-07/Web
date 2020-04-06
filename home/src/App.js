import React, {Component} from 'react';
import logo from './Lgo Empresa2.png'
import './App.css';
import './index.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


class App extends Component{
  constructor(props){
    super(props);
    alert(window.localStorage.getItem('keyMusicApp'));
    this.state={
      txt: 'preba',
      src: 'https://docs.google.com/uc?export=download&id=1MMJ1YWAxcs-7pVszRCZLGn9-SFReXqsD',
      key: ''
    }
  }

  render(){
  return(
    <div>
    <nav className="navbar navbar-expand-md navbar-dark custom-navbar">
            <div className="col-xl-4 navbar-header">
                <img className="img-fluid mx-auto" src={logo} alt="logo" style={{maxHeight: 75}}></img>
                <button className="navbar-toggler button-toggle" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                  <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            <div className="col-xl-8 collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                <ul className="nav navbar-nav">
                    <li className="navbar-text active custom-active" value={this.state.txt}>
                      <textarea ref="newText" defaultValue={this.state.txt}></textarea>
                    </li>
                    <button onClick={this.login}>
                    Texto
                    </button>
                </ul>
            </div> 
    </nav>
    <AudioPlayer src={this.state.src}></AudioPlayer>
    </div>
  );
}

  login = () => {
    alert(this.state.src);
    this.setState({
      src: ''
    });
  }
}

export default App;