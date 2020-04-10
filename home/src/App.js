import React, {Component} from 'react';
import logo from './Lgo Empresa2.png'
import './App.css';
import './index.css';
import AudioPlayer from 'react-h5-audio-player';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import 'react-h5-audio-player/lib/styles.css';
import Dropdown from './dropdownMenu/dropdown';


class App extends Component{
  constructor(props){
    super(props);
    this.state={
      key: '',
      searchType : [''], //Se usarán más adelante para realizar las peticiones de búsqueda a la api
      activeSearch : ' Look for... ',
      active: [1,'','',''],
      current_active: 0,
      src: 'https://docs.google.com/uc?export=download&id=1MMJ1YWAxcs-7pVszRCZLGn9-SFReXqsD',
      title: 'Título Provisional',
      author: 'Autor Provisional',
      album: 'Album Provisional',
      rating: 'Rating Provisional',
    }
  }

  render(){
    var playlistClass=classnames("distance","readable-text",{
      'custom-active' : this.state.active[0]
    });
    var podcastClass=classnames("distance","readable-text",{
      'custom-active' : this.state.active[1]
    });
    var friendsClass=classnames("distance","readable-text",{
      'custom-active' : this.state.active[2]
    });
    var settingsClass=classnames("distance","readable-text",{
      'custom-active' : this.state.active[3]
    });
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
                <input className="form-control" type="search" placeholder="Search" aria-label="Search"></input>
                <Dropdown title={this.state.activeSearch} cambiaTipo={this.cambiaSearch}/>
                <button className="form_button" type="submit">Search</button>
              </form>
              <button onClick={this.cambiaSource}>
                Clear audio player
              </button>
            </ul>
          </div> 
        </nav>
        
        <div className="container-fluid content">
          <div className="row content full-height">
            <div className="col-sm-2 menu-appearance"  style={{paddingTop:10}}>
              <ul style={{listStyleType:'none',padding: 0}}>
                <li className={playlistClass} onClick={() => this.cambiaActive(0)}>Playlists</li>
                <li className={podcastClass} onClick={() => this.cambiaActive(1)}>Podcasts</li>
                <li className="hr"></li>
                <li className={friendsClass} onClick={() => this.cambiaActive(2)}>Friends</li>
                <li className="hr"></li>
                <li className={settingsClass} onClick={() => this.cambiaActive(3)}>My account</li>
                <li className="distance readable-text">Log out</li>
              </ul>
            </div>
            <div className="col-sm-10 full-height">{this.state.current_active}{this.state.activeSearch}
            </div>
          </div>
        </div>
        
        <footer className="footer fixed-bottom custom-navbar">
            <div className="row">
              <div className="col-sm-1 readable-text d-none d-sm-block">Aquí imagen</div>
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

  //Tipo codificado con números, 0=Songs, 1=Artists, 2=Categories, 3=Albums, 4=Podcasts, 5=Usernames
  cambiaSearch = (tipo) => {
    this.setState({
      activeSearch: tipo
    });
  }

  cambiaActive = (posicion) => {
    var actives = [this.state.active];
    actives = ['','','',''];
    actives[posicion]='1';
    this.setState({ 
      active:actives,
      current_active:posicion
    });
  }

  cambiaSource = () => {
    this.setState({
      src: ''
    });
  }

}

export default App;