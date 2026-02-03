const toggle = document.getElementById("themeToggle");

/****************************************************
 * Load Saved Theme
 ****************************************************/
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

/****************************************************
 * Toggle Theme
 ****************************************************/
toggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});