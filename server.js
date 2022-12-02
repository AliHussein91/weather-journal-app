const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Setup empty JS object to act as endpoint for all routes
const projectData = {};
// Express to run server and routes
// Start up an instance of app
const APP = express();
/* Dependencies */
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
APP.use(bodyParser.urlencoded({ extended: false }));
APP.use(bodyParser.json());
// Cors for cross origin allowance
APP.use(cors());
// Initialize the main project folder
APP.use(express.static('website'));
// Spin up the serverq
const PORT = 3000;
APP.listen(PORT, listening);
// Callback to debug
function listening() {
  console.log(`Server Running on http://localhost:${PORT}/`);
}
// Initialize all route with a callback function
// Callback function to complete GET '/all'
APP.get('/all', (req, res) => {
  res.send(projectData);
});

// Post Route
const DATA = [];
APP.post('/', (req, res) => {
  DATA.push(req.body);
  res.send(200);
});
