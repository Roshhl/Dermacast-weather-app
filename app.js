const API_KEY = "58c3e2635c53b630846cc2b1846d3ca3";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const skinType = document.getElementById("skinType").value;
  const weatherOutput = document.getElementById("weatherOutput");
  const skinAdvice = document.getElementById("skinAdvice");

  if (!city) {
    weatherOutput.innerHTML = '<p class="text-red-600">Please enter a city name.</p>';
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      weatherOutput.innerHTML = `<p class="text-red-600">${data.message}</p>`;
      skinAdvice.innerHTML = "";
      return;
    }

    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed; 
    const uvIndex = 6; 
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;


    weatherOutput.innerHTML = `
      <h2 class="text-xl font-bold">Weather in ${data.name}</h2>
      <img src="${iconUrl}" alt="Weather Icon" class="mx-auto my-2 w-16 h-16" />
      <p>Temperature: ${temp}°C</p>
      <p>Humidity: ${humidity}%</p>
    `;

    // Skin sensitivity logic
   if (skinType === "dry" && humidity < 40) {
  skinAdvice.innerHTML = '<p class="text-yellow-400">Low humidity detected – moisturise often!</p>';
} else if (skinType === "heat" && temp > 28) {
  skinAdvice.innerHTML = '<p class="text-red-400">High temperature – stay cool and hydrated!</p>';
} else if (skinType === "burn" && temp > 25) {
  skinAdvice.innerHTML = '<p class="text-orange-400">Consider sunscreen – high sun risk for sensitive skin.</p>';
} else if (skinType === "rosacea" && (temp > 25 || windSpeed > 20)) {
  skinAdvice.innerHTML = '<p class="text-pink-400">Avoid excessive heat and wind exposure – both can trigger rosacea flare-ups.</p>';
} else if (skinType === "psoriasis" && humidity < 30) {
  skinAdvice.innerHTML = '<p class="text-gray-300">Dry conditions may worsen psoriasis – moisturise regularly.</p>';
} else if (skinType === "dehydrated" && (temp > 26 && humidity < 35)) {
  skinAdvice.innerHTML = '<p class="text-cyan-300">Hot and dry weather detected – hydrate well and use a hydrating serum.</p>';
} else if (skinType === "hyperpigmentation" && uvIndex >= 5) {
  skinAdvice.innerHTML = '<p class="text-purple-400">High UV index – wear sunscreen to prevent dark spots.</p>';
} else {
  skinAdvice.innerHTML = '<p class="text-green-400">Conditions are normal for your skin type.</p>';
}
skinAdvice.innerHTML += '<p class="text-xs mt-2 text-white/70">Tailored advice for: ' + skinType.replace("-", " ") + '</p>';
}

 catch (error) {
    weatherOutput.innerHTML = `<p class="text-red-600">Error fetching weather: ${error.message}</p>`;
    skinAdvice.innerHTML = "";
  }
}

const toggleBtn = document.getElementById("darkToggle");
toggleBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});
