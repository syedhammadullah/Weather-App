async function getWeather() {
  const city = document.getElementById("city-input").value;
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const apiKey = "e81a7188df5bbefb86d5aa017cbfaa2a";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Show loading sign
  document.getElementById("loading").style.display = "flex";
  document.getElementById("weather-result").innerHTML = "";

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Hide loading sign
    document.getElementById("loading").style.display = "none";

    if (data.cod !== 200) {
      document.getElementById(
        "weather-result"
      ).innerHTML = `<p>${data.message}</p>`;
      return;
    }

    const weatherInfo = `
              <h2>${data.name}, ${data.sys.country}</h2>
              <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
              <p><strong>Weather:</strong> ${data.weather[0].description}</p>
              <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
              <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
          `;
    document.getElementById("weather-result").innerHTML = weatherInfo;
  } catch (error) {
    // Hide loading sign
    document.getElementById("loading").style.display = "none";

    document.getElementById(
      "weather-result"
    ).innerHTML = `<p>Error fetching data. Please try again later.</p>`;
  }
}
