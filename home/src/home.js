import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import ReactDOM from 'react-dom';
import './home.css';
import NavBar from './App';
import * as serviceWorker from './serviceWorker';


const Player = () => (
    <AudioPlayer
      autoPlay
      src="https://docs.google.com/uc?export=download&id=1MMJ1YWAxcs-7pVszRCZLGn9-SFReXqsD"
      onPlay={e => console.log("onPlay")}
      // other props here
    />
  );

ReactDOM.render(<NavBar />,document.getElementById('root'));
ReactDOM.render(<Player />,document.getElementById('root2'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
