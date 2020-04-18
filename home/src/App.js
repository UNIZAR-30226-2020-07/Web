import React, {Component} from 'react';
import logo from './Lgo Empresa2.png'
import './App.css';
import './index.css';
import AudioPlayer from 'react-h5-audio-player';
import classnames from 'classnames';
import Rating from 'react-rating';
import 'react-h5-audio-player/lib/styles.css';
import 'font-awesome/css/font-awesome.min.css';
import Dropdown from './dropdownMenu/dropdown';
import Content from './content/content';


class App extends Component{
  constructor(props){
    super(props);
    this.state={
      key: window.localStorage.keyMusicApp,
      tipoContent: '', //Se asigna el tipo de lista ("search", "playlists", "playlistContent", "podcasts", "podcastContent", "friends", "settings")
      listaContent:['1'],
      modifyContent: '', //Dejar vacío para que no muestre nada

      activeSearch : ' Look for... ',
      busqueda : '',
      busquedaCurrentPage: 'https://ps-20-server-django-app.herokuapp.com/api/v1/songs/',
      busquedaPreviousPage: '',
      busquedaNextPage: '',
      busquedaCount: '',
      busquedaList: '',
      busquedaActive: '',
      busquedaSearch: '',

      active: [1,'','',''],
      current_active: 0,
      src: '',
      title: '',
      author: '',
      album: '',
      rating: '',
      userAux: '',
      passAux:'',

      username:'',
      userPlaylist:'',

      debug:'1',
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
                <Dropdown title={this.state.activeSearch} prueba={this.state.busqueda} cambiaTipo={this.cambiaSearch}/>
                <button className="form_button" onClick={this.searchSong}>Search</button>
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
            <div className="col-sm-10 full-height scrollable">
              <Content tipo={this.state.tipoContent} lista={this.state.busquedaList} cantidad={this.state.busquedaCount} busqueda={this.state.busquedaSearch} hayPrev={this.state.busquedaPreviousPage} hayNext={this.state.busquedaNextPage} change={this.state.modifyContent} cambiaCancion={this.cambiaSource} prevPage={() => this.cambiaPage(0)} nextPage={() => this.cambiaPage(1)}/>
            </div>
          </div>
        </div>
        
        <footer className="footer custom-navbar">
            <div className="row">
              <div className="col-sm-1 readable-text d-none d-sm-block">Aquí imagen</div>
              <div className="col-sm-3 justify-content-center text-center">
                <div className="readable-text">{this.state.title}</div>
                <div className="readable-text">{this.state.author}</div>
                <div className="readable-text">{this.state.album}</div>
                <div className="readable-text"><Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" initialRating={this.state.rating} onChange={(rate) => this.userRating(rate)}/></div>
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
  cambiaSearch = (tipoSearch) => {
    this.setState({
      activeSearch: tipoSearch
    });
  }

  getSearch = (string) =>{
    this.setState({
      busqueda: string.target.value
    });
  }

  searchSong = () =>{
    var urlLocal='https://ps-20-server-django-app.herokuapp.com/api/v1/songs/';
    var searchStatement='?search='+this.state.busqueda;
    switch(this.state.activeSearch){
      case 0: //Buscamos canciones por X título
        searchStatement = searchStatement+'&episode=false';
        break;
      case 1: //Buscamos canciones de X artista
        searchStatement = searchStatement+'&search_for=artist&episode=false';
        break;
      case 2: //Buscamos canciones de X categoría
        searchStatement = searchStatement+'&search_for=genre&episode=false';
        break;
      case 3: //Buscamos canciones de X álbum
        searchStatement = searchStatement+'&search_for=album&episode=false';
        break;
      case 4: //Buscamos podcasts de X título
        //Tocará cambiar también la urlLocal
        searchStatement = searchStatement+'&episode=true';
        break;
      case 5: //Buscamos usuarios con X username
        //Completar
        break;
      default:
        return 0;
    }

    urlLocal=urlLocal+searchStatement;

    fetch(urlLocal,{
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Token '+this.state.key },
      method: 'GET',
    })
    .then(res => res.json())
    .then(response => {
      if(response.results){
        this.setState({
          busquedaCurrentPage: 'https://ps-20-server-django-app.herokuapp.com/api/v1/songs/',
          busquedaPreviousPage: response.previous,
          busquedaNextPage: response.next,
          busquedaCount: response.count,
          busquedaList: response.results,
          busquedaActive: this.state.activeSearch,
          busquedaSearch: this.state.busqueda,
          tipoContent: "search",
          modifyContent: '0',
        });
      }else{
        alert("Error "+response.detail);
      }
    })
  }

  cambiaPage = (page) =>{
    if(page === 0){//Previous page

      var urlLocal=this.state.busquedaPreviousPage;

      fetch(urlLocal,{
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Token '+this.state.key },
        method: 'GET',
      })
      .then(res => res.json())
      .then(response => {
        if(response.results){
          this.setState({
            busquedaCurrentPage: 'https://ps-20-server-django-app.herokuapp.com/api/v1/songs/',
            busquedaPreviousPage: response.previous,
            busquedaNextPage: response.next,
            busquedaCount: response.count,
            busquedaList: response.results,
            busquedaActive: this.state.activeSearch,
            busquedaSearch: this.state.busqueda,
            tipoContent: "search",
            modifyContent: '0',
          });
        }else{
          alert("Error "+response.detail);
        }
      })

    }else{//Next page

      urlLocal=this.state.busquedaNextPage;

      fetch(urlLocal,{
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Token '+this.state.key },
        method: 'GET',
      })
      .then(res => res.json())
      .then(response => {
        if(response.results){
          this.setState({
            busquedaPreviousPage: response.previous,
            busquedaNextPage: response.next,
            busquedaCount: response.count,
            busquedaList: response.results,
            busquedaActive: this.state.activeSearch,
            busquedaSearch: this.state.busqueda,
            tipoContent: "search",
            modifyContent: '0',
          });
        }else{
          alert("Error "+response.detail);
        }
      })

    }
  }

  userRating = (rate) =>{
    alert(rate);
    //Por implementar
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
          userPlaylist:response.playlists,
        })
      }else{
        //alert("Error "+response.detail);
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
    var tipos = ["playlists","podcasts","friends","settings"]
    var tipoEspecifico = tipos[posicion];
    var actives = [this.state.active];
    actives = ['','','',''];
    actives[posicion]='1';
    this.setState({ 
      tipoContent:tipoEspecifico,
      active:actives,
      current_active:posicion,
      modifyContent: '0',
    });
  }

  cambiaSource = (newSrc) => {
    this.setState({
      src: newSrc.stream_url,
      title: newSrc.title,
      author: newSrc.album.artist.name,
      album: newSrc.album.name,
      rating: newSrc.avg_valoration,
    });
  }

}

export default App;