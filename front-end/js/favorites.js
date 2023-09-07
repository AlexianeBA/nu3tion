function getFavoriteProducts(id) {
  fetch("http://127.0.0.1:8001/favorite_product?off_id=" + id)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const favoriteProducts = data.products;

        const productFavorite = document.getElementById("product-favorite");
        productFavorite.innerHTML = "";

        if (favoriteProducts.length === 0) {
          productFavorite.innerHTML = "Aucun produit favori pour le moment.";
        } else {
          favoriteProducts.forEach((element) => {
            const productElement = document.createElement("div");
            productElement.textContent = element.nom_produit;

            productFavorite.appendChild(productElement);
          });
        }
      } else {
        console.error(data.error);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

window.addEventListener("load", function () {
  getFavoriteProducts();
});
