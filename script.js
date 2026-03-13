// Main page logic
if (document.getElementById("searchBtn")) {
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim().toLowerCase();
    const jet = jets.find(j => j.name.toLowerCase() === query);

    if (jet) {
      localStorage.setItem("selectedJet", JSON.stringify(jet));
      window.location.href = "jet.html";
    } else {
      alert("Jet not found!");
    }
  });

  searchInput.addEventListener("keypress", e => {
    if (e.key === "Enter") searchBtn.click();
  });
}

// Jet info page logic
if (document.getElementById("jetName")) {
  const jet = JSON.parse(localStorage.getItem("selectedJet"));
  if (jet) {
    document.getElementById("jetName").textContent = jet.name;
    document.getElementById("jetType").textContent = "Type: " + (jet.type || "Unknown");
    document.getElementById("jetWeapons").textContent = "Weapons: " + (jet.weapons.length ? jet.weapons.join(", ") : "None");
    document.getElementById("jetDescription").textContent = jet.description || "No description available.";
  }

  document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

