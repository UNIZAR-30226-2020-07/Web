import React, {Component} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlphaDown } from "@fortawesome/free-solid-svg-icons";
import './dropdownSort.css';


class DropdownSort extends Component {
  constructor(props){
    super(props);
    this.state = {
      displayMenu: false,
      title: this.props.title,
      type:this.props.type,
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

    
  render() {
    switch(this.state.type){
      case "playlist":
        return (
          <button className="button-control" onClick={this.showDropdownMenu}>
            <FontAwesomeIcon icon={faSortAlphaDown}/>
            {this.state.displayMenu ? (
              <ul className="custom-ul-sort margin-list-top">
                <li className="readable-text custom-li" onClick={() => {this.props.cambiaOrden(0);}}>Title</li>
                <li className="readable-text custom-li" onClick={() => {this.props.cambiaOrden(1);}}>Artist</li>
                <li className="readable-text custom-li" onClick={() => {this.props.cambiaOrden(2);}}>Genre</li>
                </ul>
              ): (null)
            }
          </button>
        );
      case "podcast":
        return (
          <button className="button-control" onClick={this.showDropdownMenu}>
            <FontAwesomeIcon icon={faSortAlphaDown}/>
            {this.state.displayMenu ? (
              <ul className="custom-ul-sort margin-list-top">
                <li className="readable-text custom-li" onClick={() => {this.props.cambiaOrden(0);}}>Title</li>
                <li className="readable-text custom-li" onClick={() => {this.props.cambiaOrden(3);}}>Upload time</li>
                </ul>
              ): (null)
            }
          </button>
        );
      default:
        break;
    }
    
  }
}
    
export default DropdownSort;