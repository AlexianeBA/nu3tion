const forgetPassword = document.getElementById("link-forget-password");
forgetPassword.addEventListener("click", changePassword);

function changePassword() {
  var email = document.getElementById("signin-email").value;
  var newPassword = prompt("Entrez le nouveau mot de passe :");

  if (newPassword === null) {
    return;
  }
  let formData = {
    email: email,
    nouveau_mot_de_passe: newPassword,
  };

  fetch(`http://127.0.0.1:8001/change_password/${email}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.status === 200) {
        alert("Mot de passe mis à jour avec succès");
      } else if (response.status === 404) {
        alert("Utilisateur non trouvé");
      } else {
        alert("Erreur lors de la mise à jour du mot de passe");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
const forgetPasswordLink = document.getElementById("link-forget-password");
forgetPasswordLink.addEventListener("click", changePassword);
