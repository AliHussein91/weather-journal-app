/* Global Variables */
let zipCode;
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=`;
const ZIP_CODE = document.querySelector('#zip');
const FEELINGS = document.querySelector('#feelings');
const GENERATE_BTN = document.querySelector('#generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = 'c08debf9384e38b29c46eccba084df12&units=imperial';
// Event listener to add function to existing HTML DOM element
GENERATE_BTN.addEventListener('click', getPostData);
/* Function called by event listener */
function getPostData() {
  const FORM_DATA = {
    zipCode: ZIP_CODE.value,
    feelings: FEELINGS.value,
  };
}
/* Function to GET Web API Data*/
async function getData(url = '') {
  await fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
    headers: { 'content-type': 'application/json' },
  })
    .then((data) => {
      return data.json;
    })
    .catch((error) => console.error(error));
}

/* Function to POST data */
async function postData(url = '', data = {}) {
  await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data),
  }).catch((error) => console.log(error));
}
/* Function to GET Project Data */
getData('/all');
