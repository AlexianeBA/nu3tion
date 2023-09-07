function getFavoriteProducts(id_user) {
  fetch("http://127.0.0.1:8001/get_all_favorite_by_user/" + id_user)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
      }
      return response.json();
    })
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
      console.error("Erreur de fetch :", error);
    });
}

window.addEventListener("load", function () {
  getFavoriteProducts();
});
