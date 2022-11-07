const usernameEl = document.getElementById("username-el")
const passwordEl = document.getElementById("password-el")
const loginEl = document.getElementById("login-el")

class testHash {
    constructor() {
        this.table = new Array(127)
        this.size = 0
    }
}

const users = new Map()
users.set("Alice", "Mypassword123!")

// Hardcoded user credentials... for now
let user = {
    Username: "Alice",
    Password: "Mypassword123!"
}




loginEl.addEventListener("click", function() {

//    localStorage.setItem(usernameEl.value, passwordEl.value)
//    window.location.reload()
})