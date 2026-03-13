// Temporary “database” of jets
const jets = [
  { name: 'F-16', type: 'Fighter', weapons: ['Missiles', 'Gun'], speed: '1500 km/h', range: '4220 km' },
  { name: 'F-22', type: 'Fighter', weapons: ['Missiles', 'Gun'], speed: '2410 km/h', range: '2960 km' },
  { name: 'A-10', type: 'Attack', weapons: ['Cannon', 'Missiles', 'Bombs'], speed: '706 km/h', range: '4170 km' },
  { name: 'F-35A', type: 'Fighter', weapons: ['Missiles', 'Gun'], speed: '1930 km/h', range: '2220 km' }
];

// --- Only run search code if on index.html ---
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');

if (searchInput && resultsDiv) { 
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = jets.filter(j => j.name.toLowerCase().includes(query));
    resultsDiv.innerHTML = filtered.length > 0
      ? filtered.map(j => `<div><a href="jet.html?name=${encodeURIComponent(j.name)}">${j.name}</a></div>`).join('')
      : '<div>No jets found</div>';
  });
}

// --- Only run jet info code if on jet.html ---
const jetDetailsDiv = document.getElementById('jetDetails');
if (jetDetailsDiv) { 
  const urlParams = new URLSearchParams(window.location.search);
  const jetName = urlParams.get('name');
  const jet = jets.find(j => j.name === jetName);

  if (jet) {
    jetDetailsDiv.innerHTML = `
      <h1>${jet.name}</h1>
      <p>Type: ${jet.type}</p>
      <p>Weapons: ${jet.weapons.join(', ')}</p>
      <p>Speed: ${jet.speed}</p>
      <p>Range: ${jet.range}</p>
    `;
  } else {
    jetDetailsDiv.innerHTML = '<p>Jet not found</p>';
  }
}
  
