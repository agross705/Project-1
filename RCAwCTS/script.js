/****************************************************
 * Elements
 ****************************************************/
const countriesContainer = document.getElementById("countries");
const searchInput = document.getElementById("search");
const regionFilter = document.getElementById("regionFilter");

let countriesData = [];

/****************************************************
 * Fetch All Countries
 ****************************************************/
async function fetchCountriesAPI() {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital");

    // Handles errors
    if (!res.ok) {
      throw new Error(`Error! Status: ${res.status}`);
    }

    const data = await res.json();

    countriesData = data;
    displayCountries(data);

  } catch (error) {
    console.error("Failed to fetch countries:", error);
  }
}

// Calls the function
fetchCountriesAPI();

/****************************************************
 * Display Countries
 ****************************************************/
function displayCountries(countries) {
  countriesContainer.innerHTML = "";

  countries.forEach((country) => {
    const card = document.createElement("article");
    card.classList.add("card");
    card.dataset.name = country.name.common;
    card.dataset.code = country.code;

    const previewCard = document.createElement("section");

    const flag = document.createElement("img");
    flag.classList.add("flag");
    flag.src = country.flags.svg;
    flag.alt = country.flags.alt || country.name.common;

    const name = document.createElement("h2");
    name.textContent = country.name.common;

    const population = document.createElement("p");
    population.textContent = `Population: ${country.population.toLocaleString()}`;

    const region = document.createElement("p");
    region.textContent = `Region: ${country.region}`;

    const capital = document.createElement("p");
    capital.textContent = `Capital: ${country.capital?.[0] || "N/A"}`;

    card.append(previewCard);
    previewCard.append(flag, name, population, region, capital);

    countriesContainer.append(card);
  });
}

countriesContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;

  const countryDetails = card.dataset.name;
  window.location.href = `country.html?name=${countryDetails}`;
});


/****************************************************
 * Search Country
 ****************************************************/
searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  const filtered = countriesData.filter(c =>
    c.name.common.toLowerCase().includes(value)
  );
  displayCountries(filtered);
});

/****************************************************
 * Filter By Region
 ****************************************************/
regionFilter.addEventListener("change", e => {
  const region = e.target.value;
  const filtered = region
    ? countriesData.filter(c => c.region === region)
    : countriesData;
  displayCountries(filtered);
});