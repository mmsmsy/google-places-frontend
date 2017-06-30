## Google Places Frontend Application
### Backend application can be found here https://github.com/mmsmsy/google-places-backend

### App developed on Windows using Unix CLI emulator (usually work done on Ubuntu)
### To create a local copy
Copy the repository except for node_modules and build folders
yarn install
yarn start
#### The development server will start on localhost:3000
#### To make the frontend requests from Google Geolocation and Google Maps work from your localhost you need to swap Google API keys

### Description
The application uses Google Places API Web Services (https://developers.google.com/places/web-service/) to fetch data about nearby places based on their 'prominence' as specified by the documentation.

#### Main features
- shows a form to specify search parameters in Google Places API, by default it loads the most prominent places in user's location,
- lists the searched items in tiles, with icon of the type of place, name, photo and distance from your current location, if clicked on the icon of a place it will show rating and exact address of the place,
- loads more items with the same search parameters when scrolled to the bottom of the results list until there are no more next_page_token available from Google's response,
- when the place name is clicked it takes user to the details view of the place, where you'll find:
+ higher resolution photo
+ types that the place represent
+ address
+ is it opened now
+ link to call that takes the mobile user to phone app with this place's number
+ link to the place's website
+ link to navigate that takes the mobile user to phone app with this place's address
+ map with the place's location

#### Technologies used
node.js, yarn, axios, react, react-router, ES6, modules, SASS, Flexbox, jQuery, google-map-react by Istarkov (https://github.com/istarkov/google-map-react)

#### Difficulties encountered
- maintaining complexity of certain modules, especially in PlacesSearch.js. I would like to improve the whole application's readability as not all the code is properly organized and I feel there might be some parts of code I could make reusable and present itself in an easier way to reason about,
- keeping states in sync between the modules, while setting internal states of each module. Had to be extra careful which state to update, at what point in the module.
- testing worst case scenario's when data is not available for a particular place that is usually available. Had to make conditionals on what to do, when it's not available while not affecting the normal usage scenario,
- getting 
