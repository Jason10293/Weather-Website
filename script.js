const APIKey = 'da0f9c8d90bde7e619c3ec47766a42f4'

const locationButton = document.querySelector('.js-device-location');
const landingPage = document.querySelector('.js-landing-page');
const weatherPage = document.querySelector('.js-display-weather');
const currentWeather = document.querySelector('.js-current-weather-container');
const weatherConditions = document.querySelector('.js-weather-conditions');

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "Decemebr",
]

const weatherIconMap = {
  '01d': 'sun',
  '01n': 'moon',
  '02d': 'sun',
  '02n': 'moon',
  '03d': 'cloud',
  '03n': 'cloud',
  '04d': 'cloud',
  '03n': 'cloud',
  '09d': 'cloud-rain',
  '09n': 'cloud-rain',
  '10d': 'cloud-rain',
  '10n': 'cloud-rain',
  '11d': 'cloud-lightning',
  '11n': 'cloud-lightning',
  '13d': 'cloud-snow',
  '13n': 'cloud-snow',
  '50d': 'water',
  '50n': 'water',
}



let latitude;
let longitude;

locationButton.addEventListener('click', () =>{
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showLocation, checkError);
    transitionPage(weatherPage, landingPage);
  }
});




const checkError = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("Please allow access to location");
      break;
    case error.POSITION_UNAVAILABLE:
      //usually fired for firefox
      console.log("Location Information unavailable");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out");
  }
};


const showLocation = async (position) => {
  //We user the NOminatim API for getting actual addres from latitude and longitude
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  let response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
  );
  
  //store response object
  let data = await response.json();
  // latitude = data.longitude
  console.log(data.address.city);
};



const date = new Date();
let day = date.getDate();
let month = monthsOfYear[date.getMonth()];
let dayOfWeek = daysOfWeek[date.getDay()];
let year = date.getFullYear();

dateHTML = `<p class = "date">
${dayOfWeek}<span> ${month} ${day}, ${year}</span>
</p>`

document.querySelector(".date-block").innerHTML = dateHTML;


const inputField = document.querySelector('.js-city-name-getter');

inputField.addEventListener('keydown', (event) => {
  if(event.key === 'Enter'){
    transitionPage(weatherPage, landingPage);
  }
});


function transitionPage(weatherPage, landingPage){
  landingPage.style.transform = 'translateX(-194px)';
  weatherPage.style.transform = 'translateX(200px)';
  weatherPage.style.opacity = '1';
  weatherPage.style.backgroundColor = 'rgb(40,44,52)';

  // weatherPage.style.backgroundColor = 'white'
}
fetchWeatherData('Richmond Hill');

function fetchWeatherData(location){
  const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${APIKey}&units=metric`;
  fetch(apiURL).then(response => response.json()).then(data => {
    console.log(data);
    const todayWeather = data.list[0].weather[0].description;
    const todayTemperature = `${Math.round(data.list[0].main.temp)}°C`;
    const todayWeatherIconCode = data.list[0].weather[0].icon;

    currentWeather.innerHTML = `
    <i class='bx bx-${weatherIconMap[todayWeatherIconCode]} weather-condition-icon' style='color:#ffffff'></i>
    <div class="current-weather">
      <div class="temperature"> ${todayTemperature} </div>
      <div class="weather-status"> ${todayWeather} </div>
    </div>`;

    const precipitation = data.list[0].pop * 100;
    const humidity = data.list[0].main.humidity;
    const windspeed = Math.round(data.list[0].wind.speed);

    console.log(precipitation, humidity, windspeed);

    weatherConditions.innerHTML = `
    <div class="precipitation"> Precipitation </div>
    <div class="precipitation-percent"> ${precipitation}&#37; </div>
    <div class="humidity"> Humidity </div>
    <div class="humidity-value"> ${humidity}&#37; </div>
    <div class="wind-speed"> Wind Speed </div>
    <div class="wind-speed-value"> ${windspeed} km&#47;h </div>`;
  });
}