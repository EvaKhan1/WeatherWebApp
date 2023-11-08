const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const city_name = document.querySelector('.city-name');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector(`.weather-body`);

async function checkWeather(city) {
    const api_key=`05c50dde7cbe1f86fb8c1b0501353da7`;
    // const api_key = `4cd0eee81294c867b4bc4cfc64e998c5`;
    // const api_key = `3265874a2c77ae4a04bb96236a642d2f`;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if (weather_data.cod === `404`) {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log(weather_data);
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";

    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    city_name.innerHTML = `${weather_data.name}`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}km/h`;

    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = "./assets/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "./assets/clear.png";
            break;
        case 'Rain':
            weather_img.src = "./assets/rain.png";
            break;
        case 'Mist':
            weather_img.src = "./assets/mist.png";
            break;
        case 'Snow':
            weather_img.src = "./assets/snow.png";
            break;

    }


}
// searchBtn.addEventListener('click', () => {
//     checkWeather(inputBox.value);
// });

searchBtn.addEventListener('click', () => {
    let city = inputBox.value.trim(); // Remove trailing spaces from the city name
    city = city.replace(/\s+$/, ""); // Remove the space at the end of the city name

    if (city === "") {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error: empty city");
        return;
    }
    
    checkWeather(city);
});
