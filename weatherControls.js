const searchBox = document.getElementById("search-box");
const locationInput = document.getElementById("location-input");
const temperatureTxt = document.getElementById("temperature");
const weatherCondName = document.getElementById("weather-condition-name");
const humidityTxt = document.getElementById("humidity");
const windSpeedTxt = document.getElementById("wind-speed");

// Event listener for the search box
async function getLocation(location){
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=10&language=en&format=json`);
    // Check returned data
    const data = await res.json();
    const result = data.results[0];
    // If no results found, return null
    if (!result) return null;
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
    if (!current) return null;
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
        temperatureTxt.textContent = `${weather.temperature}°C`;
        weatherCondName.textContent = weather.weatherCode; // You might want to map this to a more user-friendly name
        humidityTxt.textContent = `${weather.humidity}%`;
        windSpeedTxt.textContent = `${weather.windSpeed} km/h`;
    } else {
        alert("Location not found");
    }
})