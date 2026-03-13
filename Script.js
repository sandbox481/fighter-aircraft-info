// script.js
const searchInput = document.getElementById("searchInput");
const filteredJets = document.getElementById("filteredJets");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();

  // If input is empty, clear results
  if (!query) {
    filteredJets.innerHTML = "";
    return;
  }

  const results = jets.filter(jet => jet.name.toLowerCase().includes(query));

  if (results.length === 0) {
    filteredJets.innerHTML = "<p>No jets found.</p>";
  } else {
    filteredJets.innerHTML = results
      .map(
        jet => `<div class="jet">
                  <h3>${jet.name}</h3>
                  <p>Type: ${jet.type}</p>
                  <p>Weapons: ${jet.weapons.join(", ")}</p>
                  <p>${jet.description}</p>
                </div>`
      )
      .join("");
  }
});
