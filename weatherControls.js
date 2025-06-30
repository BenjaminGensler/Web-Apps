const searchBox = document.getElementById("search-box");
const locationInput = document.getElementById("location-input");
const temperatureTxt = document.getElementById("temperature");
const weatherCondName = document.getElementById("weather-condition-name");
const humidityTxt = document.getElementById("humidity");
const windSpeedTxt = document.getElementById("wind-speed");

const weatherCodeImages = {
    0: "media/weatherCode/clear_sky.png",
    1: "media/weatherCode/partly_cloudy.png",
    2: "media/weatherCode/cloudy.png",
    3: "media/weatherCode/rain_showers.png",
    45: "media/weatherCode/fog.png",
    48: "media/weatherCode/fog.png",
    51: "media/weatherCode/rain_showers.png",
    53: "media/weatherCode/rain_showers.png",
    55: "media/weatherCode/rain_showers.png",
    56: "media/weatherCode/rain_showers.png",
    57: "media/weatherCode/rain_showers.png",
    61: "media/weatherCode/rain_showers.png",
    63: "media/weatherCode/rain_showers.png",
    65: "media/weatherCode/rain_showers.png",
    66: "media/weatherCode/rain_showers.png",
    67: "media/weatherCode/rain_showers.png",
    71: "media/weatherCode/snow_fall.png",
    73: "media/weatherCode/snow_fall.png",
    75: "media/weatherCode/snow_fall.png",
    77: "media/weatherCode/snow_fall.png",
    80: "media/weatherCode/rain_showers.png",
    81: "media/weatherCode/rain_showers.png",
    82: "media/weatherCode/rain_showers.png",
    85: "media/weatherCode/snow_showers.png",
    86: "media/weatherCode/snow_showers.png",
    95: "media/weatherCode/thunderstorm.png",
    96: "media/weatherCode/thunderstorm.png",
    99: "media/weatherCode/thunderstorm.png"
};

// Function to get the image based on weather code
function getWeatherImage(weatherCode) {
    const weatherImageSrc = weatherCodeImages[weatherCode];
  weatherCondName.src = weatherImageSrc; // Set the image source
}

// Event listener for the search box
async function getLocation(location){
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=10&language=en&format=json`);
    // Check returned data
    const data = await res.json();
    const result = data.results[0];
    // If no results found, return null
    if (!result) return {
        name: "null",
        lat: -1,
        lon: -1
    }
    // Return the first result with name, latitude, and longitude
    return {
        name: result.name || "",
        lat: result.latitude,
        lon: result.longitude
    }
}

async function getWeather(location){
    const {lat, lon, name} = await getLocation(location);
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&current=relative_humidity_2m,temperature_2m,wind_speed_10m,weather_code`);

    const data = await res.json();
    const current = data.current;
    // If no current weather data found, return null
    if (!current) return {
        name: "null",
        temperature: -1,
        humidity: -1,
        windSpeed: -1,
        weatherCode: -1
    }
    // Return the weather data
    return {
        name,
        temperature: current.temperature_2m,
        humidity: current.relative_humidity_2m,
        windSpeed: current.wind_speed_10m,
        weatherCode: current.weather_code
    }
}

searchBox.addEventListener("submit", async (e) => {
    e.preventDefault();
    const weather = await getWeather(locationInput.value);
    if (weather) {
        getWeatherImage(weather.weatherCode); // Sets image when search is submitted
        temperatureTxt.textContent = `${weather.temperature}°C`;
        // weatherCondName.textContent = weather.weatherCode; // You might want to map this to a more user-friendly name
        humidityTxt.textContent = `${weather.humidity}%`;
        windSpeedTxt.textContent = `${weather.windSpeed} km/h`;
    } else {
        alert("Location not found");
    }
})