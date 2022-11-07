const usernameEl = document.getElementById("username-el")
const passwordEl = document.getElementById("password-el")
const loginEl = document.getElementById("login-el")

loginEl.addEventListener("click", function() {
    localStorage.setItem("lastname", "Alice")
    window.location.reload()
})