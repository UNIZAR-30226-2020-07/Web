import React, {Component} from 'react';
import Rating from 'react-rating';
import 'font-awesome/css/font-awesome.min.css';
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faTrashRestore } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './content.css';
import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';


class Content extends Component {
  constructor(props){
    super(props);
    this.state = {
      key:this.props.token,
      contenido: '',
      playlists:this.props.playlists, //Se necesitan tener separadas para su uso en búsquedas
      tipo: this.props.tipo,
      cantidad: '0',
      show: '0',
      busqueda: '',
      next: this.props.hayNext,
      previous: this.props.hayPrev,

      username:this.props.user,
      showAddPlaylist:'',
      newTitle:'',
      deleting:'',
      delList:[],

      showAddSong: false,
      songToAdd:'',

    };
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.change){
      this.setState({
        contenido: nextProps.lista,
        playlists:nextProps.playlists,
        cantidad: nextProps.cantidad,
        tipo: nextProps.tipo,
        username: nextProps.user,
        show: '1',
        busqueda: nextProps.busqueda,
        next: nextProps.hayNext,
        previous: nextProps.hayPrev,
      })
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
  }

  addPlaylist = () =>{
    this.setState({
      showAddPlaylist:'0',
    });
  }

  selectDelPlaylist = () =>{
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

  confirmDelPlaylist = () =>{
    this.props.deletePlaylist(this.state.delList);
    this.setState({
      deleting:'',
      delList:[],
    });
  }

  confirmDelSongs = () =>{
    this.props.deleteSongs(this.state.delList);
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

  confirmNewPlaylist = () =>{
    if(this.state.newTitle){
      this.props.createPlaylist(this.state.newTitle);
      this.setState({
        showAddPlaylist:'',
        newTitle:'',
      });
    }
  }

    
  render() {//Para otras opciones utilizar un switch antes del render o será un caos
    switch(this.state.tipo){
      case "search":
        return (
          <div className="container content-internal"style={{marginBottom:35,marginTop:5}}>
              {this.state.show === '1'
                ? <>{this.state.cantidad > '0'
                      ? <><div className="d-flex justify-content-center readable-text">Results for search "{this.state.busqueda}"</div>
                          <div className="row the-fine-printing" style={{marginBottom:35}}>
                              <div className="col-lg-2 list-element d-flex justify-content-center">Type</div>
                              <div className="col-lg-2 list-element manual-left-border d-flex justify-content-center">Title</div>
                              <div className="col-lg-2 list-element manual-left-border d-flex justify-content-center">Artist</div>
                              <div className="col-lg-1 list-element manual-left-border d-flex justify-content-center">Genre</div>
                              <div className="col-lg-3 list-element manual-left-border d-flex justify-content-center">Rating</div>
                              <div className="col-lg-1 list-element manual-left-border d-flex justify-content-center">Add</div>
                              <div className="col-lg-1 list-element manual-left-border d-flex justify-content-center">Play</div>
                            </div>
                          {this.state.contenido.map((item,index)=>(
                            <div className="row the-fine-printing" key={index} item={item}>
                              {item.episode
                                ?<><div className="col-lg-2 list-element d-flex justify-content-center">Podcast</div></>
                                :<div className="col-lg-2 list-element d-flex justify-content-center">Song</div>
                              }
                              
                              <div className="col-lg-2 manual-left-border list-element d-flex justify-content-center">{item.title}</div>
                              <div className="col-lg-2 manual-left-border list-element d-flex justify-content-center">{item.album.artist.name}</div>
                              <div className="col-lg-1 manual-left-border list-element d-flex justify-content-center">{item.genre}</div>
                              <div className="col-lg-3 manual-left-border list-element d-flex justify-content-center"><Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" initialRating={item.avg_valoration} readonly/></div>
                              <div className="col-lg-1 list-element disguised-button d-flex justify-content-center" onClick={() => this.openModal(item.id)}><FontAwesomeIcon icon={faPlus}/></div>
                              <div className="col-lg-1 list-element disguised-button d-flex justify-content-center" onClick={() => this.props.cambiaCancion(item)}><FontAwesomeIcon icon={faPlay}/></div>
                            </div>
                          ))}
                          <div className="d-flex justify-content-center">
                            {this.state.previous === null
                                ?<><button style={{marginRight:10}} onClick={this.props.prevPage} disabled><FontAwesomeIcon icon={faArrowLeft}/></button></>
                                :<button style={{marginRight:10}} onClick={this.props.prevPage}><FontAwesomeIcon icon={faArrowLeft}/></button>
                            }
                            
                            {this.state.next === null
                                ?<> <button style={{marginLeft:10}} onClick={this.props.nextPage} disabled><FontAwesomeIcon icon={faArrowRight}/></button></>
                                : <button style={{marginLeft:10}} onClick={this.props.nextPage}><FontAwesomeIcon icon={faArrowRight}/></button>
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
              <p className="readable-text">Your playlists: </p>
                {this.state.playlists
                  ?<>{this.state.playlists.map((item,index)=>(
                      <div className="row d-flex justify-content-between print-modal" key={index} item={item}>
                        <div className="col-lg-9 list-element">{item.name}</div>
                        <div className="col-lg-1 list-element disguised-button d-flex justify-content-center" onClick={() => this.addSongToPlaylist(item)}><FontAwesomeIcon icon={faPlus}/></div>                 
                      </div>
                    ))}</>
                    :<div></div>
                }
              </div>
            </Modal>
          </div>
        );

      case "playlists":
        return(
          <div className="container content-internal"style={{marginBottom:35,marginTop:5}}>
            <div className="d-flex flex-row-reverse">
              <button onClick={this.addPlaylist}><FontAwesomeIcon icon={faPlus}/></button>
              {this.state.deleting
                ?<><button onClick={this.confirmDelPlaylist}><FontAwesomeIcon icon={faCheck}/></button></>
                :<button onClick={this.selectDelPlaylist}><FontAwesomeIcon icon={faMinus}/></button>
              }
              
            </div>
            <div className="row print-playlist" style={{marginBottom:35}}>
              <div className="col-lg-6 list-element d-flex justify-content-center">Title</div>
              <div className="col-lg-6 list-element manual-left-border d-flex justify-content-center">Author</div>
            </div>
            {this.state.showAddPlaylist
              ?<> <div className="row print-playlist" style={{marginBottom:35}}>
                    <div className="col-lg-1 list-element d-flex justify-content-center">Playlist</div>
                    <div className="col-lg-5 list-element d-flex justify-content-center">Insert new title:</div>
                    <div className="col-lg-4 list-element manual-left-border d-flex justify-content-center"><input className="form-control" type="search" placeholder="New title" value={this.state.newTitle} onChange={this.getTitle} aria-label="Search"></input></div>
                    <div className="col-lg-2 list-element d-flex justify-content-center" onClick={this.confirmNewPlaylist}>Confirmar</div>
                  </div>
              </>
              : <div></div>
            }
            {this.state.contenido
              ?<>{this.state.contenido.map((item,index)=>(
                <div className="row the-fine-printing" key={index} item={item}>                              
                  <div className="col-lg-1 list-element d-flex justify-content-center"  onClick={() => this.props.cambiaModo("playlistContent",item.id)}>Icono</div>
                  <div className="col-lg-5 list-element d-flex justify-content-center"  onClick={() => this.props.cambiaModo("playlistContent",item.id)}>{item.name}</div>
                  <div className="col-lg-4 manual-left-border list-element d-flex justify-content-center"  onClick={() => this.props.cambiaModo("playlistContent",item.id)}>{this.state.username}</div>
                  {this.state.deleting
                    ?<>{this.state.delList.includes(item.id)
                      ?<>
                        <div className="col-lg-1 list-element d-flex justify-content-center"></div>
                        <div className="col-lg-1 list-element disguised-button d-flex justify-content-center" onClick={() => this.extractDelList(item.id)}><FontAwesomeIcon icon={faTrashRestore}/></div>
                      </>
                      :<>
                       <div className="col-lg-1 list-element d-flex justify-content-center"></div>
                       <div className="col-lg-1 list-element disguised-button d-flex justify-content-center" onClick={() => this.addDelList(item.id)}><FontAwesomeIcon icon={faTrash}/></div>
                      </>
                      }
                    </>
                    :<><div className="col-lg-1 list-element disguised-button d-flex justify-content-center"><FontAwesomeIcon icon={faRedoAlt}/></div>
                      <div className="col-lg-1 list-element disguised-button d-flex justify-content-center" ><FontAwesomeIcon icon={faPlay}/></div></>
                  }
                  
                </div>
              ))}</>
              :<div></div>
            }
            
          </div>
        );
      case "playlistContent":
        return(
          <div className="container content-internal"style={{marginBottom:35,marginTop:5}}>
            <div className="row d-flex justify-content-between" >
              <div className="readable-text" onClick={() => this.props.cambiaModo("playlists",1)}>Go back</div>
              <div className="d-flex flex-row-reverse">
                {this.state.deleting
                  ?<><button onClick={this.confirmDelSongs}><FontAwesomeIcon icon={faCheck}/></button></>
                  :<button onClick={this.selectDelPlaylist}><FontAwesomeIcon icon={faMinus}/></button>
                }
              </div>
            </div>

            <div className="row print-playlist" style={{marginBottom:35}}>
              <div className="col-lg-2 list-element d-flex justify-content-center">Type</div>
              <div className="col-lg-2 list-element manual-left-border d-flex justify-content-center">Title</div>
              <div className="col-lg-2 list-element manual-left-border d-flex justify-content-center">Artist</div>
              <div className="col-lg-1 list-element manual-left-border d-flex justify-content-center">Genre</div>
              <div className="col-lg-3 list-element manual-left-border d-flex justify-content-center">Rating</div>
              <div className="col-lg-1 list-element manual-left-border d-flex justify-content-center">Sort</div>
              <div className="col-lg-1 list-element manual-left-border d-flex justify-content-center">Play</div>
            </div>
            {this.state.contenido.map((item,index)=>(
              <div className="row the-fine-printing" key={index} item={item}>
                {item.episode
                  ?<><div className="col-lg-2 list-element d-flex justify-content-center">Podcast</div></>
                  :<div className="col-lg-2 list-element d-flex justify-content-center">Song</div>
                }           
                <div className="col-lg-2 manual-left-border list-element d-flex justify-content-center">{item.title}</div>
                <div className="col-lg-2 manual-left-border list-element d-flex justify-content-center">{item.album.artist.name}</div>
                <div className="col-lg-1 manual-left-border list-element d-flex justify-content-center">{item.genre}</div>
                <div className="col-lg-3 manual-left-border list-element d-flex justify-content-center"><Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" initialRating={item.avg_valoration} readonly/></div> 
                {this.state.deleting
                    ?<>{this.state.delList.includes(item.id)
                      ?<>
                        <div className="col-lg-1 list-element d-flex justify-content-center"></div>
                        <div className="col-lg-1 list-element disguised-button d-flex justify-content-center" onClick={() => this.extractDelList(item.id)}><FontAwesomeIcon icon={faTrashRestore}/></div>
                      </>
                      :<>
                       <div className="col-lg-1 list-element d-flex justify-content-center"></div>
                       <div className="col-lg-1 list-element disguised-button d-flex justify-content-center" onClick={() => this.addDelList(item.id)}><FontAwesomeIcon icon={faTrash}/></div>
                      </>
                      }
                    </>
                    :<><div className="col-lg-1 list-element disguised-button d-flex justify-content-center"><FontAwesomeIcon icon={faSort}/></div>
                <div className="col-lg-1 list-element disguised-button d-flex justify-content-center" onClick={() => this.props.cambiaCancion(item)}><FontAwesomeIcon icon={faPlay}/></div>
                </>
                }
              </div>
            ))}
          </div>
        );
      case "podcasts":
        return(
          <div className="d-flex justify-content-center readable-text"><p>Podcast</p></div>
        );
      case "podcastContent":
        return(
          <div className="d-flex justify-content-center readable-text">PodcastContent</div>
        );
        case "friends":
          return(
            <div className="d-flex justify-content-center readable-text">Friends</div>
        );
      case "settings":
          return(
            <div className="d-flex justify-content-center readable-text">Settings</div>
          );
      default:
        return(
          <div className="d-flex justify-content-center readable-text">ERROR</div>
        );
    }
  }

}
export default Content;
