// Set copyright in footer
document.getElementById('copyrightYear').innerText = new Date().getFullYear();

// Temperature Feature
const temperature = document.getElementById('miami-temp');
let currentTemp
async function getWeatherData() {
    const weatherPromise = await fetch(`https://api.weather.gov/gridpoints/MFL/110,50/forecast/hourly`);
    const weatherData = await weatherPromise.json();
    temperature.textContent= weatherData.properties.periods[0].temperature
}
getWeatherData()


  // Pet Area display
  const template = document.getElementById("pet-card-template");
  const wrapper = document.createDocumentFragment();
  const listDiv = document.querySelector(".list-of-pets");

  async function petsArea() {
    const petsPromise = await fetch('https://learnwebcode.github.io/bootcamp-pet-data/pets.json')
    const petsData = await petsPromise.json();
    petsData.forEach(pet => {
      const clone = template.content.cloneNode(true);
      clone.querySelector(".pet-card").dataset.species = pet.species
      clone.querySelector("h3").textContent = pet.name;
      clone.querySelector(".pet-description").textContent = pet.description;
      clone.querySelector(".pet-age").textContent = createAgeText(pet.birthYear)
      pet.photo ? clone.querySelector(".pet-card-photo img").src = pet.photo : clone.querySelector(".pet-card-photo img").src = "./images/pet-fallback-image.jpg";
      clone.querySelector(".pet-card-photo img").alt = `A ${pet.species} named ${pet.name}`;
      wrapper.appendChild(clone);
    })
    listDiv.appendChild(wrapper)
  }
  petsArea();

  function createAgeText(birthYear){
    const thisYear = new Date().getFullYear();
    const yearsOld = thisYear - birthYear
    if (yearsOld < 1) return `Less than a year old`;
    else if (yearsOld === 1) return `${yearsOld} year old`;
    else return `${yearsOld} years old`;
  }

  //Pet filter button
  const buttons = document.querySelectorAll(".pet-filter button")
  buttons.forEach((button) => {
    button.addEventListener("click", handleButtonClick);
  })


  function handleButtonClick(e){
    for (let button of buttons){
      button.classList.remove("active")
    }
    e.target.classList.add("active");

    const currentFilter = e.target.dataset.filter
    document.querySelectorAll(".pet-card").forEach(card => {
      if (currentFilter == card.dataset.species || currentFilter === "all"){
        card.style.display = "grid";
      } else {
        card.style.display = "none";
      }
    })
  }
