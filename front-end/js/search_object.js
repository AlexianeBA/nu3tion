const btnSearch = document.getElementById("btn-search");

btnSearch.addEventListener("click", () => {
  const searchInput = document.getElementById("searchInput").value;
  window.location.href = "liste.html?search=" + encodeURIComponent(searchInput);
});

const listeProducts = document.getElementById("listeProducts");

const urlParams = new URLSearchParams(window.location.search);
const searchInput = urlParams.get("search");

fetch("http://127.0.0.1:8001/get_aliment_by_name?nom_produit=" + searchInput)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      const card = document.createElement("div");
      const img = document.createElement("img");
      const title = document.createElement("p");
      const nutriscore = document.createElement("p");
      img.alt = element.img_produit;
      img.src = element.img_produit;
      title.textContent = element.nom_produit;
      nutriscore.textContent = element.nutriscore;
      img.classList.add("img-product-style");
      card.classList.add("card-product");
      card.setAttribute("id", element.off_id);
      card.setAttribute(
        "onclick",
        "get_detail_product(" + element.off_id + ")"
      );
      title.classList.add("title-product");
      nutriscore.classList.add("nutriscore-product");
      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(nutriscore);
      listeProducts.appendChild(card);
    });
  })
  .catch((err) => console.error(err));
