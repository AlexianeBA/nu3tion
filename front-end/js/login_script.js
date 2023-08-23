function login() {
  var email = document.getElementById("signin-email").value;
  var password = document.getElementById("signin-password").value;

  let formData = {
    email: email,
    password: password,
  };

  fetch("http://127.0.0.1:8001/login", {
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        window.location.href = "logout.html";
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

const connected = document.getElementById("btn-connexion");
connected.addEventListener("click", () => {
  console.log("bouton cliqué");
  login();
});

function logout() {
  document.cookie =
    "autLogin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; path=/;";
  window.location.href = "index.html";
}
const logoutButton = document.getElementById("logout-btn");
logoutButton.addEventListener("click", logout);
