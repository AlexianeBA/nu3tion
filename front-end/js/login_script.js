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
        return response.json().then((data) => {
          const userId = data;

          const cookieName = "user_id";
          const cookieValue = userId;
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 1);
          document.cookie = `${cookieName}=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/`;
          window.location.reload();
        });
      } else {
        const invalid = "Nom d'utilisateur et/ou mot de passe non valide";
        alert(invalid);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function logout() {
  document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.reload();
}
const logoutButton = document.getElementById("logout-btn");
logoutButton.addEventListener("click", logout);
function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else {
    begin += 2;
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = dc.length;
    }
  }

  return decodeURI(dc.substring(begin + prefix.length, end));
}
function displayHeader() {
  console.log("cc");
  var myCookie = getCookie("user_id");

  if (myCookie == null) {
    document.getElementById("login-connexion").style.display = "block";
    document.getElementById("login-create-account").style.display = "block";
    document.getElementById("logout-btn").style.display = "none";
    document.getElementById("login-message").style.display = "none";
    document.getElementById("favorite-page").style.display = "none";
  } else {
    document.getElementById("login-connexion").style.display = "none";
    document.getElementById("login-create-account").style.display = "none";
    document.getElementById("logout-btn").style.display = "block";
    document.getElementById("login-message").style.display = "block";
    document.getElementById("favorite-page").style.display = "block";
  }
}
displayHeader();
