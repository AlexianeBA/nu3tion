function createAccount() {
  var userName = document.getElementById("user_name").value;
  var firstName = document.getElementById("first_name").value;
  var lastName = document.getElementById("last_name").value;
  var age = document.getElementById("age").value;
  var email = document.getElementById("signup-email").value;
  var password = document.getElementById("signup-password").value;

  let formData = {
    user_name: userName,
    first_name: firstName,
    last_name: lastName,
    age: age,
    email: email,
    password: password,
  };

  fetch("http://127.0.0.1:8001/add_user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      console.log(formData);
      if (response.status === 200) {
        window.location.href = "index.html";
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

const signup_form = document.getElementById("validate_sign_up_form");
signup_form.addEventListener("click", () => {
  console.log("Le bouton a été cliqué !");
  createAccount();
});
