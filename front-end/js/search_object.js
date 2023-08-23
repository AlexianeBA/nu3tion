const searchInput = document.getElementById("searchInput");
const btnSearch = document.getElementById("btn-search");
const resultsContainer = document.getElementById("resultsContainer");

btnSearch.addEventListener("click", () => {
  const searchTerm = searchInput.value;
  if (searchTerm) {
    fetchResults(searchTerm);
  }
});

function fetchResults(searchTerm) {
  fetch(`https://world.openfoodfacts.org/categories.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erreur de réseau: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      displayResults(data, searchTerm);
    })
    .catch((error) => {
      console.error("Une erreur s'est produite:", error);
    });
}

function displayResults(data, searchTerm) {
  resultsContainer.innerHTML = ""; // Effacer les résultats précédents

  const matchingResults = data.tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  matchingResults.forEach((result) => {
    const resultItem = document.createElement("div");
    resultItem.textContent = result.name;
    resultsContainer.appendChild(resultItem);
  });

  if (matchingResults.length === 0) {
    const noResultsMessage = document.createElement("div");
    noResultsMessage.textContent = "Aucun résultat trouvé.";
    resultsContainer.appendChild(noResultsMessage);
  }
}
