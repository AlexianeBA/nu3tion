function messageConnexion() {
  document.getElementById("login-message").style.display = "block";
}

document
  .getElementById("btn-connexion")
  .addEventListener("click", function (event) {
    event.preventDefault();

    var email = document.getElementById("signin-email").value;
    var password = document.getElementById("signin-password").value;

    console.log(email);
    console.log(password);

    let formData = { email: email, password: password };
    console.log(formData);
    fetch("http://127.0.0.1:8001/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 200) {
          messageConnexion(); // Appeler la fonction pour afficher le message

          window.location.href = "index.html";
          return response.json();
        } else {
          const unvalid = "Nom d'utilisateur et/ou mot de passe non valide";
          alert(unvalid);
        }
      })
      .then((data) => {
        document.cookie = `autLogin=${JSON.stringify(
          data
        )}; max-age=3600; secure; path=/`;
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

document
  .getElementById("create_user_link")
  .addEventListener("click", function (event) {
    // event.preventDefault();
    creatAccount(event);
    $("#loginModal").modal("hide");
  });

function creatAccount(event) {
  event.preventDefault();

  const createAccountForm = document.getElementById("createAccountForm");
  createAccountForm.style.display = "block";
}
