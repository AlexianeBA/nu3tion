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

        const productName = document.createElement("p");
        productName.textContent = favorite.nom_produit;

        const productImg = document.createElement("img");
        productImg.src = favorite.img_produit;

        productDiv.appendChild(productName);
        productDiv.appendChild(productImg);

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

// supprimer

function removeFavorite(productID) {
  const userIdCookie = getCookie("user_id");

  if (userIdCookie) {
    fetch(
      `http://127.0.0.1:8001/delete_favorite_from_user/${userIdCookie}/${productID}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Produit supprimé des favoris avec succès !");
          window.location.reload();
        } else {
          console.error("Erreur lors de la suppression des favoris");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête  : " + error);
      });
  } else {
    console.error("L'ID de l'utilisateur n'a pas été trouvé dans le cookie.");
  }
}
