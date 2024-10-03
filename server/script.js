document.addEventListener('DOMContentLoaded', function() {
    displayDateTime();
    setInterval(displayDateTime, 1000);
    document.getElementById('searchWeather').addEventListener('click', function() {
        const city = document.getElementById('cityInput').value;
        if (city) {
            fetchWeather(city);
        } else {
            alert('Please enter a city name.');
        }
    });
});

function displayDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const dateTimeStr = now.toLocaleDateString('en-US', options);
    document.getElementById('dateTime').innerText = dateTimeStr;
}

async function fetchWeather(city) {
    const apiKey = '2ee7e1fe0a6aacd0af7dafaa972a9f00'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.cod === 200) {
            displayWeather(data);
        } else {
            alert('City not found.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('An error occurred while fetching weather data.');
    }
}

function displayWeather(data) {
     const weatherInfo = document.getElementById('weatherInfo');
     const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`; // URL for the weather icon

     weatherInfo.innerHTML = `
        <div class="weather-details">
        <h2 >${data.name} <img src="${weatherIcon}" alt="Weather Icon"> </h2>
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>Visibility: ${data.visibility/1000} km</p>
    </div> 
        `;
}
