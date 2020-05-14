import React, {Component} from 'react';
import logo from './Lgo Empresa2.png'
import './App.css';
import './index.css';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import classnames from 'classnames';
import Rating from 'react-rating';
import './audioPlayer.css';
import 'font-awesome/css/font-awesome.min.css';
import { faStop } from "@fortawesome/free-solid-svg-icons";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import Dropdown from './dropdownMenu/dropdown';
import Content from './content/content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Sleep function from "https://flaviocopes.com/javascript-sleep/"
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class App extends Component{

  // Código de https://codesandbox.io/s/nw6x70xn7l?file=/src/index.js
  onUnload = e => {
    e.preventDefault();
    this.updatePausedSong();
  };

  constructor(props){
    super(props);
    this.state={
      key: window.localStorage.keyMusicApp,
      tipoContent: "playlists", //Se asigna el tipo de lista ("search", "playlists", "playlistContent", "podcasts", "podcastContent", "friends", "settings")

      contentList:'',
      modifyContent: 1, //Dejar vacío para que no muestre nada
      contentName:'',

      activeSearch : ' Look for... ',
      busqueda : '',
      busquedaPreviousPage: '',
      busquedaNextPage: '',
      busquedaCount: '',
      busquedaList: '',
      busquedaActive: '',
      busquedaSearch: '',
      page:1,

      innerBusqueda:'',

      active: [1,'','',''],
      current_active: 0,
      audioType:'',
      src: '',
      title: '',
      author: '',
      album: '',
      rating: '',
      userRated: '',
      playerSemaphore:'',

      friendId:'',
      friendName:'',

      firstLoad:'1',
      pausedSong:'',
      pausedSecond:null,
      username:'',
      userEmail:'',
      userId:'',
      userFriends:[],
      userPlaylist:[],
      userPodcasts:[],
      openPlaylist:[],
      openPlaylistId:'',
      skipControls:false,
      openPlaylistName:'',

      podcastAuthor:'',
      openPodcast:'',

      idActiveSong:'',
      playingPlaylist:'',
      playingPlaylistLoop:'',
      playingPlaylistShuffled:'',
      nuevo_nombre:'',
      playlist_editar:'',

      update:'',
      showAddUser: false,
      showAddPodcast:false,
      debug:'1',

      ui_main:RHAP_UI.MAIN_CONTROLS,
      ui_add:RHAP_UI.ADDITIONAL_CONTROLS,
      ui_vol:RHAP_UI.VOLUME_CONTROLS,
    }
    this.player=React.createRef();
    this.getUser();
    this.fetchPlaylists(-1);
  }

  // Código de https://codesandbox.io/s/nw6x70xn7l?file=/src/index.js
  componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload);
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
          <div className="col-xl-2 navbar-header">
            <img className="img-fluid mx-auto" src={logo} alt="logo" style={{maxHeight: 75}}></img>
            <button className="navbar-toggler button-toggle" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="col-xl-10 collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
            <ul className="nav navbar-nav">
              <div className="form-inline">
                <input className="form-control" type="search" placeholder="Search" value={this.state.busqueda} onChange={this.getSearch} aria-label="Search"></input>
                <Dropdown title={this.state.activeSearch} prueba={this.state.busqueda} cambiaTipo={this.cambiaSearch}/>
                <button className="form_button" onClick={this.searchSong}>Search</button>
              </div>
            </ul>
          </div> 
        </nav>
        
        <div className="container-fluid content">
          <div className="row content full-height">
            <div className="col-md-2 menu-appearance"  style={{paddingTop:10}}>
              <ul style={{listStyleType:'none',padding: 0}}>
                <li className={playlistClass} onClick={() => this.cambiaActive(0)}>Playlists</li>
                <li className={podcastClass} onClick={() => this.cambiaActive(1)}>Podcasts</li>
                <li className="hr"></li>
                <li className={friendsClass} onClick={() => this.cambiaActive(2)}>Friends</li>
                <li className="hr"></li>
                <li className={settingsClass} onClick={() => this.cambiaActive(3)}>My account</li>
                <li className="distance readable-text" onClick={this.logout}> Log out  </li>
                {this.state.debug === '1'
                  ? <><button onClick={this.registerDebug}>Registro automático</button><button onClick={this.loginDebug}>Login automático</button></>
                  : <p></p>
                }
              </ul>
            </div>
            <div className="col-md-10 full-height scrollable">
              <Content token={this.state.key} user={this.state.contentName} tipo={this.state.tipoContent} tipoBusqueda={this.state.busquedaActive} lista={this.state.contentList} cantidad={this.state.busquedaCount} busqueda={this.state.busquedaSearch} cambiaCancion={this.cambiaSource} cambiaCancionPlaylist={this.cambiaSourcePlaylist} cambiaSourcePodcast={this.cambiaSourcePodcast} hayPrev={this.state.busquedaPreviousPage} prevPage={() => this.cambiaPage(0)} hayNext={this.state.busquedaNextPage} nextPage={() => this.cambiaPage(1)} playlists={this.state.userPlaylist} currentPlaylist={this.state.openPlaylistId} editing_playlist={this.state.playlist_editar} loopingPlaylist={this.state.playingPlaylistLoop} shuffledPlaylist={this.state.playingPlaylistShuffled} loopPlaylist={this.setPlaylistLoop} shufflePlaylist={this.shufflePlaylist} createPlaylist={this.createPlaylist} editNamePlaylist={this.setEditingPlaylist} deletePlaylist={this.deletePlaylists} deleteSongs={this.deleteSongs} cambiaOrden={this.sortPlaylist} friend={this.state.friendId} friendName={this.state.friendName} addUser={this.addUser} showAddUser={this.state.showAddUser} innerBusqueda={this.state.innerBusqueda} getInnerSearch={this.getInnerSearch} deleteFriends={this.deleteFriends} podcastAuthor={this.state.podcastAuthor} addPodcast={this.addPodcast} showAddPodcast={this.state.showAddPodcast} deletePodcasts={this.deletePodcasts} cambiaModo={this.cambiaMode} change={this.state.modifyContent} email={this.state.userEmail}/>
            </div>
          </div>
        </div>
        
        <footer className="footer custom-navbar">
            <div className="row">
              <div className="col-md-1 readable-text d-none d-md-block justify-content-center text-center center-icon">
                {this.state.src
                ?
                <>
                {this.state.audioType===true
                ?<><FontAwesomeIcon className="fa-4x" icon={faMicrophone}/></>
                :<><FontAwesomeIcon className="fa-4x" icon={faMusic}/></>
                }
                </>
                :<div></div>
                }
              </div>
              <div className="col-md-3 justify-content-center text-center">
                <div className="readable-text">{this.state.title}</div>
                <div className="readable-text">{this.state.author}</div>
                <div className="readable-text">{this.state.album}</div>
                {this.state.userRated
                  ?<>{this.state.title
                    ?<div className="readable-text"><Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" initialRating={this.state.userRated} onChange={(rate) => this.userRating(rate)}/></div>
                    :<div></div>
                  }</>
                  :<>{this.state.title
                    ?<div className="readable-text"><Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" initialRating={this.state.rating} onChange={(rate) => this.userRating(rate)}/></div>
                    :<div></div>
                  }</>
                }
              </div>
              <div className="col-md-8">
                <AudioPlayer className="full-height AudioPlayer" id="audioplayer" ref={this.player} customControlsSection={[<button className="stop-button" onClick={this.emptySource}><FontAwesomeIcon icon={faStop}/></button>,this.state.ui_add,this.state.ui_main,this.state.ui_vol]} autoPlay src={this.state.src} showSkipControls={this.state.skipControls} listenInterval={30000} onListen={this.updatePausedSong} onCanPlay={this.setLastSong} onPause={this.updatePausedSong} onEnded={this.finishedSong} onClickPrevious={this.previousSong} onClickNext={this.nextSong}></AudioPlayer>
              </div>
            </div>
            <div className="darker-bar" style={{height:25}}></div>
        </footer>
      </div>
    );
  }


  //Funciones para el buscador de contenido

  //Guarda el valor del tipo de búsqueda seleccionado en el dropdown.
  //Tipo codificado con números, 0=Songs, 1=Artists, 2=Categories, 3=Albums, 4=Podcasts, 5=Usernames
  cambiaSearch = (tipoSearch) => {
    this.setState({
      activeSearch: tipoSearch
    });
  }

  //Guarda el valor del campo de entrada de la búsqueda, y lo actualiza en vivo.
  getSearch = (string) =>{
    this.setState({
      busqueda: string.target.value
    });
  }

  //Función principal de búsqueda, detecta el tipo seleccionado y realiza la búsqueda en la dirección correcta.
  searchSong = () =>{
    var urlLocal='https://ps-20-server-django-app.herokuapp.com/api/v1/songs/';
    var searchStatement='?search='+this.state.busqueda;
    switch(this.state.activeSearch){
      case 0: //Buscamos canciones por X título
        searchStatement = searchStatement+'&search_for=title&episode=false';
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
        urlLocal='https://ps-20-server-django-app.herokuapp.com/api/v1/albums/';
        searchStatement = searchStatement+'&podcast=true';
        break;
      case 5: //Buscamos usuarios con X username
        urlLocal='https://ps-20-server-django-app.herokuapp.com/api/v1/users/';
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
          busquedaPreviousPage: response.previous,
          busquedaNextPage: response.next,
          busquedaCount: response.count,
          busquedaList: response.results,
          contentList: response.results,
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

  //Se utiliza para actualizar la información de la búsqueda al valorar una canción/podcast abierta desde el buscador.
  updateSearchSong = () =>{
    var urlLocal='https://ps-20-server-django-app.herokuapp.com/api/v1/songs/';
    var searchStatement='?search='+this.state.busqueda;
    switch(this.state.activeSearch){
      case 0: //Buscamos canciones por X título
        searchStatement = searchStatement+'&search_for=title&episode=false';
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
        urlLocal='https://ps-20-server-django-app.herokuapp.com/api/v1/albums/';
        searchStatement = searchStatement+'&podcast=true';
        break;
      case 5: //Buscamos usuarios con X username
        urlLocal='https://ps-20-server-django-app.herokuapp.com/api/v1/users/';
        break;
      default:
        return 0;
    }
    searchStatement=searchStatement+"&page="+this.state.page;
    urlLocal=urlLocal+searchStatement;
    searchStatement="";

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
          contentList: response.results,
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

  //Esta función permite el paso entre las páginas de los resultados de búsqueda, si es posible.
  cambiaPage = (page) =>{
    if(page === 0){//Previous page
      var urlLocal=this.state.busquedaPreviousPage;
      var newPage=this.state.page-1;
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
            contentList: response.results,
            busquedaActive: this.state.activeSearch,
            busquedaSearch: this.state.busqueda,
            tipoContent: "search",
            modifyContent: '0',
            page:newPage,
          });
        }else{
          alert("Error "+response.detail);
        }
      })
    }else{//Next page
      urlLocal=this.state.busquedaNextPage;
      newPage=this.state.page+1;

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
            contentList: response.results,
            busquedaActive: this.state.activeSearch,
            busquedaSearch: this.state.busqueda,
            tipoContent: "search",
            modifyContent: '0',
            page:newPage,
          });
        }else{
          alert("Error "+response.detail);
        }
      })
    }
  }


  //Funciones para la pantalla de listado de playlists

  //Se ejecuta al crear o modificar una lista, limita la longitud del nombre introducido
  checkLenghtString = (title) =>{
    if(title.length>40){
      alert("The new title is too large");
      return false;
    }else{
      return true;
    }
  }

  //Crea una playlist o modifica el título de una, siempre que el nuevo título cumpla la condición de "checkLenghtString".
  //Option 0 -> create, Option = 1 -> change name
  createPlaylist = (name,option) =>{
    if(this.checkLenghtString(name)){
      switch(option){
        case 0:
          var playlist={
            "name":name,
            "songs":[],
          };
          fetch('https://ps-20-server-django-app.herokuapp.com/api/v1/playlists/', {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Token '+this.state.key },
            method: 'POST',
            body: JSON.stringify (
              playlist
            )     
          })
          .then(res => res.json())
          .then(response => {
            if (response.id) {
              this.fetchPlaylists(-1);
            }else{
              alert("There was an error");
            }
          })
          break;
        case 1:
          var url = 'https://ps-20-server-django-app.herokuapp.com/api/v1/playlists/'
          url = url + this.state.playlist_editar+'/'
          fetch(url, {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Token '+this.state.key },
            method: 'PATCH',
            body: JSON.stringify (
              {"name":name}
            )     
          })
          .then(res => res.json())
          .then(response => {
            if (response.id) {
              this.setState({
                playlist_editar:'',
              })
              this.fetchPlaylists(-1);
            }else{
              alert("There was an error");
            }
          })
          break;
        default:
          break;
      }
    }
  }

  //Elimina las playlist indicadas dentro de la lista enviada (por Id).
  deletePlaylists = (list) =>{
    var url='https://ps-20-server-django-app.herokuapp.com/api/v1/playlists/';
    var i=0;
    var countRefresh = 1;
    while (list[i]!==undefined){
      var Auxurl=url+list[i]+"/";
      fetch(Auxurl, {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Token '+this.state.key },
        method: 'DELETE',
      })// El comentario de abajo elimina un warning innecesario
      // eslint-disable-next-line
      .then(res => { 
        if(list[countRefresh]===undefined){
          this.fetchPlaylists(-1);
        }else{
          countRefresh++;
        }
      })
      i++;
    }
  }

  //Indica la id de la playlist a editar, de forma que cambia su apariencia y permite dicha edición.
  setEditingPlaylist = (p_editar) =>{
    this.setState({
      playlist_editar: p_editar,
    })
  }

  //Obtiene las playlists del usuario indicado y las guarda en el estado.
  fetchPlaylists = (user) =>{
    if(user<0){
      fetch('https://ps-20-server-django-app.herokuapp.com/api/v1/rest-auth/user/', {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Token '+this.state.key },
        method: 'GET',
      })
      .then(res => res.json())
      .then(response => {
        if(response.id){
          this.setState({
            userPlaylist:response.playlists,
            contentList: response.playlists,
            
            tipoContent:"playlists",
            modifyContent: '0',
          })
        }else{
          alert("There was an error fetching");
        }
      });
    }else{
      fetch('https://ps-20-server-django-app.herokuapp.com/api/v1/users/'+  user +'/', {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Token '+this.state.key },
        method: 'GET',
      })
      .then(res => res.json())
      .then(response => {
        if(response.id){
          this.setState({
            userPlaylist:response.playlists,
            contentList: response.playlists,
            friendName:response.username,
            
            tipoContent:"friendPlaylists",
            modifyContent: '0',
          })
        }else{
          alert("There was an error fetching");
        }
      });
    }
  }


  //Funciones para la pantalla de listado del contenido de una playlist

  //Activa la opción bucle de la paylist abierta, iniciando la primera canción al acabar la última.
  setPlaylistLoop = () =>{
    if(this.state.playingPlaylistLoop){
      if(this.state.playingPlaylistLoop===this.state.openPlaylistId){
        this.setState({
          playingPlaylistLoop:'',
        });
      }else{
        this.setState({
          playingPlaylistLoop:this.state.openPlaylistId,
        });
      }
    }else{
      this.setState({
        playingPlaylistLoop:this.state.openPlaylistId,
      });
    }
  }

  //Activa la opción reproducción aleatoria de la paylist abierta, provocando una ordenación aleatorio.
  shufflePlaylist = () =>{
    var Songs,sortedSongs,oldPlaylist,newShuffledPlaylist;
    if(this.state.playingPlaylistShuffled){
      if(this.state.playingPlaylistShuffled===this.state.openPlaylistId){
        Songs = this.state.openPlaylist;
        sortedSongs = Songs.sort(function(a,b){
          return (a.title).localeCompare(b.title);
        });
        this.setState({
          openPlaylist:sortedSongs,
          playingPlaylistShuffled:'',
        });
      }else{
        oldPlaylist = this.state.openPlaylist;
        newShuffledPlaylist = oldPlaylist.sort(() => Math.random() - 0.5) //Shuffle function from "https://javascript.info/task/shuffle"
        this.setState({
          playingPlaylistShuffled: this.state.openPlaylistId,
          openPlaylist:newShuffledPlaylist,
        });
      }
    }else{
      oldPlaylist = this.state.openPlaylist;
      newShuffledPlaylist = oldPlaylist.sort(() => Math.random() - 0.5) //Shuffle function from "https://javascript.info/task/shuffle"
      this.setState({
        playingPlaylistShuffled:this.state.openPlaylistId,
        openPlaylist:newShuffledPlaylist,
      });
    }
  }

  //Ordena el contenido de la playlist abierta según el campo indicado en "mode".
  sortPlaylist = (mode) =>{
    var Songs,sortedSongs;
    switch(mode){
      case 0: //title
        Songs = this.state.openPlaylist;
        sortedSongs = Songs.sort(function(a,b){
          return (a.title).localeCompare(b.title);
        });
        break;
      case 1: //artist
        Songs = this.state.openPlaylist;
        sortedSongs = Songs.sort(function(a,b){
          return (a.album.artist.name).localeCompare(b.album.artist.name);
        });
        break;
      case 2: //genre
        Songs = this.state.openPlaylist;
        sortedSongs = Songs.sort(function(a,b){
          return (a.genre).localeCompare(b.genre);
        });
        break;
      case 3: //upload time on podcast only
        Songs = this.state.openPlaylist;
        sortedSongs = Songs.sort(function(a,b){
          return (a.created_at).localeCompare(b.created_at);
        });
        break;
      default:break;
    }
    this.setState({
      openPlaylist:sortedSongs,
      playingPlaylistShuffled:'',
    });
  }

  //Borra las canciones de la playlist abierta cuya Id aparece en la lista.
  deleteSongs = (list) =>{
    var currentSongs = this.state.openPlaylist;
    var idSongs = currentSongs.map(v=>v.id);
    list.forEach(element =>{
      var posId = idSongs.indexOf(element);
      idSongs.splice(posId,1);
    });
    var url='https://ps-20-server-django-app.herokuapp.com/api/v1/playlists/'+this.state.openPlaylistId+'/';
    var playlist={
      "name":this.state.openPlaylistName,
      "songs":idSongs,
    };
    fetch(url, {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Token '+this.state.key },
      method: 'PUT',
      body: JSON.stringify (
        playlist
      )     
    })
    .then(res => res.json())
    .then(response => {
      if (response.id) {
        this.cambiaMode("playlistContent",this.state.openPlaylistId);
      }else{
        alert("There was an error");
      }
    })
  }
  

  //Funciones para listado de podcasts y de su contenido

  //Permite al ususario añadir el podcast cuya Id coincide con "podcastId".
  addPodcast = (podcastId) =>{
    var idPodcasts = this.state.userPodcasts.map(v=>v.id);
    if(idPodcasts.indexOf(podcastId)<0){
      this.setState({
        showAddPodcast:true,
      })
      idPodcasts.push(podcastId);
      var url='https://ps-20-server-django-app.herokuapp.com/api/v1/rest-auth/user/';
      fetch(url, {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Token '+this.state.key },
        method: 'PATCH',
        body: JSON.stringify({
          "albums":idPodcasts,
        })
      })
      .then(res => res.json())
      .then(response => {
        if (response.id) {
          this.setState({
            userPodcasts:response.albums,
            showAddPodcast:false,
          });
        }
      });
    }else{
      alert("You already have this podcast");
    }
  }

  //Obtiene y guarda los podcasts guardados por el usuario.
  fetchPodcasts = () =>{
      fetch('https://ps-20-server-django-app.herokuapp.com/api/v1/rest-auth/user/', {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Token '+this.state.key },
        method: 'GET',
      })
      .then(res => res.json())
      .then(response => {
        if(response.id){
          this.setState({
            userPodcasts:response.albums,
            contentList: response.albums,
            
            tipoContent:"podcasts",
            modifyContent: '0',
          })
        }else{
          alert("There was an error fetching");
        }
      });
    
  }

  //Borra los podcasts cuya Id aparece en la lista del usuario.
  deletePodcasts = (list) =>{
    var currentPodcasts = this.state.userPodcasts;
    var idPodcasts = currentPodcasts.map(v=>v.id);
    list.forEach(element =>{
      var posId = idPodcasts.indexOf(element);
      idPodcasts.splice(posId,1);
    });
    var url='https://ps-20-server-django-app.herokuapp.com/api/v1/rest-auth/user/';
    fetch(url, {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Token '+this.state.key },
      method: 'PATCH',
      body: JSON.stringify ({
        "albums":idPodcasts,
      })     
    })
    .then(res => res.json())
    .then(response => {
      if (response.id) {
        this.setState({
          userPodcasts:response.albums,
        });
        this.fetchPodcasts();
      }else{
        alert("There was an error");
      }
    })
  }


  //Funciones para el control de las pantallas de amigos

  //Función que coge el valor de la búsqueda en el menú de amigos y hace que solo aparezcan aquellos cuyo nombre incluye la búsqueda.
  getInnerSearch = (string) =>{
    this.setState({
      innerBusqueda: string.target.value
    });
  }

  //Permite al usuario añadir como amigo a "user".
  addUser = (user) =>{
    if(user.id===this.state.userId){
      alert("You can't be your own friend");
    }else{
      var actualFriends= this.state.userFriends;
      var idActualFriends = actualFriends.map(v=>v.id);
      if(idActualFriends.indexOf(user.id)<0){
        this.setState({
          showAddUser:true,
        })
        idActualFriends.push(user.id);
        var url='https://ps-20-server-django-app.herokuapp.com/api/v1/rest-auth/user/';
        fetch(url, {
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Token '+this.state.key },
          method: 'PATCH',
          body: JSON.stringify({
            "friends":idActualFriends,
          })
        })
        .then(res => res.json())
        .then(response => {
          this.setState({
            showAddUser:false,
          })
          if (response.id) {
            this.setState({
              userFriends:response.friends,
            });
          }
        });
      }else{
        alert("You are already friends with him");
      }
    }
  }

  //Elimina los amigos del usuario cuya Id aparece en la lista.
  deleteFriends = (list) =>{
    var currentFriends = this.state.userFriends;
    var idFriends = currentFriends.map(v=>v.id);
    list.forEach(element =>{
      var posId = idFriends.indexOf(element);
      idFriends.splice(posId,1);
    });
    var url='https://ps-20-server-django-app.herokuapp.com/api/v1/rest-auth/user/';
    fetch(url, {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Token '+this.state.key },
      method: 'PATCH',
      body: JSON.stringify ({
        "friends":idFriends,
      })     
    })
    .then(res => res.json())
    .then(response => {
      if (response.id) {
        this.setState({
          userFriends:response.friends,
        })
        this.cambiaMode("friends",0);
      }else{
        alert("There was an error");
      }
    })
  }

  
  //Funciones para la navegación de la página

  //Obtiene los datos del usuario y los guarda para realizar el resto de funciones, incluida la opción de recordar los datos del usaurio logeado.
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
          contentName:response.username,
          userEmail:response.email,
          userId:response.id,
          userPlaylist:response.playlists,
          userFriends: response.friends,
          userPodcasts:response.albums,
        });
        if(response.pause_song && this.state.firstLoad){
          this.setState({
            pausedSecond:response.pause_second,
          });
          this.cambiaSource(response.pause_song);
        }
      }else{
        //alert("Error "+response.detail);
      }
    })
  }

  //Cambia visualmente la pantalla en la que el usuario se encuentra.
  cambiaActive = (posicion) => {
    var tipos = ["playlists","podcasts","friends","settings"]
    var tipoEspecifico = tipos[posicion];
    var actives = [this.state.active];
    actives = ['','','',''];
    actives[posicion]='1';
    this.setState({ 
      current_active: posicion,
      active:actives,
      modifyContent: '0',
    });
    switch(tipoEspecifico){
      case "playlists":
        this.fetchPlaylists(-1);
        break;
      case "podcasts":
        this.fetchPodcasts();
        break;
      case "friends":
        this.cambiaMode("friends",0);
        break;
      default:
        this.setState({ 
          tipoContent:tipoEspecifico,
        });
        break;
    }
  }

  //Cambia a nivel funcional la pantalla en la que se encuentra el usaurio.
  cambiaMode = (tipo,Id) =>{
    var url;
    switch(tipo){
      case "playlists":
        this.fetchPlaylists(-1);
        break;
      case "playlistContent":
        url='https://ps-20-server-django-app.herokuapp.com/api/v1/playlists/'+Id+'/';
        fetch(url, {
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Token '+this.state.key },
          method: 'GET',
        })
        .then(res => res.json())
        .then(response => {
          if (response.id) {
            var Songs = response.songs;
            var sortedSongs = Songs.sort(function(a,b){
              return (a.title).localeCompare(b.title);
            });
            this.setState({
              shuffledPlaylist:sortedSongs,
              openPlaylist:sortedSongs,
              skipControls:true,
              openPlaylistId:response.id,
              openPlaylistName:response.name,
              tipoContent:tipo,
              contentList:response.songs,
              playlist_editar:'', 
            });
          }else{
            alert("There was an error");
          }
        });
        break;
      case "friends":
          this.setState({
              contentList:this.state.userFriends,
              tipoContent:tipo,
          });
        break;
      case "friendPlaylist":
          this.setState({
              friendId:Id,
          });
          this.fetchPlaylists(Id);
        break;
      case "friendPlaylistContent":
        url='https://ps-20-server-django-app.herokuapp.com/api/v1/playlists/'+Id+'/';
        fetch(url, {
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Token '+this.state.key },
          method: 'GET',
        })
        .then(res => res.json())
        .then(response => {
          if (response.id) {
            var Songs = response.songs;
            var sortedSongs = Songs.sort(function(a,b){
              return (a.title).localeCompare(b.title);
            });
            this.setState({
              shuffledPlaylist:sortedSongs,
              openPlaylist:sortedSongs,
              openPlaylistId:response.id,
              skipControls:true,
              openPlaylistName:response.name,
              tipoContent:"friendPlaylistContent",
              contentList:response.songs,
              playlist_editar:'', 
            });
          }else{
            alert("There was an error");
          }
        });
        break;
      case "podcast":
        this.fetchPodcasts();
        break;
      case "podcastContent":
        url='https://ps-20-server-django-app.herokuapp.com/api/v1/albums/'+Id.id+'/'; //Id here is an entire item
        fetch(url, {
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Token '+this.state.key },
          method: 'GET',
        })
        .then(res => res.json())
        .then(response => {
          if (response.id) {
            var Songs = response.songs;
            var sortedSongs = Songs.sort(function(a,b){
              return (a.title).localeCompare(b.title);
            });
            this.setState({
              openPodcast:Id.name,
              shuffledPlaylist:sortedSongs,
              openPlaylist:sortedSongs,
              openPlaylistId:response.id,
              skipControls:true,
              openPlaylistName:response.name,
              tipoContent:"podcastContent",
              podcastAuthor:Id.artist.name,
              contentList:response.songs,
              playlist_editar:'', 
            });
          }else{
            alert("There was an error");
          }
        });
        break;
      default:
        break;
    }
  }
  
  //Permite al usuario salir de la página web y que se descarguen sus datos.
  logout = () => {
    window.localStorage.removeItem("keyMusicApp");
    window.localStorage.removeItem("rememberMusicApp");
    window.location.replace("/no-react/index.html");
  }


  //Funciones para el reproductor de audio

  //Inicia la siguiente canción de la playlist o episodio del podcast, si es posible.
  nextSong= () =>{
    if(!this.state.playerSemaphore){
      this.setState({
        playerSemaphore:"on",
      })
      var currentSongs = this.state.openPlaylist;
      var idSongs = currentSongs.map(v=>v.id);
      var currentSong = idSongs.indexOf(this.state.idActiveSong);
      if(this.state.openPodcast){
        if(currentSongs[currentSong+1]!==undefined){
          this.cambiaSourcePodcast(currentSongs[currentSong+1],undefined,-1);
        }
      }else{
        if(currentSongs[currentSong+1]!==undefined){
          this.cambiaSourcePlaylist(currentSongs[currentSong+1],-1);
        }
      }
    }else{
      sleep(40).then(() => {
        this.setState({
          playerSemaphore:'',
        });
      });
    }
  }

  //Inicia la anterior canción de la playlist o episodio del podcast, si es posible.
  previousSong = () =>{
    if(!this.state.playerSemaphore){
      this.setState({
        playerSemaphore:"on",
      })
      var currentSongs = this.state.openPlaylist;
      var idSongs = currentSongs.map(v=>v.id);
      var currentSong = idSongs.indexOf(this.state.idActiveSong);
      if(this.state.openPodcast){
        if(currentSong-1>=0){
          this.cambiaSourcePodcast(currentSongs[currentSong-1],undefined,-1);
        }
      }else{
        if(currentSong-1>=0){
          this.cambiaSourcePlaylist(currentSongs[currentSong-1],-1);
        }
      }
    }else{
      sleep(40).then(() => {
        this.setState({
          playerSemaphore:'',
        });
      });
    }
  }

  //Se activa al acabar una canción si está en bucle pasará a la siguiente canción, sino no realiza ningún cambio
  finishedSong = () =>{
    var currentSongs,idSongs,finishedSong;
    if(this.state.openPodcast){
      if(this.state.playingPlaylist){
        currentSongs = this.state.openPlaylist;
        idSongs = currentSongs.map(v=>v.id);
        finishedSong = idSongs.indexOf(this.state.idActiveSong);
        if(currentSongs[finishedSong+1]===undefined){
          if(this.state.playingPlaylistLoop||this.state.playingPlaylistShuffled)this.cambiaSourcePodcast(currentSongs[0],undefined,-1);
        }else{
          this.cambiaSourcePodcast(currentSongs[finishedSong+1],undefined,-1);
        }
      }
    }else{
      if(this.state.playingPlaylist){
        currentSongs = this.state.openPlaylist;
        idSongs = currentSongs.map(v=>v.id);
        finishedSong = idSongs.indexOf(this.state.idActiveSong);
        if(currentSongs[finishedSong+1]===undefined){
          if(this.state.playingPlaylistLoop||this.state.playingPlaylistShuffled)this.cambiaSource(currentSongs[0],1);
        }else{
          this.cambiaSource(currentSongs[finishedSong+1],1);
        }
      }
    }
  }

  //Guarda la valoración de la canción en el reproductor que ha realizado el usuario.
  userRating = (rate) =>{
    var song={
      "user_valoration":rate,
    };
    fetch('https://ps-20-server-django-app.herokuapp.com/api/v1/songs/'+this.state.idActiveSong+'/', {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Token '+this.state.key },
      method: 'PUT',
      body: JSON.stringify (
        song
      )     
    })
    .then(res => res.json())
    .then(response => {
      if (response.id) {
        var currentSongs = this.state.openPlaylist;
        var idSongs = currentSongs.map(v=>v.id);
        var posId = idSongs.indexOf(response.id);
        currentSongs[posId]=response;
        this.setState({
          openPlaylist:currentSongs,
          rating: response.avg_valoration,
          userRated:rate,
        });
        if(this.state.tipoContent==="search"){
          this.updateSearchSong();
        }
      }else{
        alert("There was an error");
      }
    })
  }

  //Actualiza la última canción que estaba escuchando el usuario.
  updatePausedSong = () =>{
    if(this.state.update){
      var url='https://ps-20-server-django-app.herokuapp.com/api/v1/rest-auth/user/';
      var currentSecond= Math.trunc(this.player.current.audio.current.currentTime);
      fetch(url, {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Token '+this.state.key },
        method: 'PATCH',
        body: JSON.stringify({
          "pause_song":this.state.idActiveSong,
          "pause_second":currentSecond,
        })
      });
    }
  }

  //Se ejecuta al iniciar la pestaña, si el usuario estaba escuchándo una canción y cierra la aplicación o pestaña, ésta será cargada aquí.
  setLastSong = () =>{
    if(this.state.firstLoad){
      if(this.state.pausedSecond!==null){
        this.player.current.audio.current.pause();
        this.player.current.audio.current.currentTime=this.state.pausedSecond;
        this.setState({
          firstLoad:'',
          update:'',
        });
        sleep(40).then(() => {
          this.setState({
            update:'1',
          });
        });
      }else{
        this.player.current.audio.current.play();
        this.setState({
          firstLoad:'',
          update:'1',
        });
      }
    }
  }  

  //Carga una canción en el reproductor a partir solamente de la información de la canción, se usa desde el buscador solamente.
  cambiaSource = (newSrc) => {
      this.setState({
        idActiveSong:newSrc.id,
        openPlaylistId:'',
        skipControls:false,
        src: newSrc.stream_url,
        audioType:newSrc.episode,
        title: newSrc.title,
        author: newSrc.album.artist.name,
        album: newSrc.album.name,
        rating: newSrc.avg_valoration,
        userRated: newSrc.user_valoration,
        playingPlaylist:0,
      });
      if(newSrc.user_valoration){
        this.setState({
          userRated: newSrc.user_valoration,
        });
      }else{
        this.setState({
          rating: newSrc.avg_valoration,
        });
      }
      if(!this.state.firstLoad){
        this.player.current.audio.current.currentTime=0;
        this.player.current.audio.current.play();
      }
      this.setState({
        playerSemaphore: '',
      });
  }

  //Carga una canción en el reproductor a partir de la información de la canción y de una Id de playlist, se usa desde los menús de playlists solamente.
  cambiaSourcePlaylist = (newSrc,idPL) =>{
    if(idPL<0){//Tenemos la playlist abierta, no se va a usar este valor
      if(newSrc.id){//Si tenemos una fuente, hemos abierto una canción concreta de la playlist
          this.setState({
            idActiveSong:newSrc.id,
            audioType:newSrc.episode,
            src: newSrc.stream_url,
            title: newSrc.title,
            author: newSrc.album.artist.name,
            album: newSrc.album.name,
            rating: newSrc.avg_valoration,
            userRated: newSrc.user_valoration,
            playingPlaylist:1,
          });
          if(newSrc.user_valoration){
            this.setState({
              userRated: newSrc.user_valoration,
            });
          }else{
            this.setState({
              rating: newSrc.avg_valoration,
            });
          }
          this.player.current.audio.current.currentTime=0;
          this.player.current.audio.current.play();
          this.setState({
            playerSemaphore: '',
          });
      }else{//Si no tenemos una fuente, hemos iniciado desde el principio la palylist
        if(newSrc<0){
          ;
        }else{
            this.setState({
              idActiveSong:this.state.openPlaylist[0].id,
              audioType:this.state.openPlaylist[0].episode,
              src: this.state.openPlaylist[0].stream_url,
              title: this.state.openPlaylist[0].title,
              author: this.state.openPlaylist[0].album.artist.name,
              album: this.state.openPlaylist[0].album.name,
              rating: this.state.openPlaylist[0].avg_valoration,
              userRated: this.state.openPlaylist[0].user_valoration,
              playingPlaylist:1,
            });
            if(newSrc.user_valoration){
              this.setState({
                userRated: this.state.openPlaylist[0].user_valoration,
              });
            }else{
              this.setState({
                rating: this.state.openPlaylist[0].avg_valoration,
              });
            }
            this.player.current.audio.current.currentTime=0;
            this.player.current.audio.current.play();
            this.setState({
              playerSemaphore: '',
            });
        }
      }
    }else{//No tenemos la playlist abierta, debemos cargarla y después abrirla desde la primera canción
      var url='https://ps-20-server-django-app.herokuapp.com/api/v1/playlists/'+idPL+'/';
      fetch(url, {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Token '+this.state.key },
        method: 'GET',
      })
      .then(res => res.json())
      .then(response => {
        if (response.id) {
          if(response.songs[0]!==undefined){
            this.setState({
              src: '',
            });
            var Songs = response.songs;
            var sortedSongs = Songs.sort(function(a,b){
              return (a.title).localeCompare(b.title);
            });
            this.setState({
              openPlaylistId:response.id,
              skipControls:true,
              openPlaylist:sortedSongs,
              idActiveSong:sortedSongs[0].id,
              src: sortedSongs[0].stream_url,
              audioType:sortedSongs[0].episode,
              title: sortedSongs[0].title,
              author: sortedSongs[0].album.artist.name,
              album: sortedSongs[0].album.name,
              rating: sortedSongs[0].avg_valoration,
              userRated: sortedSongs[0].user_valoration,
              playingPlaylist:1,
            });
            if(newSrc.user_valoration){
              this.setState({
                userRated: sortedSongs[0].user_valoration,
              });
            }else{
              this.setState({
                rating: sortedSongs[0].avg_valoration,
              });
            }
            this.player.current.audio.current.currentTime=0;
            this.player.current.audio.current.play();
            this.setState({
              playerSemaphore: '',
            });
          }
        }else{
          alert("There was an error");
        }
      });
    }
  }

  //Carga una canción en el reproductor a partir de la información de la canción y de una Id de podcast, se usa desde los menús de podcasts solamente.
  cambiaSourcePodcast = (newSrc,author,datosPd) =>{
      if(newSrc.id){//Si tenemos una fuente, hemos iniciado un episodio concreto del podcast
          this.setState({
            idActiveSong:newSrc.id,
            audioType:newSrc.episode,
            src: newSrc.stream_url,
            title: newSrc.title,
            author: this.state.podcastAuthor,
            album: this.state.openPodcast,
            rating: newSrc.avg_valoration,
            userRated:  newSrc.user_valoration,
            playingPlaylist:1,
          });
          if(newSrc.user_valoration){
            this.setState({
              userRated: newSrc.user_valoration,
            });
          }else{
            this.setState({
              rating: newSrc.avg_valoration,
            });
          }
          this.player.current.audio.current.currentTime=0;
          this.player.current.audio.current.play();
          this.setState({
            playerSemaphore: '',
          });
      }else{//Si no tenemos una fuente, hemos iniciado el podcast desde el primer episodio
        if(author){//Si tenemos un autor, hemos iniciado el podcast sin haberlo cargado primero
          var url='https://ps-20-server-django-app.herokuapp.com/api/v1/albums/'+datosPd.id+'/';
          fetch(url, {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Token '+this.state.key },
            method: 'GET',
          })
          .then(res => res.json())
          .then(response => {
            if (response.id) {
              var Songs = response.songs;
              var sortedSongs = Songs.sort(function(a,b){
                return (a.title).localeCompare(b.title);
              });
              this.setState({
                openPodcast:response.name,
                shuffledPlaylist:sortedSongs,
                openPlaylist:sortedSongs,
                openPlaylistId:response.id,
                skipControls:true,
                openPlaylistName:response.name,
                podcastAuthor:datosPd.artist.name,

                idActiveSong:sortedSongs[0].id,
                audioType:sortedSongs[0].episode,
                src: sortedSongs[0].stream_url,
                title: sortedSongs[0].title,
                author: datosPd.artist.name,
                album: response.name,
                rating:  sortedSongs[0].avg_valoration,
                userRated:   sortedSongs[0].user_valoration,
                playingPlaylist:1,
              });
              if(newSrc.user_valoration){
                this.setState({
                  userRated: this.state.openPlaylist[0].user_valoration,
                });
              }else{
                this.setState({
                  rating: this.state.openPlaylist[0].avg_valoration,
                });
              }
              this.player.current.audio.current.currentTime=0;
              this.player.current.audio.current.play();
              this.setState({
                playerSemaphore: '',
              });
            }else{
              alert("There was an error");
            }
          });
        }else{//Si no tenemos un autor, hemos iniciado el podcast después de cargarlo
            this.setState({
              idActiveSong:this.state.openPlaylist[0].id,
              audioType:this.state.openPlaylist[0].episode,
              src: this.state.openPlaylist[0].stream_url,
              title: this.state.openPlaylist[0].title,
              author: this.state.podcastAuthor,
              album: this.state.openPodcast,
              rating: this.state.openPlaylist[0].avg_valoration,
              userRated:  this.state.openPlaylist[0].user_valoration,
              playingPlaylist:1,
            });
            if(newSrc.user_valoration){
              this.setState({
                userRated: this.state.openPlaylist[0].user_valoration,
              });
            }else{
              this.setState({
                rating: this.state.openPlaylist[0].avg_valoration,
              });
            }
            this.player.current.audio.current.currentTime=0;
            this.player.current.audio.current.play();
            this.setState({
              playerSemaphore: '',
            });
        }
      }        
  }

  //Vacía cualquier valor de canción del reproductor e indica que el usuario no tiene ninguna canción activa.
  emptySource = () => {
    var url='https://ps-20-server-django-app.herokuapp.com/api/v1/rest-auth/user/';
    fetch(url, {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Token '+this.state.key },
      method: 'PATCH',
      body: JSON.stringify({
        "pause_song":null,
        "pause_second":null,
      })
    })
    .then(()=>{
      this.setState({
        idActiveSong:'',
        src: '',
        audioType:'',
        title: '',
        author: '',
        album: '',
        rating: '',
        userRated: '',
      });
      this.setState({
        playerSemaphore: '',
      });
    })
  }


  //Funciones para debug de la web, solo aparecen si está activo el estado debug.

  registerDebug = () =>{
    fetch('https://ps-20-server-django-app.herokuapp.com/api/v1/rest-auth/registration/', {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify ({
          "username": "prueba",
          "email": "rogerjunior1999@yahoo.com",
          "password1": "Contraseña1",
          "password2": "Contraseña1"
      })
    })
    .then(res => res.json())
    .then(response => {
      if (response.key) {
        window.localStorage.setItem('keyMusicApp',response.key);
        window.location.reload();
      }
    });
  }

  loginDebug = () =>{
    fetch('https://ps-20-server-django-app.herokuapp.com/api/v1/rest-auth/login/', {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify ({
        "username": "prueba",
        "email": '',
        "password": "Contraseña1"
      })  
    })
    .then(res => res.json())
    .then(response => {
      if (response.key) {
        window.localStorage.setItem('keyMusicApp',response.key);
        window.location.reload();
      }
    });
  }
  
}

export default App;