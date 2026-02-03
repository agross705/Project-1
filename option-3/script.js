/****************************************************
 * Elements
 ****************************************************/
const countriesContainer = document.getElementById("countries");

let countriesData = [];

/****************************************************
 * Fetch All Countries
 ****************************************************/
async function fetchCountries() {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital");

    // Handle errors
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
fetchCountries();

/****************************************************
 * Display Countries
 ****************************************************/
function displayCountries(countries) {
  countriesContainer.innerHTML = "";

  countries.forEach(country => {
    const card = document.createElement("div");
    card.className = "country";

    card.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.common}">
      <div class="countryInfo">
        <h3>${country.name.common}</h3>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
      </div>
    `;

    card.addEventListener("click", () => {
      window.location.href = `country.html?name=${country.name.common}`;
    });

    countriesContainer.appendChild(card);
  });
}