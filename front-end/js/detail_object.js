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

        const nutriscoreA = document.createElement("p");
        const nutriscoreB = document.createElement("p");
        const nutriscoreC = document.createElement("p");
        const nutriscoreD = document.createElement("p");
        const nutriscoreE = document.createElement("p");
        const nutritionalTable = document.createElement("table");
        nutriscoreA.classList.add("nutriscore-A");
        nutriscoreB.classList.add("nutriscore-B");
        nutriscoreC.classList.add("nutriscore-C");
        nutriscoreD.classList.add("nutriscore-D");
        nutriscoreE.classList.add("nutriscore-E");

        titleProduct.textContent =
          element.nom_produit +
          " - " +
          element.marque +
          " - " +
          element.quantite_produit;

        const etoile = document.createElement("i");
        etoile.classList.add("fa-regular", "fa-star");
        const detailsProduct = document.createElement("div");
        const nomProduit = document.createElement("p");
        const marque = document.createElement("p");
        const quantite = document.createElement("p");
        const origine = document.createElement("p");
        const information = document.createElement("p");
        const categorie = document.createElement("p");
        const conservation = document.createElement("p");
        nomProduit.textContent = "Nom du produit: " + element.nom_produit;
        marque.textContent = "Marque du produit: " + element.marque;
        quantite.textContent =
          "Quantité du produit: " + element.quantite_produit;
        origine.textContent = "Origine du produit: " + element.origine;
        information.textContent =
          "Informations complémentaires: " + element.information;
        categorie.textContent = "Catégorie du produit: " + element.categories;
        conservation.textContent =
          "Conseil de conservation: " + element.conservation;
        detailsProduct.classList.add("details-product");
        detailsProduct.appendChild(nomProduit);
        detailsProduct.appendChild(marque);
        detailsProduct.appendChild(quantite);
        detailsProduct.appendChild(origine);
        detailsProduct.appendChild(information);
        detailsProduct.appendChild(categorie);
        detailsProduct.appendChild(conservation);

        nutriscore.textContent =
          "Nutriscore: " + element.nutriscore.toUpperCase();
        var nutriscoreElement = null;

        if (element.nutriscore === "A") {
          nutriscoreElement = document.getElementById("nutriscore-A");
        } else if (element.nutriscore === "B") {
          nutriscoreElement = document.getElementById("nutriscore-B");
        } else if (element.nutriscore === "C") {
          nutriscoreElement = document.getElementById("nutriscore-C");
        } else if (element.nutriscore === "D") {
          nutriscoreElement = document.getElementById("nutriscore-D");
        } else if (element.nutriscore === "E") {
          nutriscoreElement = document.getElementById("nutriscore-E");
        }

        var allNutriScoreElements = document.querySelectorAll("#nutriscore p");
        allNutriScoreElements.forEach(function (element) {
          element.style.display = "none";
        });

        if (nutriscoreElement) {
          nutriscoreElement.style.display = "block";
        }

        const tableHeader = ["Nutriment", "Quantités en grammes"];
        const headerRow = document.createElement("tr");
        tableHeader.forEach((headerText) => {
          const headerCellule = document.createElement("th");
          headerCellule.textContent = headerText;

          headerRow.appendChild(headerCellule);
        });

        nutritionalTable.appendChild(headerRow);
        const nutriments = [
          { label: "Kcal: ", value: element.kcal },
          { label: "Matières grasses: ", value: element.matieres_grasse },
          {
            label: "Matières grasses saturées: ",
            value: element.matieres_grasse_saturees,
          },
          { label: "Proteines: ", value: element.proteines },
          { label: "Sel: ", value: element.sel },
          { label: "Sodium: ", value: element.sodium },
          { label: "Sucre: ", value: element.sucre },
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
        nutritionalTable.classList.add("product-table");
        productDetailsContainer.appendChild(titleProduct);
        productDetailsContainer.appendChild(etoile);
        productDetailsContainer.appendChild(detailsProduct);

        productDetailsContainer.appendChild(nutriscore);
        productDetailsContainer.appendChild(nutritionalTable);
      });
    })
    .catch((err) => console.error(err));
}
