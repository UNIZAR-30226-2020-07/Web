import React, {Component} from 'react';
import logo from './Lgo Empresa2.png'
import './App.css';
import './index.css';
import AudioPlayer from 'react-h5-audio-player';
import classnames from 'classnames';
import 'react-h5-audio-player/lib/styles.css';
import Dropdown from './dropdownMenu/dropdown';


class App extends Component{
  constructor(props){
    super(props);
    this.state={
      key: window.localStorage.keyMusicApp,
      searchType : [''], //Se usarán más adelante para realizar las peticiones de búsqueda a la api
      activeSearch : ' Look for... ',
      busqueda : '',
      active: [1,'','',''],
      current_active: 0,
      src: 'https://docs.google.com/uc?export=download&id=1MMJ1YWAxcs-7pVszRCZLGn9-SFReXqsD',
      title: 'Título Provisional',
      author: 'Autor Provisional',
      album: 'Album Provisional',
      rating: 'Rating Provisional',
      userAux: '',
      passAux:'',
      username:'',
      debug:'0',
    }
    this.getUser();
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
              <div className="form-inline">
                <input className="form-control" type="search" placeholder="Search" value={this.state.busqueda} onChange={this.getSearch} aria-label="Search"></input>
                <Dropdown title={this.state.activeSearch} cambiaTipo={this.cambiaSearch}/>
                <button className="form_button">Search</button>
              </div>
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
                {this.state.debug === '1'
                  ? <><input className="form-control" type="search" placeholder="User/Email" value={this.state.userAux} onChange={this.getUserAux} aria-label="Search"></input><input className="form-control" type="search" placeholder="Password" value={this.state.passAux} onChange={this.getPassAux} aria-label="Search"></input><button onClick={this.loginTest}>Search</button></>
                  : <p></p>
                }
                <p>{this.state.username}</p>
              </ul>
            </div>
            <div className="col-sm-10 full-height">
              <div><button onClick={()=>this.setState({src: 'https://docs.google.com/uc?id=1qUDPUvQxX8am5OMk99Clfn3dAIjUFD6R'}) }>Primera cancion de prueba</button></div>
              <div><button onClick={()=>this.setState({src: 'https://docs.google.com/uc?id=1PbDXj4OK6adtZSey3EsCRBqWGzEwylKX'}) }>Segunda cancion de prueba</button></div>
              <div><button onClick={()=>this.setState({src: 'https://docs.google.com/uc?id=1DArTjmAm9NgwmsvxZipF1FESovOXsNt0'}) }>Tercera cancion de prueba</button></div>
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
                <AudioPlayer autoPlayAfterSrcChange className="full-height" src={this.state.src}></AudioPlayer>  
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

  getSearch = (string) =>{
    this.setState({
      busqueda: string.target.value
    });
  }

  getUser = () =>{
    fetch('https://ps-20-server-django-app.herokuapp.com/api/v1/rest-auth/user/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token '+this.state.key
      },
      method: 'GET',
    })
    .then(res => res.json())
    .then(response => {
      if(response.id){
        this.setState({
          username:response.username,
        })
      }else{
        alert("Error "+response.detail);
      }
    })
  }

  getUserAux = (string) =>{
    this.setState({
      userAux: string.target.value
    });
  }
  getPassAux = (string) =>{
    this.setState({
      passAux: string.target.value
    });
  }

  loginTest = (email,password) =>{
    fetch('https://ps-20-server-django-app.herokuapp.com/api/v1/rest-auth/login/', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify ({
        "username": '',
        "email":this.state.userAux,
        "password": this.state.passAux
      })     
    })
    .then(res => res.json())
    .then(response => {
      if (response.key) {
        window.localStorage.setItem('keyMusicApp',response.key);
        alert(response.key);
      }else{
        if(response.username){
          alert(response.username);
        }
        if(response.email){
          alert(response.email);
        }
        if(response.password){
          alert(response.password);
        }
      }
    })
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