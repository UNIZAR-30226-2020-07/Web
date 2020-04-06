import React, {Component} from 'react';
import logo from './Lgo Empresa2.png'
import './App.css';
import './index.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


class App extends Component{
  constructor(props){
    super(props);
    this.state={
      key: '',
      src: 'https://docs.google.com/uc?export=download&id=1MMJ1YWAxcs-7pVszRCZLGn9-SFReXqsD',
      title: 'Título Provisional',
      author: 'Autor Provisional',
      album: 'Album Provisional',
      rating: 'Rating Provisional',
    }
  }

  render(){
  return(
    <div className="h-100">
      <nav className="navbar navbar-expand-md navbar-dark custom-navbar">
        <div className="col-xl-4 navbar-header">
          <img className="img-fluid mx-auto" src={logo} alt="logo" style={{maxHeight: 75}}></img>
          <button className="navbar-toggler button-toggle" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="col-xl-8 collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
          <ul className="nav navbar-nav">
            <button onClick={this.cambiaSource}>
            Clear audio player
            </button>
          </ul>
        </div> 
      </nav>

      <div className="container-fluid h-100 d-inline-block">
        <div class="row">
          <div class="col-3 hidden-md-down" id="yellow">Prueba
          </div>
          <div class="col-9">Prueba
          </div>
        </div>
      </div>

      <footer className="footer fixed-bottom custom-navbar">
        <div className="row">
          <div className="col-sm-3 justify-content-center text-center">
            <div>{this.state.title}</div>
            <div>{this.state.author}</div>
            <div>{this.state.album}</div>
            <div>{this.state.rating}</div>
          </div>
          <div className="col-sm-8">
            <AudioPlayer className="full-height" src={this.state.src}></AudioPlayer>  
          </div>
        </div>
      </footer>
    </div>
  );
}

  cambiaSource = () => {
    alert(this.state.src);
    this.setState({
      src: ''
    });
  }
}

export default App;