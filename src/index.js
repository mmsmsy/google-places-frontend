import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import App from './App';
import PlacesList from './Components/PlacesList';
import registerServiceWorker from './registerServiceWorker';
import './Styles/index.css';

ReactDOM.render(
  <HashRouter>
    <div>
      <Route path='/' component={App} />
      <Route exact path='/' component={PlacesList} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
registerServiceWorker();
