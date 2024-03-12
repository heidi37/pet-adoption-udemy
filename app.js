document.getElementById('copyrightYear').innerText = new Date().getFullYear();
const API_KEY = config.MY_KEY

const temperature = document.getElementById('miami-temp');
let currentTemp

async function getWeatherData() {
  try {
    const weatherPromise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=25.76&lon=-80.19&appid=${API_KEY}`);

    if (!weatherPromise.ok) {
      // Throw an error if the HTTP response is not okay
      throw new Error(`Failed to fetch weather data. Status: ${weatherPromise.status}`);
    }

    const weatherData = await weatherPromise.json();

    if (!weatherData.main || !weatherData.main.temp) {
      // Throw an error if the expected data is not present
      throw new Error('Unexpected format of weather data.');
    }

    // Return the weather data if everything is successful
    return weatherData;
  } catch (error) {
    // Log the error and rethrow it to propagate it to the caller
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

// Example of using the function with error handling
getWeatherData()
  .then((weatherData) => {
    // Handle the weather data if the promise is resolved

    currentTemp = Math.round((weatherData.main.temp - 273.15) * (9/5) + 32);

    // Assuming 'temperature' is a DOM element
    temperature.textContent = `${currentTemp}`;
  })
  .catch((error) => {
    // Handle errors if the promise is rejected
    console.error('Error:', error);
  });

  const template = document.getElementById("pet-card-template");
  const wrapper = document.createDocumentFragment();
  const listDiv = document.querySelector(".list-of-pets");
  const thisYear = new Date().getFullYear();

  async function petsArea() {
    const petsPromise = await fetch('https://learnwebcode.github.io/bootcamp-pet-data/pets.json')
    const petsData = await petsPromise.json();
    petsData.forEach(pet => {
      const clone = template.content.cloneNode(true);
      clone.querySelector("h3").textContent = pet.name;
      clone.querySelector(".pet-description").textContent = pet.description;
      clone.querySelector(".pet-age").textContent = `${thisYear - pet.birthYear} years old`;
      clone.querySelector("img").setAttribute("src", `${pet.photo}`);
      clone.querySelector("img").setAttribute("alt", `A ${pet.species} named ${pet.name}`);
      wrapper.appendChild(clone);
    })
    listDiv.appendChild(wrapper)
  }



  petsArea();
