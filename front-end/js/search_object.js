const btnSearch = document.getElementById("btn-search");

btnSearch.addEventListener("click", () => {
  const searchInput = document.getElementById("searchInput").value;
  window.location.href = "liste.html?search=" + encodeURIComponent(searchInput);
});

const listeProducts = document.getElementById("listeProducts");
const productContainer = document.getElementById("product-container");

const urlParams = new URLSearchParams(window.location.search);
const searchInput = urlParams.get("search");

fetch("http://127.0.0.1:8001/get_aliment_by_name?nom_produit=" + searchInput)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      const card = document.createElement("button");
      const img = document.createElement("img");
      const title = document.createElement("p");
      const display_product = document.createElement("button");
      img.alt = element.img_produit;
      img.src = element.img_produit;
      title.textContent = element.nom_produit;
      display_product.textContent = "Fiche produit";
      img.classList.add("img-product-style");
      card.classList.add("card-product");
      title.classList.add("title-product");
      display_product.classList.add("display-product-btn");
      title.classList.add("title-product");

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(display_product);
      card.addEventListener("click", () => {
        window.location.href =
          "detail_product.html?product=" + encodeURIComponent(element.off_id);
      });
      listeProducts.appendChild(card);
    });
  })
  .catch((err) => console.error(err));
