import React, {Component} from 'react';
import './dropdown.css';


class Dropdown extends Component {
  constructor(props){
    super(props);
    this.state = {
      displayMenu: false,
      title: this.props.title
    };
    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  };
    
  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.hideDropdownMenu);
    });
  }
    
  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });
  }

  cambiaTitle = (TituloNuevo) => {
    this.setState({
      title:TituloNuevo
    });
  }
    
  render() {
    return (
      <div className="dropdown">
        <div className="custom-button" onClick={this.showDropdownMenu}>{this.state.title}</div>
        {this.state.displayMenu ? (
          <ul className="custom-ul ">
            <li className="readable-text">----Music----</li>
            <li className="readable-text custom-li" onClick={() => {this.props.cambiaTipo(0);this.cambiaTitle("Songs")}}>Songs</li>
            <li className="readable-text custom-li" onClick={() => {this.props.cambiaTipo(1);this.cambiaTitle("Artists")}}>Artists</li>
            <li className="readable-text custom-li" onClick={() => {this.props.cambiaTipo(2);this.cambiaTitle("Categories")}}>Categories</li>
            <li className="readable-text custom-li" onClick={() => {this.props.cambiaTipo(3);this.cambiaTitle("Albums")}}>Albums</li>
            <li className="readable-text">---Podcasts--</li>
            <li className="readable-text custom-li" onClick={() => {this.props.cambiaTipo(4);this.cambiaTitle("Podcasts")}}>Podcasts</li>
            <li className="readable-text">---Friends---</li>
            <li className="readable-text custom-li" onClick={() => {this.props.cambiaTipo(5);this.cambiaTitle("Usernames")}}>Usernames</li>
            </ul>
          ): (null)
        }
      </div>
    );
  }
}
    
export default Dropdown;