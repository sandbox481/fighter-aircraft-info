const searchInput = document.getElementById("searchInput");
const filteredJets = document.getElementById("filteredJets");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();

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
                  <a href="jet.html?jet=${encodeURIComponent(jet.name)}">
                    <h3>${jet.name}</h3>
                  </a>
                  <p>Type: ${jet.type}</p>
                  <p>Weapons: ${jet.weapons.join(", ")}</p>
                </div>`
      )
      .join("");
  }
});
