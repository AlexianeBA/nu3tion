const golmon = new URLSearchParams(window.location.search);
const pageSize = golmon.get("product");
get_detail_product(pageSize);
function get_detail_product(id) {
  fetch("http://127.0.0.1:8001/get_aliment_by_id?off_id=" + id)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        const productDetailsContainer =
          document.getElementById("product-details");
        const titleProduct = document.createElement("h2");
        const descriptionProduct = document.createElement("table");
        const nutriscore = document.createElement("p");
        const nutritionalTable = document.createElement("table");

        titleProduct.textContent =
          element.nom_produit +
          " - " +
          element.marque +
          " - " +
          element.quantite_produit;
        const descrp = document.getElementById("description");
        const etoile = document.createElement("i");
        etoile.classList.add("fa-regular", "fa-star");
        descrp.appendChild(etoile);
        const descriptionObject = [
          { label: "Nom du produit", value: element.nom_produit },
          { label: "Marque", value: element.marque },
          { label: "Quantité", value: element.quantite_produit },
          { label: "Origine", value: element.origine },
          { label: "Informations", value: element.information },
          { label: "Catégorie", value: element.categories },
          { label: "Conservation", value: element.conservation },
        ];

        descriptionObject.forEach((row) => {
          const rowElement = document.createElement("tr");
          const labelCellule = document.createElement("td");
          const valueCellule = document.createElement("td");

          labelCellule.textContent = row.label;
          valueCellule.textContent = row.value;

          rowElement.appendChild(labelCellule);
          rowElement.appendChild(valueCellule);
          descriptionProduct.appendChild(rowElement);
        });

        nutriscore.textContent = element.nutriscore;

        const tableHeader = ["Nutriment", "Quantité"];
        const headerRow = document.createElement("tr");
        tableHeader.forEach((headerText) => {
          const headerCellule = document.createElement("th");
          headerCellule.textContent = headerText;

          headerRow.appendChild(headerCellule);
        });

        nutritionalTable.appendChild(headerRow);
        const nutriments = [
          { label: "kcal", value: element.kcal },
          { label: "matieres_grasse", value: element.matieres_grasse },
          {
            label: "matieres_grasse_saturees",
            value: element.matieres_grasse_saturees,
          },
          { label: "proteines", value: element.proteines },
          { label: "sel", value: element.sel },
          { label: "sodium", value: element.sodium },
          { label: "Sucre : ", value: element.sucre },
        ];

        nutriments.forEach((nutriment) => {
          const nutrimentsRow = document.createElement("tr");
          const nutrimentsName = document.createElement("td");
          const nutrimentsValue = document.createElement("td");
          nutrimentsName.textContent = nutriment.label;
          nutrimentsValue.textContent = nutriment.value;
          nutrimentsRow.appendChild(nutrimentsName);
          nutrimentsRow.appendChild(nutrimentsValue);
          nutritionalTable.appendChild(nutrimentsRow);
        });

        productDetailsContainer.appendChild(titleProduct);
        productDetailsContainer.appendChild(descriptionProduct);
        productDetailsContainer.appendChild(nutriscore);
        productDetailsContainer.appendChild(nutritionalTable);
      });
    })
    .catch((err) => console.error(err));
}
