import React, {Component} from 'react';
import Rating from 'react-rating';
import 'font-awesome/css/font-awesome.min.css';
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './content.css';


class Content extends Component {
  constructor(props){
    super(props);
    this.state = {
      contenido: '',
      tipo: this.props.tipo,
      cantidad: '0',
      show: '0',
      busqueda: '',
      next: this.props.hayNext,
      previous: this.props.hayPrev,

      showAddPlaylist:'',
      newTitle:'',


    };
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.change){
      this.setState({
        contenido: nextProps.lista,
        cantidad: nextProps.cantidad,
        tipo: nextProps.tipo,
        show: '1',
        busqueda: nextProps.busqueda,
        next: nextProps.hayNext,
        previous: nextProps.hayPrev,
      })
    }
  }

  addPlaylist = () =>{
    this.setState({
      showAddPlaylist:'0',
    });
  }

  getTitle = (string) =>{
    this.setState({
      newTitle: string.target.value,
    });
  }

  confirmNewPlaylist = () =>{
    if(this.state.newTitle){
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
                              <div className="col-lg-1 list-element disguised-button d-flex justify-content-center"><FontAwesomeIcon icon={faPlus}/></div>
                              <div className="col-lg-1 list-element disguised-button d-flex justify-content-center"  onClick={() => this.props.cambiaCancion(item)}><FontAwesomeIcon icon={faPlay}/></div>
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
          </div>
        );

      case "playlists":
        return(
          <div className="container content-internal"style={{marginBottom:35,marginTop:5}}>
            <div className="d-flex flex-row-reverse">
              <button onClick={this.addPlaylist}><FontAwesomeIcon icon={faPlus}/></button>
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
          </div>
        );
      case "playlistContent":
        return(
          <div className="d-flex justify-content-center readable-text">playlistContent</div>
        );
      case "podcasts":
        return(
          <div className="d-flex justify-content-center readable-text">Podcast</div>
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
            <div className="d-flex justify-content-center readable-text">Friends</div>
          );
      default:
        return(
          <div className="d-flex justify-content-center readable-text">ERROR</div>
        );
    }
    
  }
}
    
export default Content;