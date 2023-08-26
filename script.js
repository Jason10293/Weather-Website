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


locationButton.addEventListener('click', () =>{
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showLocation, checkError);
    landingPage.style.transform = 'translateX(-150px)';
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
