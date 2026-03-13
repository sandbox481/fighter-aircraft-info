// ----------------- LOAD DATABASE -----------------
// Make sure your jets database is in jets.json or directly in a variable
let jets = [];
fetch('jets.json')
  .then(res => res.json())
  .then(data => {
    jets = data;
    initSearch(); // only start search after database is loaded
  });

// ----------------- INITIALIZE SEARCH -----------------
function initSearch() {
  const searchBar = document.getElementById("searchBar");
  const resultsDiv = document.getElementById("results");
  const searchSection = document.getElementById("searchSection");
  const jetInfoSection = document.getElementById("jetInfoSection");
  const jetInfoDiv = document.getElementById("jetInfo");
  const backButton = document.getElementById("backButton");

  // ----------------- SEARCH FUNCTION -----------------
  searchBar.addEventListener("input", () => {
    const searchInput = searchBar.value.trim().toLowerCase().replace(/[^a-z0-9]/g, "");

    const filteredJets = jets.filter(jet => {
      const jetNameClean = jet.name.toLowerCase().replace(/[^a-z0-9]/g, "");
      return jetNameClean.includes(searchInput);
    });

    if (filteredJets.length === 0) {
      resultsDiv.innerHTML = "<p>No jets found</p>";
    } else {
      resultsDiv.innerHTML = filteredJets
        .map(jet => {
          let displayName = jet.name;
          if (searchInput) {
            const regex = new RegExp(searchInput.split("").join("|"), "ig");
            displayName = jet.name.replace(regex, m => `<span class="highlight">${m}</span>`);
          }
          return `<p class="jetItem" data-name="${jet.name}">${displayName} (${jet.country})</p>`;
        })
        .join("");
    }

    // Add click events to results
    document.querySelectorAll(".jetItem").forEach(item => {
      item.addEventListener("click", () => showJetInfo(item.dataset.name));
    });
  });

  // ----------------- SHOW JET INFO -----------------
  function showJetInfo(jetName) {
    const jet = jets.find(j => j.name === jetName);
    if (!jet) return;

    searchSection.style.display = "none";
    jetInfoSection.style.display = "block";

    jetInfoDiv.innerHTML = `
      <h2>${jet.name}</h2>
      <p><strong>Country:</strong> ${jet.country}</p>
      <p><strong>Length:</strong> ${jet.length}</p>
      <p><strong>Wingspan:</strong> ${jet.width || jet.wingspan || "N/A"}</p>
      <p><strong>Height:</strong> ${jet.height}</p>
      <p><strong>Weight:</strong> ${jet.weight}</p>
      <p><strong>Speed:</strong> ${jet.speed}</p>
      <p><strong>Developer:</strong> ${jet.developer}</p>
      <p><strong>First Flight:</strong> ${jet.first_flight}</p>
      <p><strong>Number Produced:</strong> ${jet.number_produced}</p>
      <p><strong>Description:</strong> ${jet.description}</p>
      <p><strong>Purpose/Features:</strong> ${jet.purpose_features}</p>
      <p><strong>Weapons:</strong> ${jet.weapons ? jet.weapons.join(", ") : "N/A"}</p>
    `;
  }

  // ----------------- BACK BUTTON -----------------
  backButton.addEventListener("click", () => {
    jetInfoSection.style.display = "none";
    searchSection.style.display = "block";
  });
}
