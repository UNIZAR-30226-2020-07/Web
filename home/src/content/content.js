import React, {Component} from 'react';
import './content.css';


class Content extends Component {
  constructor(props){
    super(props);
    this.state = {
      contenido: '',
      tipo: this.props.tipo,
      show: '0',
    };
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.change){
      this.setState({
        contenido: nextProps.lista,
        tipo: nextProps.tipo,
        show: '1',
      })
    }
  }

    
  render() {
    return (
      <div className="container content-internal">
          {this.state.show === '1'
            ? <>
                {this.state.contenido.map((item,index)=>(
                <div className="row the-fine-printing" key={index} item={item}>
                  <div className="col-2 list-element">imagen</div>
                  <div className="col-2 list-element">{item.title}</div>
                  <div className="col-2 list-element">{item.album.artist.name}</div>
                  <div className="col-2 list-element">{item.genre}</div>
                  <div className="col-2 list-element">{item.avg_valoration}</div>
                  <div className="col-1 list-element disguised-button">boton</div>
                  <div className="col-1 list-element disguised-button" onClick={() => this.props.cambiaCancion(item)}>boton</div>
                </div>
                ))}
              </>
            : <div className="readable-text">Search</div>
          }
      </div>
    );
  }
}
    
export default Content;