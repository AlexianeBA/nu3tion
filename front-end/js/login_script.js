const btn_login = document.getElementById("btn-connexion");
btn_login.addEventListener("click", function () {
  login();
});

function login() {
  var email = document.getElementById("signin-email").value;
  var password = document.getElementById("signin-password").value;

  let formData = {
    email: email,
    password: password,
  };
  console.log(formData);

  fetch("http://127.0.0.1:8001/login", {
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        document.getElementById("login-connexion").style.display = "none";
        document.getElementById("login-create-account").style.display = "none";
        document.getElementById("logout-btn").style.display = "block";
        document.getElementById("login-message").style.display = "block";
        document.getElementById("favorite-page").style.display = "block";

        return response.json();
      } else {
        const invalid = "Nom d'utilisateur et/ou mot de passe non valide";
        alert(invalid);
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
}

function logout() {
  document.cookie =
    "autLogin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; path=/;";
  document.getElementById("login-connexion").style.display = "block";
  document.getElementById("login-create-account").style.display = "block";
  document.getElementById("logout-btn").style.display = "none";
  document.getElementById("login-message").style.display = "none";
  document.getElementById("favorite-page").style.display = "none";
}
const logoutButton = document.getElementById("logout-btn");
logoutButton.addEventListener("click", logout);
