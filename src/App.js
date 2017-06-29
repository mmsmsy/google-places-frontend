import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './Styles/App.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Link to='/'><img src={logo} className="App-logo" alt="logo" /></Link>
        <p>mmsmsy, google-places-api-application, june 2017, public</p>
      </div>
    </div>
  );
}

export default App;
