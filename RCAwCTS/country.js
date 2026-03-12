/****************************************************
 * Elements
 ****************************************************/
const countryDetails = document.getElementById("countryDetails");
const backBtn = document.getElementById("backBtn");

// Get Country Name from URL
const params = new URLSearchParams(window.location.search);
const countryName = params.get("name");

/****************************************************
 * Fetch Country
 ****************************************************/
async function fetchCountry() {
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=flags,name,population,region,subregion,capital,tld,currencies,languages,borders",
    );

    if (!res.ok) throw new Error("Country not found");

    const data = await res.json();
    displayCountry(data[0]);
  } catch (error) {
    countryDetails.innerHTML = "<p>Country not found</p>";
    console.error(error);
  }
}
fetchCountry();

/****************************************************
 * Helper: Create Detail Item
 ****************************************************/
function createDetailItem(label, value) {
  const li = document.createElement("li");

  const strong = document.createElement("strong");
  strong.textContent = `${label}: `;

  const span = document.createElement("span");
  span.textContent = value || "N/A";

  li.append(strong, span);
  return li;
}

/****************************************************
 * Display Country
 ****************************************************/
function displayCountry(country) {
  countryDetails.innerHTML = "";

  // Flag
  const flagContainer = document.createElement("div");
  flagContainer.classList.add("flagImg");

  const flag = document.createElement("img");
  flag.src = country.flags.svg;
  flag.alt = country.flags.alt || country.name.common;

  flagContainer.appendChild(flag);

  // Right Side Containter
  const infoContainer = document.createElement("div");
  infoContainer.classList.add("countryInfo");

  // Title | Country Name
  const title = document.createElement("h2");
  title.textContent = country.name.common;

  // Detail Lists
  const detailsWrapper = document.createElement("div");
  detailsWrapper.classList.add("detailsWrapper");

  const detailsLeft = document.createElement("ul");
  const detailsRight = document.createElement("ul");

  // Prepare Values
  const nativeName =
    Object.values(country.name.nativeName || {})[0]?.common ||
    country.name.common;

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => c.name)
        .join(", ")
    : "N/A";

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  // Left Column
  const leftDetails = [
    ["Native Name", nativeName],
    ["Population", country.population.toLocaleString()],
    ["Region", country.region],
    ["Sub Region", country.subregion || "N/A"],
    ["Capital", country.capital?.join(", ") || "N/A"],
  ];

  leftDetails.forEach(([label, value]) => {
    detailsLeft.append(createDetailItem(label, value));
  });

  // Right Column
  const rightDetails = [
    ["Top Level Domain", country.tld?.join(", ") || "N/A"],
    ["Currencies", currencies],
    ["Languages", languages],
  ];

  rightDetails.forEach(([label, value]) => {
    detailsRight.append(createDetailItem(label, value));
  });

  detailsWrapper.append(detailsLeft, detailsRight);

  // Border Countries
  const borderSection = document.createElement("div");
  borderSection.classList.add("borderCountries");

  const borderLabel = document.createElement("strong");
  borderLabel.textContent = "Border Countries:";

  const borderContainer = document.createElement("div");
  borderContainer.classList.add("borderContainer");

  borderSection.append(borderLabel, borderContainer);

  displayBorders(country.borders, borderContainer); /* Assemble */

  infoContainer.append(title, detailsWrapper, borderSection);
  countryDetails.append(flagContainer, infoContainer);
}

/****************************************************
 * Fetch & Render Border Countries
 ****************************************************/
async function displayBorders(borders, container) {
  if (!borders || borders.length === 0) {
    container.textContent = " None";
    return;
  }

  try {
    for (const code of borders) {
      const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
      const data = await res.json();
      const borderCountry = data[0];

      const link = document.createElement("a");
      link.textContent = borderCountry.name.common;
      link.href = `country.html?name=${borderCountry.name.common}`;
      link.classList.add("borderBtn");

      container.appendChild(link);
    }
  } catch (error) {
    console.error("Error fetching borders:", error);
  }
}

/****************************************************
 * Back Button
 ****************************************************/
backBtn.addEventListener("click", () => {
  window.history.back();
});
