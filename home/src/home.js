import React from 'react';
import ReactDOM from 'react-dom';
import './home.css';
import NavBar from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<NavBar />,document.getElementById('root')
);
ReactDOM.render(<NavBar />,document.getElementById('root2')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
