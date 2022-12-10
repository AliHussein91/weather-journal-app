/* eslint-disable no-undef */
// Requiring the server dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Instantiating up an instance of express app
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Running the server on port 3000
const PORT = 3000;
app.listen(PORT, listening);

// Callback to debug
function listening() {
  console.log(`Server Running on http://localhost:${PORT}/`);
}

// Initialize all route with a callback function
// Callback function to complete GET '/all'
app.get('/all', function (req, res) {
  locationValidation(projectData.temp);
  res.send(projectData);
});

// Post Route
app.post('/', (req, res) => {
  projectData = req.body;
  res.sendStatus(200);
});

// validating opean weather API response at server side
function locationValidation(value) {
  if (typeof value === 'number') {
    projectData.temp = Math.round(projectData.temp) + ' degrees';
  } else {
    projectData.error =
      projectData.error.charAt(0).toUpperCase() + projectData.error.slice(1);
  }
}
