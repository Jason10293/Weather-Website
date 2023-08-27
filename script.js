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

const locationButton = document.querySelector('.js-device-location');
const landingPage = document.querySelector('.js-landing-page');
const weatherPage = document.querySelector('.js-display-weather');

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
  let response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
  );
  //store response object
  let data = await response.json();
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
  landingPage.style.transform = 'translateX(-193px)';
  weatherPage.style.transform = 'translateX(200px)';
  weatherPage.style.opacity = '1';
  // weatherPage.style.backgroundColor = 'rgb(8,44,108)';
  weatherPage.style.backgroundColor = 'white'
}
