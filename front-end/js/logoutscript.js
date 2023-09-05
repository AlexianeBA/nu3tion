function logout() {
  document.cookie =
    "autLogin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; path=/;";
  window.location.href = "index.html";
}
const logoutButton = document.getElementById("logout-btn");
logoutButton.addEventListener("click", logout);
