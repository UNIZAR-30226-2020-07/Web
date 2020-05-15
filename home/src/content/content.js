import React, {Component} from 'react';
import Rating from 'react-rating';
import 'font-awesome/css/font-awesome.min.css';
import { faPlay, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faTrashRestore } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './content.css';
import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';
import DropdownSort from './dropdownSort/dropdownSort'


class Content extends Component {
  constructor(props){
    super(props);
    this.state = {
      key:this.props.token,
      contenido: '',
      playlists:this.props.playlists, //Se necesitan tener separadas para su uso en búsquedas
      tipo: this.props.tipo,
      tipoBusqueda:this.props.tipoBusqueda,
      cantidad: '0',
      show: '0',
      busqueda: '',
      next: this.props.hayNext,
      previous: this.props.hayPrev,

      username:this.props.user,
      showAddPlaylist:'',
      newTitle:'',
      newModTitle:'',
      deleting:'',
      delList:[],

      showAddSong: false,
      songToAdd:'',

      showAddUser: this.props.showAddUser,
      showAddPodcast: this.props.showAddPodcast,

      friend:this.props.friend,

      currentPL:this.props.currentPlaylist,
      loopingPL:this.props.loopingPlaylist,
      shuffledPL:this.props.shuffledPlaylist,
      id_edited_playlist:this.props.editing_playlist,

      useremail: this.props.email,
      usernameChange : false,
      emailChange : false,
      passwordChange : false,
    };
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.change){
      this.setState({
        contenido: nextProps.lista,
        playlists:nextProps.playlists,
        cantidad: nextProps.cantidad,
        tipo: nextProps.tipo,
        tipoBusqueda:nextProps.tipoBusqueda,
        username: nextProps.user,
        show: '1',
        busqueda: nextProps.busqueda,
        next: nextProps.hayNext,
        previous: nextProps.hayPrev,
        currentPL:nextProps.currentPlaylist,
        loopingPL:nextProps.loopingPlaylist,
        shuffledPL:nextProps.shuffledPlaylist,
        id_edited_playlist:nextProps.editing_playlist,
        showAddUser: nextProps.showAddUser,
        showAddPodcast: nextProps.showAddPodcast,
        friend:nextProps.friend,
        useremail: nextProps.email,
      });
      if(nextProps.tipo !== "playlists"){
        this.setState({
          showAddPlaylist:'',
          newTitle:'',
          id_edited_playlist:'',
        });
      }
    }
  }

  closeModal = () => {
    this.setState({  
      showAddSong: false,
      songToAdd:'',
    });
  };

  openModal = (id) => {
    this.setState({
      showAddSong: true,
      songToAdd:id,
    });
  };

  addSongToPlaylist = (Playlist) =>{
    if(Playlist.songs.indexOf(this.state.songToAdd)===-1){
      var url='https://ps-20-server-django-app.herokuapp.com/api/v1/playlists/'+Playlist.id+'/';
      Playlist.songs.push(this.state.songToAdd);
  
      var Newplaylist={
        "name":Playlist.name,
        "songs":Playlist.songs,
      };
  
      fetch(url, {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Token '+this.state.key },
        method: 'PUT',
        body: JSON.stringify (
          Newplaylist
        )     
      })
      .then(() => {
        this.closeModal();
      })
    }else{
      document.getElementById("textoError").textContent = "This song already exists in this playlist";
    }
  }

  addPlaylist = () =>{
    this.setState({
      showAddPlaylist:'0',
    });
  }

  selectDel = () =>{
    this.setState({
      deleting:'0',
    });
  }

  addDelList = (id) =>{
    var oldDelete = this.state.delList;
    oldDelete.push(id);
    this.setState({
      delList:oldDelete,
    });
  }

  extractDelList = (id) =>{
    var oldDelete = this.state.delList;
    var posId = oldDelete.indexOf(id);
    oldDelete.splice(posId,1);
    this.setState({
      delList:oldDelete,
    });
  }

  confirmDel = (typeDelete) =>{  //0=playlists, 1=playlistsSongs, 2=friends, 3=podcast
    switch(typeDelete){
      case 0:
        this.props.deletePlaylist(this.state.delList);
        break;
      case 1:
        this.props.deleteSongs(this.state.delList);
        break;
      case 2:
        this.props.deleteFriends(this.state.delList);
        break;
      case 3:
        this.props.deletePodcasts(this.state.delList);
        break;
      default:
        break;
    }
    this.setState({
      deleting:'',
      delList:[],
    });
  }

  getTitle = (string) =>{
    this.setState({
      newTitle: string.target.value,
    });
  }

  getModTitle = (string) =>{
    this.setState({
      newModTitle: string.target.value,
    });
  }

  confirmNewPlaylist = () =>{
    if(this.state.newTitle){
      //Create == 1 -> crear playlist // create == 0 -> editar playlist 
      this.props.createPlaylist(this.state.newTitle,0);
      this.setState({
        showAddPlaylist:'',
        newTitle:'',
      });
    }else{
      this.props.editNamePlaylist('');
      this.setState({
        showAddPlaylist:'',
        newTitle:'',
        newModTitle:'',
      });
    }
  }

  confirmModPlaylist = () =>{
    if(this.state.newModTitle){
      this.props.createPlaylist(this.state.newModTitle,1);
      this.setState({
        newModTitle:'',
      });
    }else{
      this.props.editNamePlaylist('');
      this.setState({
        showAddPlaylist:'',
        newTitle:'',
        newModTitle:'',
      });
    }
  }

  cambiarUsername = () => {
    this.setState({
      usernameChange : true,
    });
  }

  cambiarEmail = () => {
    this.setState({
      emailChange : true,
    });
  }

  cambiarPassword = () => {
    this.setState({
      passwordChange : true,
    });
  }

  fijarUsername = () => {
    this.setState({
      usernameChange : false,
    });
  }

  fijarEmail = () => {
    this.setState({
      emailChange : false,
    });
  }

  fijarPassword = () => {
    this.setState({
      passwordChange : false,
    });
  }

  borrarCuenta = () => {
    console.log("Noooooooooo")
  }

  render() {
    switch(this.state.tipo){
      case "search":
        switch(this.state.tipoBusqueda){
          case 4:
            return (
              <div className="container content-internal"style={{marginBottom:35,marginTop:5}}>
                  {this.state.show === '1'
                    ? <>{this.state.cantidad > '0'
                          ? <><div className="d-flex justify-content-center readable-text">Results for search "{this.state.busqueda}"</div>
                              <div className="row the-fine-printing" style={{marginBottom:35}}>
                                  <div className="col-lg-1 list-element d-flex justify-content-center">Type</div>
                                  <div className="col-lg-7 list-element manual-left-border d-flex justify-content-center">Name</div>
                                  <div className="col-lg-3 list-element manual-left-border d-flex justify-content-center">Artist</div>
                                  <div className="col-lg-1 list-element manual-left-border d-flex justify-content-center">Add</div>
                                </div>
                              {this.state.contenido.map((item,index)=>(
                                <div className="row the-fine-marging" key={index} item={item}>
                                  <div className="col-lg-1 list-element d-flex justify-content-center the-fine-printing-start"><FontAwesomeIcon className="fa-2x" icon={faMicrophone}/></div>
                                  <div className="col-lg-7 manual-left-border-2 list-element d-flex justify-content-center the-fine-printing-middle">{item.name}</div>
                                  <div className="col-lg-3 manual-left-border-2 list-element d-flex justify-content-center the-fine-printing-end">{item.artist.name}</div>
                                  <div className="col-lg-1 list-element d-flex justify-content-center no-padding"><button className="disguised-button" onClick={() => this.props.addPodcast(item.id)}><FontAwesomeIcon className="fa-2x" icon={faPlus}/></button></div>
                                </div>
                              ))}
                              <div className="d-flex justify-content-center">
                                {this.state.previous === null
                                    ?<><button className="button-control disabled-button" style={{marginRight:10}} onClick={this.props.prevPage} disabled><FontAwesomeIcon icon={faArrowLeft}/></button></>
                                    :<button className="button-control"style={{marginRight:10}} onClick={this.props.prevPage}><FontAwesomeIcon icon={faArrowLeft}/></button>
                                }
                                
                                {this.state.next === null
                                    ?<> <button className="button-control disabled-button" style={{marginLeft:10}} onClick={this.props.nextPage} disabled><FontAwesomeIcon icon={faArrowRight}/></button></>
                                    : <button className="button-control" style={{marginLeft:10}} onClick={this.props.nextPage}><FontAwesomeIcon icon={faArrowRight}/></button>
                                }
                              </div>
                            </>
                          : <div className="row readable-text">No se han encontrado resultados para {this.state.busqueda}.</div>
                        }
                      </>
                    : <div className="row readable-text">No se han encontrado resultados</div>
                  }
                
                <Modal open={this.state.showAddPodcast} onClose={this.closeModal} showCloseIcon={false} center>
                  <div className="custom-modal2">
                    <div className="row d-flex justify-content-center" style={{paddingLeft:10,paddingRight:10}}><p className="readable-text">Adding podcast...</p></div>
                  </div>
                </Modal>
              </div>
            );
          case 5:
            return (
              <div className="container content-internal"style={{marginBottom:35,marginTop:5}}>
                  {this.state.show === '1'
                    ? <>{this.state.cantidad > '0'
                          ? <><div className="d-flex justify-content-center readable-text">Results for search "{this.state.busqueda}"</div>
                              <div className="row the-fine-printing" style={{marginBottom:35}}>
                                  <div className="col-lg-1 list-element d-flex justify-content-center">Type</div>
                                  <div className="col-lg-10 list-element manual-left-border d-flex justify-content-center">Title</div>
                                  <div className="col-lg-1 list-element manual-left-border d-flex justify-content-center">Add</div>
                                </div>
                              {this.state.contenido.map((item,index)=>(
                                <div className="row the-fine-marging" key={index} item={item}>
                                  <div className="col-lg-1 list-element d-flex justify-content-center the-fine-printing-start"><FontAwesomeIcon className="fa-2x" icon={faUser}/></div>
                                  <div className="col-lg-10 manual-left-border-2 list-element d-flex justify-content-center the-fine-printing-end">{item.username}</div>
                                  <div className="col-lg-1 list-element d-flex justify-content-center no-padding"><button className="disguised-button" onClick={() => this.props.addUser(item)}><FontAwesomeIcon className="fa-2x" icon={faPlus}/></button></div>
                                </div>
                              ))}
                              <div className="d-flex justify-content-center">
                                {this.state.previous === null
                                    ?<><button className="button-control disabled-button" style={{marginRight:10}} onClick={this.props.prevPage} disabled><FontAwesomeIcon icon={faArrowLeft}/></button></>
                                    :<button className="button-control" style={{marginRight:10}} onClick={this.props.prevPage}><FontAwesomeIcon icon={faArrowLeft}/></button>
                                }
                                
                                {this.state.next === null
                                    ?<> <button className="button-control disabled-button" style={{marginLeft:10}} onClick={this.props.nextPage} disabled><FontAwesomeIcon icon={faArrowRight}/></button></>
                                    : <button className="button-control" style={{marginLeft:10}} onClick={this.props.nextPage}><FontAwesomeIcon icon={faArrowRight}/></button>
                                }
                              </div>
                            </>
                          : <div className="row readable-text">No se han encontrado resultados para {this.state.busqueda}.</div>
                        }
                      </>
                    : <div className="row readable-text">No se han encontrado resultados</div>
                  }
                  <Modal open={this.state.showAddUser} onClose={this.closeModal} showCloseIcon={false} center>
                    <div className="custom-modal2">
                      <div className="row d-flex justify-content-center" style={{paddingLeft:10,paddingRight:10}}><p className="readable-text">Adding user...</p></div>
                    </div>
                  </Modal>
              </div>
            );
          default:
            return (
            <div className="container content-internal"style={{marginBottom:35,marginTop:5}}>
                {this.state.show === '1'
                  ? <>{this.state.cantidad > '0'
                        ? <><div className="d-flex justify-content-center readable-text">Results for search "{this.state.busqueda}"</div>
                            <div className="row the-fine-printing" style={{marginBottom:35}}>
                                <div className="col-lg-1 list-element d-flex justify-content-center">Type</div>
                                <div className="col-lg-3 list-element manual-left-border d-flex justify-content-center">Title</div>
                                <div className="col-lg-2 list-element manual-left-border d-flex justify-content-center">Artist</div>
                                <div className="col-lg-1 list-element manual-left-border d-flex justify-content-center">Genre</div>
                                <div className="col-lg-3 list-element manual-left-border d-flex justify-content-center">Rating</div>
                                <div className="col-lg-1 list-element manual-left-border d-flex justify-content-center">Add song</div>
                                <div className="col-lg-1 list-element manual-left-border d-flex justify-content-center">Play</div>
                              </div>
                            {this.state.contenido.map((item,index)=>(
                              <div className="row the-fine-marging" key={index} item={item}>
                                <div className="col-lg-1 list-element d-flex justify-content-center the-fine-printing-start"><FontAwesomeIcon className="fa-2x" icon={faMusic}/></div>
                                <div className="col-lg-3 manual-left-border-2 list-element d-flex justify-content-center the-fine-printing-middle">{item.title}</div>
                                <div className="col-lg-2 manual-left-border-2 list-element d-flex justify-content-center the-fine-printing-middle">{item.album.artist.name}</div>
                                <div className="col-lg-1 manual-left-border-2 list-element d-flex justify-content-center the-fine-printing-middle">{item.genre}</div>
                                <div className="col-lg-3 manual-left-border-2 list-element d-flex justify-content-center the-fine-printing-end"><Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" initialRating={item.avg_valoration} readonly/></div>
                                <div className="col-lg-1 list-element d-flex justify-content-center no-padding"><button className="disguised-button" onClick={() => this.openModal(item.id)}><FontAwesomeIcon className="fa-2x" icon={faPlus}/></button></div>
                                <div className="col-lg-1 list-element d-flex justify-content-center no-padding"><button className="disguised-button" onClick={() => this.props.cambiaCancion(item)}><FontAwesomeIcon className="fa-2x" icon={faPlay}/></button></div></div>
                            ))}
                            <div className="d-flex justify-content-center">
                              {this.state.previous === null
                                  ?<><button className="button-control disabled-button" style={{marginRight:10}} onClick={this.props.prevPage} disabled><FontAwesomeIcon icon={faArrowLeft}/></button></>
                                  :<button className="button-control"style={{marginRight:10}} onClick={this.props.prevPage}><FontAwesomeIcon icon={faArrowLeft}/></button>
                              }
                              
                              {this.state.next === null
                                  ?<> <button className="button-control disabled-button" style={{marginLeft:10}} onClick={this.props.nextPage} disabled><FontAwesomeIcon icon={faArrowRight}/></button></>
                                  : <button className="button-control" style={{marginLeft:10}} onClick={this.props.nextPage}><FontAwesomeIcon icon={faArrowRight}/></button>
                              }
                            </div>
                          </>
                        : <div className="row readable-text">No se han encontrado resultados para {this.state.busqueda}.</div>
                      }
                    </>
                  : <div className="row readable-text">No se han encontrado resultados</div>
                }
              
              <Modal open={this.state.showAddSong} onClose={this.closeModal} showCloseIcon={false} center>
                <div className="custom-modal">
                <div className="row d-flex justify-content-between" style={{paddingLeft:10,paddingRight:10}}><p className="readable-text">Your playlists: </p><FontAwesomeIcon className="visible-icon fa-2x" icon={faTimes} onClick={this.closeModal}/></div>
                  {this.state.playlists
                    ?<>{this.state.playlists.map((item,index)=>(
                        <div className="row d-flex justify-content-between print-modal" key={index} item={item}>
                          <div className="col-lg-9 list-element">{item.name}</div>
                          <button className="col-lg-1 list-element disguised-button d-flex justify-content-center" onClick={() => this.addSongToPlaylist(item)}><FontAwesomeIcon icon={faPlus}/></button>                 
                        </div>
                      ))}
                      <div id="textoError" className="readable-text d-flex justify-content-center"></div></>
                      :<div></div>
                  }
                </div>
              </Modal>
            </div>
          );
        }
      case "playlists":
        return(
          <div className="container content-internal"style={{marginBottom:35,marginTop:5}}>
            <div className="d-flex flex-row-reverse">
              <button className="button-control" onClick={this.addPlaylist}><FontAwesomeIcon icon={faPlus}/></button>
              {this.state.deleting
                ?<><button className="button-control" onClick={() => this.confirmDel(0)}><FontAwesomeIcon icon={faCheck}/></button></>
                :<button className="button-control" onClick={this.selectDel}><FontAwesomeIcon icon={faMinus}/></button>
              }
              
            </div>
            <div className="row print-playlist" style={{marginBottom:35}}>
              <div className="col-lg-6 list-element d-flex justify-content-center">Title</div>
              <div className="col-lg-4 list-element manual-left-border d-flex justify-content-center">Author</div>
            </div>

            {/* ESTA FUNCION LO QUE HACE ES VER SI TENEMOS EN EL ESTADO "showAddPlaylist" Y SI ES ASI
                LO QUE HACE ES IMPRIMIR POR ROWS LOS CAMPOS PARA CREAR UNA PLAYLIST NUEVA
                
                ? ES EL TRUE Y LOS : ES EL FALSE*/}
            {this.state.showAddPlaylist
              ?<> <div className="row the-fine-printing" style={{marginBottom:35}}>
                    <div className="col-lg-1 list-element d-flex justify-content-center"><FontAwesomeIcon className="fa-2x" icon={faList}/></div>
                    <div className="col-lg-5 list-element d-flex justify-content-center">Insert new title:</div>
                    <div className="col-lg-4 list-element manual-left-border d-flex justify-content-center"><input className="form-control" type="search" placeholder="New title" value={this.state.newTitle} onChange={this.getTitle} aria-label="Search"></input></div>
                    <div className="col-lg-2 list-element d-flex justify-content-center" onClick={this.confirmNewPlaylist}>Confirmar</div>
                  </div>
              </>
              : <div></div>
            }
            {this.state.contenido
              ?<>{this.state.contenido.map((item,index)=>(
                <div className="row the-fine-marging" key={index} item={item}> 
                {item.id===this.state.id_edited_playlist
                ? <>
                <div className="col-lg-1 list-element d-flex justify-content-center the-fine-printing-start"><FontAwesomeIcon className="fa-2x" icon={faList}/></div>
                <div className="col-lg-5 list-element d-flex justify-content-center the-fine-printing-middle">Insert new title:</div>
                <div className="col-lg-4 list-element manual-left-border d-flex justify-content-center the-fine-printing-middle"><input className="form-control" type="search" placeholder="New title" value={this.state.newModTitle} onChange={this.getModTitle} aria-label="Search"></input></div>
                <div className="col-lg-2 list-element d-flex justify-content-center the-fine-printing-end" onClick={this.confirmModPlaylist}>Confirmar</div>
              </>
                :<> <div className="col-lg-1 list-element d-flex justify-content-center the-fine-printing-start"  onClick={() => this.props.cambiaModo("playlistContent",item.id)}><FontAwesomeIcon className="fa-2x" icon={faList}/></div>
                  <div className="col-lg-4 list-element d-flex justify-content-center the-fine-printing-middle"  onClick={() => this.props.cambiaModo("playlistContent",item.id)}>{item.name}</div>
                  <div className="col-lg-1 list-element d-flex justify-content-center the-fine-printing-middle"  onClick={() => this.props.editNamePlaylist(item.id)}><FontAwesomeIcon className="fa-2x" icon={faEdit}/></div> 
                  <div className="col-lg-4 manual-left-border list-element d-flex justify-content-center the-fine-printing-end"  onClick={() => this.props.cambiaModo("playlistContent",item.id)}>{this.state.username}</div>
                  {this.state.deleting
                    ?<>{this.state.delList.includes(item.id)
                      ?<><div className="col-lg-2 list-element d-flex justify-content-center no-padding"><button className="disguised-button" onClick={() => this.extractDelList(item.id)}><FontAwesomeIcon className="fa-2x" icon={faTrashRestore}/></button></div>
                      </>
                      :<><div className="col-lg-2 list-element d-flex justify-content-center no-padding"><button className="disguised-button" onClick={() => this.addDelList(item.id)}><FontAwesomeIcon className="fa-2x" icon={faTrash}/></button></div>
                      </>
                      }</>
                    :<><div className="col-lg-2 list-element d-flex justify-content-center no-padding"><button className="disguised-button" onClick={() => this.props.cambiaCancionPlaylist(0,item.id)}><FontAwesomeIcon className="fa-2x" icon={faPlay}/></button></div></>
                  } </>                                           
                }</div>
              ))}</>
              :<div></div>
            }
            
          </div>
        );
      case "playlistContent":
        return(
          <div className="container content-internal"style={{marginBottom:35,marginTop:5}}>
            <div className="row d-flex justify-content-between" >
              <div className="readable-text pointer" onClick={() => this.props.cambiaModo("playlists",1)}><p>Go back</p></div>
              <div className="d-flex flex-row-reverse">
                <button className="button-control" onClick={() => this.props.cambiaCancionPlaylist(0,-1)}><FontAwesomeIcon icon={faPlay}/></button>
                {this.state.deleting
                  ?<><button className="button-control" onClick={() => this.confirmDel(1)}><FontAwesomeIcon icon={faCheck}/></button></>
                  :<button className="button-control" onClick={this.selectDel}><FontAwesomeIcon icon={faMinus}/></button>
                }
                {this.state.currentPL === this.state.loopingPL
                  ?<><button className="button-control toggled-button" onClick={this.props.loopPlaylist}><FontAwesomeIcon icon={faRedoAlt}/></button></>
                  :<button className="button-control" onClick={this.props.loopPlaylist}><FontAwesomeIcon icon={faRedoAlt}/></button>
                }
                <button className="button-control"><DropdownSort type={"playlist"} cambiaOrden={this.props.cambiaOrden}/></button>
                
                {this.state.currentPL === this.state.shuffledPL
                  ?<><button className="button-control toggled-button" onClick={this.props.shufflePlaylist}><FontAwesomeIcon icon={faRandom}/></button></>
                  :<button className="button-control" onClick={this.props.shufflePlaylist}><FontAwesomeIcon icon={faRandom}/></button>
                }
              </div>
            </div>

            <div className="row print-playlist" style={{marginBottom:35}}>
              <div className="col-lg-1 list-element d-flex justify-content-center">Type</div>
              <div className="col-lg-3 list-element manual-left-border d-flex justify-content-center">Title</div>
              <div className="col-lg-2 list-element manual-left-border d-flex justify-content-center">Artist</div>
              <div className="col-lg-1 list-element manual-left-border d-flex justify-content-center">Genre</div>
              <div className="col-lg-3 list-element manual-left-border d-flex justify-content-center">Rating</div>
              <div className="col-lg-2 list-element manual-left-border d-flex justify-content-center">Play</div>
            </div>
            {this.state.contenido.map((item,index)=>(
              <div className="row the-fine-marging" key={index} item={item}>
                <div className="col-lg-1 list-element d-flex justify-content-center the-fine-printing-start"><FontAwesomeIcon className="fa-2x" icon={faMusic}/></div>     
                <div className="col-lg-3 manual-left-border list-element d-flex justify-content-center the-fine-printing-middle">{item.title}</div>
                <div className="col-lg-2 manual-left-border list-element d-flex justify-content-center the-fine-printing-middle">{item.album.artist.name}</div>
                <div className="col-lg-1 manual-left-border list-element d-flex justify-content-center the-fine-printing-middle">{item.genre}</div>
                <div className="col-lg-3 manual-left-border list-element d-flex justify-content-center the-fine-printing-end"><Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" initialRating={item.avg_valoration} readonly/></div> 
                {this.state.deleting
                    ?<>{this.state.delList.includes(item.id)
                      ?<>
                        <div className="col-lg-2 list-element d-flex justify-content-center no-padding"><button className="disguised-button" onClick={() => this.extractDelList(item.id)}><FontAwesomeIcon className="fa-2x" icon={faTrashRestore}/></button></div> 
                      </>
                      :<>
                      <div className="col-lg-2 list-element d-flex justify-content-center no-padding"><button className="disguised-button" onClick={() => this.addDelList(item.id)}><FontAwesomeIcon className="fa-2x" icon={faTrash}/></button></div> 
                      </>
                      }
                    </>
                    :<>
                    <div className="col-lg-2 list-element d-flex justify-content-center no-padding"><button className="disguised-button" onClick={() => this.props.cambiaCancionPlaylist(item,-1)}><FontAwesomeIcon className="fa-2x" icon={faPlay}/></button></div> 
                </>
                }
              </div>
            ))}
          </div>
        );
      case "podcasts":
        return(
          <div className="container content-internal"style={{marginBottom:35,marginTop:5}}>
            <div className="d-flex flex-row-reverse">
              {this.state.deleting
                ?<><button className="button-control" onClick={() => this.confirmDel(3)}><FontAwesomeIcon icon={faCheck}/></button></>
                :<button className="button-control" onClick={this.selectDel}><FontAwesomeIcon icon={faMinus}/></button>
              }
              
            </div>
            <div className="row print-playlist" style={{marginBottom:35}}>
              <div className="col-lg-6 list-element d-flex justify-content-center">Title</div>
              <div className="col-lg-5 list-element manual-left-border d-flex justify-content-center">Author</div>
            </div>
            {this.state.contenido
              ?<>{this.state.contenido.map((item,index)=>(
                <div className="row the-fine-marging" key={index} item={item}> 
                  <div className="col-lg-1 list-element d-flex justify-content-center the-fine-printing-start"  onClick={() => this.props.cambiaModo("podcastContent",item)}><FontAwesomeIcon className="fa-2x" icon={faList}/></div>
                  <div className="col-lg-5 list-element d-flex justify-content-center the-fine-printing-middle"  onClick={() => this.props.cambiaModo("podcastContent",item)}>{item.name}</div>              
                  <div className="col-lg-5 manual-left-border list-element d-flex justify-content-center the-fine-printing-end"  onClick={() => this.props.cambiaModo("podcastContent",item)}>{item.artist.name}</div>
                  {this.state.deleting
                    ?<>{this.state.delList.includes(item.id)
                      ?<><div className="col-lg-1 list-element d-flex justify-content-center no-padding"><button className="disguised-button" onClick={() => this.extractDelList(item.id)}><FontAwesomeIcon className="fa-2x" icon={faTrashRestore}/></button></div>
                      </>
                      :<><div className="col-lg-1 list-element d-flex justify-content-center no-padding"><button className="disguised-button" onClick={() => this.addDelList(item.id)}><FontAwesomeIcon className="fa-2x" icon={faTrash}/></button></div>
                      </>
                      }</>
                    :<><div className="col-lg-1 list-element d-flex justify-content-center no-padding"><button className="disguised-button" onClick={() => this.props.cambiaSourcePodcast(0,item.artist.name,item)}><FontAwesomeIcon className="fa-2x" icon={faPlay}/></button></div></>
                  }                                          
                </div>
              ))}</>
              :<div></div>
            }
            
          </div>
        );
      case "podcastContent":
        return(
          <div className="container content-internal"style={{marginBottom:35,marginTop:5}}>
            <div className="row d-flex justify-content-between" >
              <div className="readable-text pointer" onClick={() => this.props.cambiaModo("podcast",-1)}><p>Go back</p></div>
              <div className="d-flex flex-row-reverse">
                <button className="button-control" onClick={() => this.props.cambiaSourcePodcast(0,undefined,-1)}><FontAwesomeIcon icon={faPlay}/></button>
                {this.state.currentPL === this.state.loopingPL
                  ?<><button className="button-control toggled-button" onClick={this.props.loopPlaylist}><FontAwesomeIcon icon={faRedoAlt}/></button></>
                  :<button className="button-control" onClick={this.props.loopPlaylist}><FontAwesomeIcon icon={faRedoAlt}/></button>
                }
                <button className="button-control"><DropdownSort type={"podcast"} cambiaOrden={this.props.cambiaOrden}/></button>
                
                {this.state.currentPL === this.state.shuffledPL
                  ?<><button className="button-control toggled-button" onClick={this.props.shufflePlaylist}><FontAwesomeIcon icon={faRandom}/></button></>
                  :<button className="button-control" onClick={this.props.shufflePlaylist}><FontAwesomeIcon icon={faRandom}/></button>
                }
              </div>
            </div>

            <div className="row print-playlist" style={{marginBottom:35}}>
              <div className="col-lg-1 list-element d-flex justify-content-center">Type</div>
              <div className="col-lg-3 list-element manual-left-border d-flex justify-content-center">Title</div>
              <div className="col-lg-2 list-element manual-left-border d-flex justify-content-center">Artist</div>
              <div className="col-lg-1 list-element manual-left-border d-flex justify-content-center">Genre</div>
              <div className="col-lg-3 list-element manual-left-border d-flex justify-content-center">Rating</div>
              <div className="col-lg-2 list-element manual-left-border d-flex justify-content-center">Play</div>
            </div>
            {this.state.contenido.map((item,index)=>(
              <div className="row the-fine-marging" key={index} item={item}>
                <div className="col-lg-1 list-element d-flex justify-content-center the-fine-printing-start"><FontAwesomeIcon className="fa-2x" icon={faMicrophone}/></div>     
                <div className="col-lg-3 manual-left-border list-element d-flex justify-content-center the-fine-printing-middle">{item.title}</div>
                <div className="col-lg-2 manual-left-border list-element d-flex justify-content-center the-fine-printing-middle">{this.props.podcastAuthor}</div>
                <div className="col-lg-1 manual-left-border list-element d-flex justify-content-center the-fine-printing-middle">{item.genre}</div>
                <div className="col-lg-3 manual-left-border list-element d-flex justify-content-center the-fine-printing-end"><Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" initialRating={item.avg_valoration} readonly/></div> 
                <div className="col-lg-2 list-element d-flex justify-content-center no-padding"><button className="disguised-button" onClick={() => this.props.cambiaSourcePodcast(item,undefined,-1)}><FontAwesomeIcon className="fa-2x" icon={faPlay}/></button></div> 
              </div>
            ))}
          </div>
        );
      case "friends":
          return(
            <div className="container content-internal"style={{marginBottom:35,marginTop:5}}>
              <div className="row d-flex justify-content-between" >
              <input className="innerSearch" type="search" placeholder="Search" value={this.props.innerBusqueda} onChange={this.props.getInnerSearch} aria-label="Search"></input>
              <div className="d-flex flex-row-reverse">
                {this.state.deleting
                  ?<><button className="button-control" onClick={() => this.confirmDel(2)}><FontAwesomeIcon icon={faCheck}/></button></>
                  :<button className="button-control" onClick={this.selectDel}><FontAwesomeIcon icon={faMinus}/></button>
                }
                </div>
              </div>

              <div className="row print-playlist" style={{marginBottom:35}}>
                <div className="col-lg-1 list-element d-flex justify-content-center"></div>
                <div className="col-lg-10 list-element d-flex justify-content-center">Username</div>
                <div className="col-lg-1 list-element d-flex justify-content-center"></div>
              </div>

              {this.props.innerBusqueda
              ?
              <>
                {this.state.contenido[0]
                ?<>{this.state.contenido.map((item,index)=>(
                  <div key={index} item={item}> 
                  {item.username.indexOf(this.props.innerBusqueda)>-1
                  ?<>
                  <div className="row the-fine-marging" >
                  <div className="col-lg-1 list-element d-flex justify-content-center the-fine-printing-start"  onClick={() => this.props.cambiaModo("friendPlaylist",item.id)}><FontAwesomeIcon className="fa-2x" icon={faUser}/></div>
                  {this.state.deleting
                    ?<>{this.state.delList.includes(item.id)
                      ?<>
                      <div className="col-lg-10 list-element d-flex justify-content-center the-fine-printing-end"  onClick={() => this.props.cambiaModo("friendPlaylist",item.id)}>{item.username}</div>
                      <div className="col-lg-1 list-element d-flex justify-content-center no-padding"><button className="disguised-button" onClick={() => this.extractDelList(item.id)}><FontAwesomeIcon className="fa-2x" icon={faTrashRestore}/></button></div>
                      </>
                      :<>
                      <div className="col-lg-10 list-element d-flex justify-content-center the-fine-printing-end"  onClick={() => this.props.cambiaModo("friendPlaylist",item.id)}>{item.username}</div>
                      <div className="col-lg-1 list-element d-flex justify-content-center no-padding"><button className="disguised-button" onClick={() => this.addDelList(item.id)}><FontAwesomeIcon className="fa-2x" icon={faTrash}/></button></div>
                      </>
                      }</>
                    :<>
                    <div className="col-lg-10 list-element d-flex justify-content-center the-fine-printing-middle"  onClick={() => this.props.cambiaModo("friendPlaylist",item.id)}>{item.username}</div>
                    <div className="col-lg-1 list-element d-flex justify-content-center the-fine-printing-end"  onClick={() => this.props.cambiaModo("friendPlaylist",item.id)}></div>
                    </>
                  }
                  </div>
                  
                  </>
                  :<><div></div></>
                  }
                  </div>
                ))}</>
                :<div className="readable-text">You have no friends :(</div>
              }
              </>
              :
              <>
                {this.state.contenido[0]
                ?<>{this.state.contenido.map((item,index)=>(
                  <div className="row the-fine-marging" key={index} item={item}> 
                  <div className="col-lg-1 list-element d-flex justify-content-center the-fine-printing-start"  onClick={() => this.props.cambiaModo("friendPlaylist",item.id)}><FontAwesomeIcon className="fa-2x" icon={faUser}/></div>
                  {this.state.deleting
                    ?<>{this.state.delList.includes(item.id)
                      ?<>
                      <div className="col-lg-10 list-element d-flex justify-content-center the-fine-printing-end"  onClick={() => this.props.cambiaModo("friendPlaylist",item.id)}>{item.username}</div>
                      <div className="col-lg-1 list-element d-flex justify-content-center no-padding"><button className="disguised-button" onClick={() => this.extractDelList(item.id)}><FontAwesomeIcon className="fa-2x" icon={faTrashRestore}/></button></div>
                      </>
                      :<>
                      <div className="col-lg-10 list-element d-flex justify-content-center the-fine-printing-end"  onClick={() => this.props.cambiaModo("friendPlaylist",item.id)}>{item.username}</div>
                      <div className="col-lg-1 list-element d-flex justify-content-center no-padding"><button className="disguised-button" onClick={() => this.addDelList(item.id)}><FontAwesomeIcon className="fa-2x" icon={faTrash}/></button></div>
                      </>
                      }</>
                    :<>
                    <div className="col-lg-10 list-element d-flex justify-content-center the-fine-printing-middle"  onClick={() => this.props.cambiaModo("friendPlaylist",item.id)}>{item.username}</div>
                    <div className="col-lg-1 list-element d-flex justify-content-center the-fine-printing-end"  onClick={() => this.props.cambiaModo("friendPlaylist",item.id)}></div>
                    </>
                  }
                  </div>
                ))}</>
                :<div className="readable-text">You have no friends :(</div>
              }
              </>
              }
            </div>
          );
      case "friendPlaylists":
        return(
          <div className="container content-internal"style={{marginBottom:35,marginTop:5}}>
            <div className="d-flex">              
            <div className="readable-text pointer" onClick={() => this.props.cambiaModo("friends",1)}><p>Go back</p></div>
            </div>
            <div className="row print-playlist" style={{marginBottom:35}}>
              <div className="col-lg-6 list-element d-flex justify-content-center">Title</div>
              <div className="col-lg-6 list-element manual-left-border d-flex justify-content-center">Author</div>
            </div>
            {this.state.contenido
              ?<>{this.state.contenido.map((item,index)=>(
                <div className="row the-fine-marging" key={index} item={item}> 
                <div className="col-lg-1 list-element d-flex justify-content-center the-fine-printing-start"  onClick={() => this.props.cambiaModo("friendPlaylistContent",item.id)}><FontAwesomeIcon className="fa-2x" icon={faList}/></div>
                <div className="col-lg-5 list-element d-flex justify-content-center the-fine-printing-middle"  onClick={() => this.props.cambiaModo("friendPlaylistContent",item.id)}>{item.name}</div>
                <div className="col-lg-4 manual-left-border list-element d-flex justify-content-center the-fine-printing-end"  onClick={() => this.props.cambiaModo("friendPlaylistContent",item.id)}>{this.props.friendName}</div>
                <div className="col-lg-2 list-element d-flex justify-content-center no-padding"><button className="disguised-button" onClick={() => this.props.cambiaCancionPlaylist(0,item.id)}><FontAwesomeIcon className="fa-2x" icon={faPlay}/></button></div>
                </div>
              ))}</>
              :<div></div>
            }
            
          </div>
        );
      case "friendPlaylistContent":
        return(
          <div className="container content-internal"style={{marginBottom:35,marginTop:5}}>
            <div className="row d-flex justify-content-between" >
              <div className="readable-text pointer" onClick={() => this.props.cambiaModo("friendPlaylist",this.state.friend)}><p>Go back</p></div>
              <div className="d-flex flex-row-reverse">
                <button className="button-control" onClick={() => this.props.cambiaCancionPlaylist(0,-1)}><FontAwesomeIcon icon={faPlay}/></button>
                {this.state.currentPL === this.state.loopingPL
                  ?<><button className="button-control toggled-button" onClick={this.props.loopPlaylist}><FontAwesomeIcon icon={faRedoAlt}/></button></>
                  :<button className="button-control" onClick={this.props.loopPlaylist}><FontAwesomeIcon icon={faRedoAlt}/></button>
                }
                <button className="button-control"><DropdownSort type={"playlist"} cambiaOrden={this.props.cambiaOrden}/></button>
                
                {this.state.currentPL === this.state.shuffledPL
                  ?<><button className="button-control toggled-button" onClick={this.props.shufflePlaylist}><FontAwesomeIcon icon={faRandom}/></button></>
                  :<button className="button-control" onClick={this.props.shufflePlaylist}><FontAwesomeIcon icon={faRandom}/></button>
                }
              </div>
            </div>

            <div className="row print-playlist" style={{marginBottom:35}}>
              <div className="col-lg-1 list-element d-flex justify-content-center">Type</div>
              <div className="col-lg-3 list-element manual-left-border d-flex justify-content-center">Title</div>
              <div className="col-lg-2 list-element manual-left-border d-flex justify-content-center">Artist</div>
              <div className="col-lg-1 list-element manual-left-border d-flex justify-content-center">Genre</div>
              <div className="col-lg-3 list-element manual-left-border d-flex justify-content-center">Rating</div>
              <div className="col-lg-2 list-element manual-left-border d-flex justify-content-center">Play</div>
            </div>
            {this.state.contenido.map((item,index)=>(
              <div className="row the-fine-marging" key={index} item={item}>
                <div className="col-lg-1 list-element d-flex justify-content-center the-fine-printing-start"><FontAwesomeIcon className="fa-2x" icon={faMusic}/></div>           
                <div className="col-lg-3 manual-left-border list-element d-flex justify-content-center the-fine-printing-middle">{item.title}</div>
                <div className="col-lg-2 manual-left-border list-element d-flex justify-content-center the-fine-printing-middle">{item.album.artist.name}</div>
                <div className="col-lg-1 manual-left-border list-element d-flex justify-content-center the-fine-printing-middle">{item.genre}</div>
                <div className="col-lg-3 manual-left-border list-element d-flex justify-content-center the-fine-printing-end"><Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" initialRating={item.avg_valoration} readonly/></div> 
                <div className="col-lg-2 list-element d-flex justify-content-center no-padding"><button className="disguised-button" onClick={() => this.props.cambiaCancionPlaylist(item,-1)}><FontAwesomeIcon className="fa-2x" icon={faPlay}/></button></div> 
              </div>
            ))}
          </div>
        );
      case "settings":
          return(
            <div className="container content-internal">

              {/* Fila con el icono y el nombre */}
              <div class="row mt-4 mb-4">

                  <div class="display-block float-left stop-button">
                    <FontAwesomeIcon className="fa-4x" icon={faUserCircle}/>
                  </div>

                  <p class="ml-3 h2 display-block float-left readable-text">Hello {this.state.username}</p>

              </div>

              {/* Fila para username */}
              <div className="row mt-2 mb-2">
                  {this.state.usernameChange ? (<>
                    <p className="col-sm-3 text-center readable-text">Username:</p>
                    <input id="usernameInput" className="col-sm-5 text-center" type="text" placeholder={this.state.username} />
                    <button className="ml-2 display-block float-left button-control" onClick={this.fijarUsername}><FontAwesomeIcon className="fa-2x" icon={faCheck}/></button>
                    <button className="ml-2 display-block float-left button-control" onClick={this.fijarUsername}><FontAwesomeIcon className="fa-2x" icon={faTimes}/></button>
                  </>) : (<>
                    <p className="col-sm-3 text-center  readable-text">Username:</p>
                    <input id="usernameInput" className="col-sm-5 text-center" type="text" value={this.state.username} readonly disabled />
                    <button className="ml-2 display-block float-left button-control" onClick={this.cambiarUsername}><FontAwesomeIcon className="fa-2x" icon={faEdit}/></button>
                  </>)}
              </div>

              {/* Fila para email */}
              <div className="row mt-2 mb-2">
                  {this.state.emailChange ? (<>
                    <p className="col-sm-3 text-center  readable-text">Email:</p>
                    <input id="emailInput" className="col-sm-5 text-center" type="text" placeholder={this.state.useremail} />
                    <button className="ml-2 display-block float-left button-control" onClick={this.fijarEmail}><FontAwesomeIcon className="fa-2x" icon={faCheck}/></button>
                    <button className="ml-2 display-block float-left button-control" onClick={this.fijarEmail}><FontAwesomeIcon className="fa-2x" icon={faTimes}/></button>
                  </>) : (<>
                    <p className="col-sm-3 text-center  readable-text">Email:</p>
                    <input id="emailInput" className="col-sm-5 text-center" type="text" value={this.state.useremail} readonly disabled />
                    <button className="ml-2 display-block float-left button-control" onClick={this.cambiarEmail}><FontAwesomeIcon className="fa-2x" icon={faEdit}/></button>
                  </>)}
              </div>

              {/* Fila(s) para password */}
                {this.state.passwordChange ? (<>
                  <div className="row mt-2 mb-2">
                    <p className="col-sm-3 text-center  readable-text">Password:</p>
                    <input id="passwordInput" className="col-sm-5 text-center" type="password" placeholder="password" />
                  </div>
                  <div className="row mt-2 mb-2">
                    <div className="col-sm-3">{/* empty */}</div>
                    <input id="passwordInput1" className="col-sm-5 text-center" type="password" placeholder="rewrite new password" />
                    <button className="ml-2 display-block float-left button-control" onClick={this.fijarPassword}><FontAwesomeIcon className="fa-2x" icon={faCheck}/></button>
                    <button className="ml-2 display-block float-left button-control" onClick={this.fijarPassword}><FontAwesomeIcon className="fa-2x" icon={faTimes}/></button>
                  </div>
                </>) : (<>
                  <div className="row mt-2 mb-2">
                    <p className="col-sm-3 text-center  readable-text">Password:</p>
                    <input className="col-sm-5 text-center" type="password" value="password" readonly disabled />
                    <button className="ml-2 display-block float-left button-control" onClick={this.cambiarPassword}><FontAwesomeIcon className="fa-2x" icon={faEdit}/></button>
                  </div>
                </>)}

              {/* Fila de borrado de cuenta */}
              <div class="row mt-5 mb-2">
                <button class="btn btn-danger col-6 display-block float-left" onclick={this.borrarCuenta}>Delete my account</button>
              </div>

            </div>
          );
      default:
        return(
          <div className="d-flex justify-content-center readable-text">ERROR</div>
        );
    }
  }

}
export default Content;
