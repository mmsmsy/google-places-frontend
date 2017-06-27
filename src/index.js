import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import App from './App';
import PlacesApp from './Components/PlacesApp';
import registerServiceWorker from './registerServiceWorker';
import './Styles/index.css';

ReactDOM.render(
  <HashRouter>
    <div>
      <Route path='/' component={App} />
      <Route exact path='/' component={PlacesApp} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
registerServiceWorker();
