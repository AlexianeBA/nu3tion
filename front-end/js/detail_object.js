const golmon = new URLSearchParams(window.location.search);
const pageSize = golmon.get("product");
get_detail_product(pageSize);
function get_detail_product(id) {
  fetch("http://127.0.0.1:8001/get_aliment_by_id?off_id=" + id)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        const divDetailsProduct = document.createElement("div");
        divDetailsProduct.classList.add("div-details");
        const productDetailsContainer =
          document.getElementById("product-details");
        const titleProduct = document.createElement("h2");
        const nutriscoreContainer = document.createElement("div");
        nutriscoreContainer.classList.add("nutriscore-container");
        const nutriscoreA = document.createElement("p");
        const nutriscoreB = document.createElement("p");
        const nutriscoreC = document.createElement("p");
        const nutriscoreD = document.createElement("p");
        const nutriscoreE = document.createElement("p");
        const nutritionalTable = document.createElement("table");

        titleProduct.textContent =
          element.nom_produit +
          " - " +
          element.marque +
          " - " +
          element.quantite_produit;
        const imgProduct = document.createElement("img");
        imgProduct.src = element.img_produit;
        imgProduct.classList.add("img-product");

        const etoile = document.createElement("i");

        etoile.classList.add("fa-regular", "fa-star", "favorite-button");
        titleProduct.appendChild(etoile);
        let isFavorite = false;

        etoile.addEventListener("click", function () {
          isFavorite = !isFavorite;
          etoile.classList.toggle("fa-solid");
          etoile.classList.toggle("favorite-filled");
        });

        const detailsProduct = document.createElement("div");
        const nomProduit = document.createElement("p");
        const marque = document.createElement("p");
        const quantite = document.createElement("p");
        const origine = document.createElement("p");
        const information = document.createElement("p");
        const categorie = document.createElement("p");
        const conservation = document.createElement("p");
        nomProduit.innerHTML =
          "<strong>Nom du produit:</strong> " + element.nom_produit;
        marque.innerHTML =
          "<strong>Marque du produit: </strong> " + element.marque;
        quantite.innerHTML =
          "<strong>Quantité du produit: </strong>" + element.quantite_produit;
        origine.innerHTML =
          "<strong>Origine du produit: </strong>" + element.origine;
        information.innerHTML =
          "<strong>Informations complémentaires: </strong>" +
          element.information;
        categorie.innerHTML =
          "<strong>Catégorie du produit: </strong>" + element.categories;
        conservation.innerHTML =
          "<strong>Conseil de conservation: </strong>" + element.conservation;
        detailsProduct.classList.add("details-product");
        detailsProduct.appendChild(titleProduct);

        detailsProduct.appendChild(nomProduit);
        detailsProduct.appendChild(marque);
        detailsProduct.appendChild(quantite);
        detailsProduct.appendChild(origine);
        detailsProduct.appendChild(information);
        detailsProduct.appendChild(categorie);
        detailsProduct.appendChild(conservation);

        nutriscoreContainer.textContent =
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
        nutriscoreContainer.appendChild(nutriscoreA);
        nutriscoreContainer.appendChild(nutriscoreB);
        nutriscoreContainer.appendChild(nutriscoreC);
        nutriscoreContainer.appendChild(nutriscoreD);
        nutriscoreContainer.appendChild(nutriscoreE);
        nutriscoreA.classList.add("nutriscore-A");
        nutriscoreB.classList.add("nutriscore-B");
        nutriscoreC.classList.add("nutriscore-C");
        nutriscoreD.classList.add("nutriscore-D");
        nutriscoreE.classList.add("nutriscore-E");
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
        // productDetailsContainer.appendChild(titleProduct);
        // productDetailsContainer.appendChild(etoile);
        divDetailsProduct.appendChild(imgProduct);
        divDetailsProduct.appendChild(detailsProduct);
        productDetailsContainer.appendChild(divDetailsProduct);
        productDetailsContainer.appendChild(nutriscoreContainer);
        productDetailsContainer.appendChild(nutritionalTable);
      });
    })
    .catch((err) => console.error(err));
}
