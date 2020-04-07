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
    <div className="box">
      <nav className="navbar navbar-expand-md navbar-dark custom-navbar">
        <div className="col-xl-4 navbar-header">
          <img className="img-fluid mx-auto" src={logo} alt="logo" style={{maxHeight: 75}}></img>
          <button className="navbar-toggler button-toggle" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="col-xl-8 collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
          <ul className="nav navbar-nav">
            <form className="form-inline">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
              <p className="readable-text">Dropdown por poner</p>
              <button className="form_button" type="submit">Search</button>
            </form>

            <button onClick={this.cambiaSource}>
            Clear audio player
            </button>
          </ul>
        </div> 
      </nav>
      
      <div className="container-fluid content">
        <div class="row content full-height">
          <div class="col-sm-3 menu-appearance border border-dark border-right content"  style={{paddingTop:10}}>
            <ul style={{listStyleType:'none',padding: 0}}>
              <li className="distance readable-text">Playlists</li>
              <li className="distance readable-text">Podcasts</li>
              <li className="hr"></li>
              <li className="distance readable-text">Friends</li>
              <li className="hr"></li>
              <li className="distance readable-text">My account</li>
              <li className="distance readable-text">Log out</li>
            </ul>
          </div>
          <div class="col-sm-9 full-height">Contenido
          </div>
        </div>
      </div>
      
      <footer className="footer fixed-bottom custom-navbar">
          <div className="row">
            <div className="col-sm-1 readable-text">Aquí imagen</div>
            <div className="col-sm-3 justify-content-center text-center">
              <div className="readable-text">{this.state.title}</div>
              <div className="readable-text">{this.state.author}</div>
              <div className="readable-text">{this.state.album}</div>
              <div className="readable-text">{this.state.rating}</div>
            </div>
            <div className="col-sm-8">
              <AudioPlayer className="full-height" src={this.state.src}></AudioPlayer>  
            </div>
          </div>
          <div className="darker-bar" style={{height:25}}></div>
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