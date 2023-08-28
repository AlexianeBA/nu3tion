function get_detail_product(off_id) {
  fetch("http://127.0.0.1:8001/get_aliment_by_id?off_id=" + off_id)
    .then((response) => response.json())
    .then((element) => {
      //informations générales
      document.getElementById("img_produit_img").src = element.img_produit;
      document.getElementById("nom-produit").textContent = element.nom_produit;
      document.getElementById("marque").textContent =
        "Marque : " + element.marque;
      document.getElementById("quantite").textContent =
        "Quantité : " + element.quantite_produit;
      document.getElementById("origine").textContent =
        "Origine : " + (element.origine || "Non spécifiée");
      document.getElementById("information").textContent =
        "Information : " + (element.information || "Non spécifiée");
      document.getElementById("categories").textContent =
        "Catégories : " + element.categories;
      document.getElementById("conservation").textContent =
        "Conservation : " + (element.conservation || "Non spécifiée");

      //nutriscore
      document.getElementById("nutriscore").textContent =
        "Nutriscore : " + element.nutriscore;

      //valeurs nutritionnelles
      document.getElementById("kcal").textContent = "Kcal : " + element.kcal;
      document.getElementById("matieres_grasse").textContent =
        "Matières grasses : " + element.matieres_grasse;
      document.getElementById("matieres_grasse_saturees").textContent =
        "Matières grasses saturées : " + element.matieres_grasse_saturees;
      document.getElementById("proteines").textContent =
        "Protéines : " + element.proteines;
      document.getElementById("sel").textContent = "Sel : " + element.sel;
      document.getElementById("sodium").textContent =
        "Sodium : " + element.sodium;
      document.getElementById("sucre").textContent = "Sucre : " + element.sucre;
    })
    .catch((err) => console.error(err));
}
