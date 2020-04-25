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

//HOLA RUGELIO BON GIORNOOOOOOOOOOOOOOOOOO
//Sleep function from "https://flaviocopes.com/javascript-sleep/"
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      key: window.localStorage.keyMusicApp,
      tipoContent: '', //Se asigna el tipo de lista ("search", "playlists", "playlistContent", "podcasts", "podcastContent", "friends", "settings")

      contentList:'',
      modifyContent: '', //Dejar vacío para que no muestre nada
      contentName:'',

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
      userId:'',
      userPlaylist:'',
      openPlaylist:[],
      openPlaylistId:'',
      openPlaylistName:'',

      idActiveSong:'',
      playingPlaylist:'',
      playingPlaylistLoop:'',
      playingPlaylistShuffled:'',
      nuevo_nombre:'',
      playlist_editar:'',

      forceAutoplay:'',
      debug:'1',
    }
    this.player=React.createRef();
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
              <button onClick={this.emptySource}>
                Stop
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
              <div className="d-flex flex-row-reverse">
              <button onClick={() => this.createNewPlaylist("prueba",0)}>add prueba</button>
              </div>
              <Content token={this.state.key} user={this.state.contentName} tipo={this.state.tipoContent} playlists={this.state.userPlaylist} lista={this.state.contentList} cantidad={this.state.busquedaCount} currentPlaylist={this.state.openPlaylistId} loopingPlaylist={this.state.playingPlaylistLoop} shuffledPlaylist={this.state.playingPlaylistShuffled} shufflePlaylist={this.shufflePlaylist} loopPlaylist={this.setPlaylistLoop} playPlaylist={this.playPlaylist} cambiaOrden={this.sortPlaylist} editNamePlaylist={this.setEditingPlaylist} createPlaylist={this.createNewPlaylist} deletePlaylist={this.deletePlaylists} deleteSongs={this.deleteSongs} busqueda={this.state.busquedaSearch} hayPrev={this.state.busquedaPreviousPage} editing_playlist={this.state.playlist_editar} hayNext={this.state.busquedaNextPage} change={this.state.modifyContent} cambiaModo={this.cambiaMode} cambiaCancion={this.cambiaSource} cambiaCancionPlaylist={this.cambiaSourcePlaylist} prevPage={() => this.cambiaPage(0)} nextPage={() => this.cambiaPage(1)}/>
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
                {this.state.title
                  ?<div className="readable-text"><Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" initialRating={this.state.rating} onChange={(rate) => this.userRating(rate)}/></div>
                  :<div></div>
                }
              </div>
              <div className="col-sm-8">
                {this.state.forceAutoplay
                  ?<><AudioPlayer id="audioplayer" ref={this.player} autoPlay className="full-height" src={this.state.src} showSkipControls={true} onEnded={this.finishedSong}  onClickPrevious={this.previousSong} onClickNext={this.nextSong}></AudioPlayer></>
                  :<AudioPlayer id="audioplayer" ref={this.player} autoPlayAfterSrcChange className="full-height" src={this.state.src} showSkipControls={true} onEnded={this.finishedSong} onClickPrevious={this.previousSong} onClickNext={this.nextSong}></AudioPlayer>
                }
                
              </div>
            </div>
            <div className="darker-bar" style={{height:25}}></div>
        </footer>
      </div>
    );
  }

  finishedSong = () =>{
    if(this.state.playingPlaylist){
      var currentSongs = this.state.openPlaylist;
      var idSongs = currentSongs.map(v=>v.id);
      var finishedSong = idSongs.indexOf(this.state.idActiveSong);
      if(currentSongs[finishedSong+1]===undefined){
        if(this.state.playingPlaylistLoop||this.state.playingPlaylistShuffled)this.cambiaSource(currentSongs[0],1);
      }else{
        this.cambiaSource(currentSongs[finishedSong+1],1);
      }
    }
  }

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

  shufflePlaylist = () =>{
    var Songs,sortedSongs;
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
        var oldPlaylist = this.state.openPlaylist;
        var newShuffledPlaylist = oldPlaylist.sort(() => Math.random() - 0.5) //Shuffle function from "https://javascript.info/task/shuffle"
        this.setState({
          playingPlaylistShuffled: this.state.openPlaylistId,
          openPlaylist:newShuffledPlaylist,
        });
      }
    }else{
      var oldPlaylist = this.state.openPlaylist;
      var newShuffledPlaylist = oldPlaylist.sort(() => Math.random() - 0.5) //Shuffle function from "https://javascript.info/task/shuffle"
      this.setState({
        playingPlaylistShuffled:this.state.openPlaylistId,
        openPlaylist:newShuffledPlaylist,
      });
    }
  }

  playPlaylist = () =>{
    if(this.state.openPlaylist[0]!==undefined){
      this.setState({
        playingPlaylist:1,
      });
      this.cambiaSource(this.state.openPlaylist[0],1);
    }
  }

  sortPlaylist = (mode) =>{
    var Songs,sortedSongs;
    switch(mode){
      case 0: //title
        Songs = this.state.openPlaylist;
        sortedSongs = Songs.sort(function(a,b){
          return (a.title).localeCompare(b.title);
        });
        this.setState({
          openPlaylist:sortedSongs,
        });
        break;
      case 1: //artist
        Songs = this.state.openPlaylist;
        sortedSongs = Songs.sort(function(a,b){
          return (a.album.artist.name).localeCompare(b.album.artist.name);
        });
        this.setState({
          openPlaylist:sortedSongs,
        });
        break;
      case 2: //genre
        Songs = this.state.openPlaylist;
        sortedSongs = Songs.sort(function(a,b){
          return (a.genre).localeCompare(b.genre);
        });
        this.setState({
          openPlaylist:sortedSongs,
        });
        break;
      default:break;
    }
    this.emptySource();
  }

  nextSong= () =>{
    var currentSongs = this.state.openPlaylist;
    var idSongs = currentSongs.map(v=>v.id);
    var currentSong = idSongs.indexOf(this.state.idActiveSong);
    if(currentSongs[currentSong+1]!==undefined){
      this.cambiaSource(currentSongs[currentSong+1],1);
    }
  }

  previousSong = () =>{
    var currentSongs = this.state.openPlaylist;
    var idSongs = currentSongs.map(v=>v.id);
    var currentSong = idSongs.indexOf(this.state.idActiveSong);
    if(currentSong-1>=0){
      this.cambiaSource(currentSongs[currentSong-1],1);
    }
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
          contentList: response.results,
          busquedaActive: this.state.activeSearch,
          busquedaSearch: this.state.busqueda,
          tipoContent: "search",
          modifyContent: '0',
          openPlaylistId:'',
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
  }

  //  Option = 1 -> change name
  //  Option = 0 -> create
  createNewPlaylist = (name,option) =>{
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
            this.fetchPlaylists();
          }else{
            alert("There was an error");
          }
        })
        break;

      case 1:
        var url = 'https://ps-20-server-django-app.herokuapp.com/api/v1/playlists/'
        url = url + this.state.playlist_aeditar+'/'
        fetch(url, {
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Token '+this.state.key },
          method: 'PATCH',
          body: JSON.stringify (
            {"name":name}
          )     
        })
        break;

      default:
        break;
    }
    
  }

  setEditingPlaylist = (p_editar) =>{
    this.setState({
      playlist_editar: p_editar,
    })
  }

  fetchPlaylists = () =>{
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
    })
  }

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
          this.fetchPlaylists();
        }else{
          countRefresh++;
        }
      })
      i++;
    }
  }


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
        });
      }else{
        alert("There was an error");
      }
    })
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
          contentName:response.username,
          userId:response.id,
          userPlaylist:response.playlists,
        });
        if(response.pause_song){
          this.setState({
            forceAutoplay:'',
          });
        }else{
          this.setState({
            forceAutoplay:'1',
          });
        }
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
      current_active: posicion,
      active:actives,
      modifyContent: '0',
      openPlaylistId:'',
    });
    switch(tipoEspecifico){
      case "playlists":
        this.fetchPlaylists();
        break;
      default:
        this.setState({ 
          tipoContent:tipoEspecifico,
        });
        break;
    }
  }

  cambiaMode = (tipo,playlistId) =>{
    switch(tipo){
      case "playlists":
        this.fetchPlaylists();
        break;
      case "playlistContent":
        var url='https://ps-20-server-django-app.herokuapp.com/api/v1/playlists/'+playlistId+'/';
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
              openPlaylistName:response.name,
              tipoContent:tipo,
              contentList:response.songs,
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

  cambiaSource = (newSrc,isPlaylist) => {
    this.setState({
      src: '',
    });
    if(isPlaylist<0){
      sleep(5).then(() => {
        this.setState({
          idActiveSong:newSrc.id,
          src: newSrc.stream_url,
          title: newSrc.title,
          author: newSrc.album.artist.name,
          album: newSrc.album.name,
          rating: newSrc.avg_valoration,
          playingPlaylist:0,
        })
      })
    }else{
      sleep(5).then(() => {
        this.setState({
          idActiveSong:newSrc.id,
          src: newSrc.stream_url,
          title: newSrc.title,
          author: newSrc.album.artist.name,
          album: newSrc.album.name,
          rating: newSrc.avg_valoration,
        });
      })
    }
  }

  cambiaSourcePlaylist = (newSrc,idPL) =>{
    if(idPL<0){
      this.setState({
        src: '',
      });
      if(newSrc.id){
        sleep(5).then(() => {
          this.setState({
            idActiveSong:newSrc.id,
            src: newSrc.stream_url,
            title: newSrc.title,
            author: newSrc.album.artist.name,
            album: newSrc.album.name,
            rating: newSrc.avg_valoration,
            playingPlaylist:1,
          });
        });
      }else{
        if(newSrc<0){
          ;
        }else{
          sleep(5).then(() => {
            this.setState({
              idActiveSong:this.state.openPlaylist[0].id,
              src: this.state.openPlaylist[0].stream_url,
              title: this.state.openPlaylist[0].title,
              author: this.state.openPlaylist[0].album.artist.name,
              album: this.state.openPlaylist[0].album.name,
              rating: this.state.openPlaylist[0].avg_valoration,
              playingPlaylist:1,
            });
          });
        }
      }
    }else{
      this.setState({
        src: '',
      });
      var url='https://ps-20-server-django-app.herokuapp.com/api/v1/playlists/'+idPL+'/';
      fetch(url, {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Token '+this.state.key },
        method: 'GET',
      })
      .then(res => res.json())
      .then(response => {
        if (response.id) {
          if(response.songs[0]!==undefined){
            var Songs = response.songs;
            var sortedSongs = Songs.sort(function(a,b){
              return (a.title).localeCompare(b.title);
            });
            this.setState({
              openPlaylist:sortedSongs,
              idActiveSong:sortedSongs[0].id,
              src: sortedSongs[0].stream_url,
              title: sortedSongs[0].title,
              author: sortedSongs[0].album.artist.name,
              album: sortedSongs[0].album.name,
              rating: sortedSongs[0].avg_valoration,
              playingPlaylist:1,
            });
          }
        }else{
          alert("There was an error");
        }
      });
    }
  }

  emptySource = () => {
    this.setState({
      src: '',
      title: '',
      author: '',
      album: '',
      rating: '',
    });
  }

}

export default App;