import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import App from './App';
import PlacesApp from './Components/PlacesApp';
import PlaceDetails from './Components/PlaceDetails';
import registerServiceWorker from './registerServiceWorker';
import './Styles/index.css';

ReactDOM.render(
  <HashRouter>
    <div>
      <Route path='/' component={App} />
      <Route exact path='/' component={PlacesApp} />
      <Route path='/placedetails/:id' component={PlaceDetails} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
registerServiceWorker();
