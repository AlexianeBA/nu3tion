function displayFavorite(userID, productFavoriteDiv) {
  fetch(`http://127.0.0.1:8001/get_all_favorite_by_user/${userID}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erreur lors de la récupération des favoris");
      }
    })
    .then((data) => {
      if (!productFavoriteDiv) {
        console.error("La variable productFavoriteDiv est undefined.");
        return; // Exit early if productFavoriteDiv is undefined.
      }

      data.forEach((favorite) => {
        const productDiv = document.createElement("div");
        const bin = document.createElement("i");
        bin.setAttribute("id", favorite.id);
        bin.classList.add("fa-solid");
        bin.classList.add("fa-trash-can");
        const productName = document.createElement("p");
        productName.textContent = favorite.nom_produit;

        const productImg = document.createElement("img");
        productImg.src = favorite.img_produit;
        productDiv.appendChild(bin);
        productDiv.appendChild(productName);
        productDiv.appendChild(productImg);
        productDiv.addEventListener("click", () => {
          removeFavorite(favorite.id);
        });
        productFavoriteDiv.appendChild(productDiv);
      });
    })
    .catch((error) => {
      console.error("Erreur lors de la requête GET :", error);
    });
}

const userIdCookie = getCookie("user_id");
const productFavoriteDiv = document.getElementById("product-favorite");

if (userIdCookie) {
  displayFavorite(userIdCookie, productFavoriteDiv);
}

// delete product
const bin = getElementById;
