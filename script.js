// ----------------- ELEMENTS -----------------
const searchBar = document.getElementById("searchBar");
const resultsDiv = document.getElementById("results");
const searchSection = document.getElementById("searchSection");
const jetInfoSection = document.getElementById("jetInfoSection");
const jetInfoDiv = document.getElementById("jetInfo");
const backButton = document.getElementById("backButton");

// ----------------- DATABASE -----------------
// Use your existing jets database array here
// Example: const jets = myJetsArrayFromJSON;

// ----------------- SEARCH FUNCTION -----------------
searchBar.addEventListener("input", () => {
  const searchInput = searchBar.value.trim().toLowerCase();

  const filteredJets = jets.filter(jet => {
    // Remove all non-alphanumeric characters for comparison
    const jetNameClean = jet.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    const inputClean = searchInput.replace(/[^a-z0-9]/g, "");
    return jetNameClean.includes(inputClean);
  });

  if (filteredJets.length === 0) {
    resultsDiv.innerHTML = "<p>No jets found</p>";
  } else {
    resultsDiv.innerHTML = filteredJets
      .map(jet => {
        // Highlight matching letters
        let displayName = jet.name;
        const jetNameClean = jet.name.toLowerCase().replace(/[^a-z0-9]/g, "");
        const inputClean = searchInput.replace(/[^a-z0-9]/g, "");
        if (inputClean) {
          // Build regex for highlighting letters/numbers
          const regex = new RegExp(inputClean.split("").join("|"), "ig");
          displayName = jet.name.replace(regex, match => `<span class="highlight">${match}</span>`);
        }
        return `<p class="jetItem" data-name="${jet.name}">${displayName} (${jet.country})</p>`;
      })
      .join("");
  }

  // Add click events to each result
  document.querySelectorAll(".jetItem").forEach(item => {
    item.addEventListener("click", () => {
      showJetInfo(item.dataset.name);
    });
  });
});

// ----------------- SHOW JET INFO -----------------
function showJetInfo(jetName) {
  const jet = jets.find(j => j.name === jetName);
  if (!jet) return;

  // Hide search, show info
  searchSection.style.display = "none";
  jetInfoSection.style.display = "block";

  // Display jet details
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
