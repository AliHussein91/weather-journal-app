/* Global Variables */
const WEATHER_FORM = document.querySelector('form.data');
const DISPLAY_CONTAINER = document.querySelector('.entry');
const DISPLAY_AREA = document.getElementById('entryHolder');
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const API_KEY = '&appid=c08debf9384e38b29c46eccba084df12&units=imperial';

/* Function to GET Web API Data */
let getData = async (url = '') => {
  let res = await fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
  });
  try {
    let data = await res.json();
    return data;
  } catch (err) {
    console.error('Could not get data from server!');
  }
};

/* Function to POST data */
let postData = async (url = '', data = {}) => {
  await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).catch((err) => {
    console.log(err);
    console.error('Could not post data to server!');
  });
};

// Getting weather data from OpenWeather API
let getWeather = async (zipCode) => {
  let res = await fetch(`${BASE_URL}${zipCode}${API_KEY}`);
  try {
    let weatherInfo = await res.json();
    return weatherInfo;
  } catch (err) {
    console.error('Could not get weather data from Open Weather!');
  }
};

/* show data on HTML */
let showData = (dataReceived) => {
  // Clearing the display area to display the most recent entery only
  DISPLAY_AREA.innerHTML = '';
  // Checking if an error is received
  if (dataReceived.error !== undefined) {
    // Adding danger class to turn the display area background red
    DISPLAY_CONTAINER.classList.add('danger');
    const DIV = document.createElement('div');
    DIV.id = 'error';
    DIV.innerHTML = dataReceived.error;
    DISPLAY_AREA.appendChild(DIV);
  } else {
    // Removing danger class to ensure display area is green
    DISPLAY_CONTAINER.classList.remove('danger');
    // Creating a gragment to hold the data divs to be appended later to the display area
    const FRAGMENT = document.createDocumentFragment();
    Object.keys(dataReceived).forEach((key) => {
      const DIV = document.createElement('div');
      DIV.id = key;
      DIV.innerHTML = dataReceived[key];
      FRAGMENT.appendChild(DIV);
    });
    DISPLAY_AREA.appendChild(FRAGMENT);
  }
};

// Event listener to add function to existing HTML DOM element
WEATHER_FORM[2].addEventListener('click', getPostData);
/* Function called by event listener */
function getPostData(e) {
  // preventing the page from refreshing when submitting the form data
  e.preventDefault();
  // Calling the OpenWeather API with the zip code entered
  getWeather(WEATHER_FORM[0].value)
    // checking the received data for error validation
    .then((data) => {
      if (data.cod === 200) {
        postData('/', {
          temp: data.main.temp,
          date: newDate,
          feel: WEATHER_FORM[1].value,
          description: data.weather[0].description,
        });
      } else if (data.cod !== 200) {
        postData('/', {
          error: `${data.message}, please enter a valid zip code!`,
          feel: WEATHER_FORM[1].value,
          date: newDate,
        });
      }
    })
    // Getting the data from the server
    .then(() => getData('/all'))
    // Updating the DOM with the data received
    .then((data) => showData(data))
    .catch((err) => {
      console.error(err);
    });
}
