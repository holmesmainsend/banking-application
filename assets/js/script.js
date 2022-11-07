const usernameEl = document.getElementById("username-el")
const passwordEl = document.getElementById("password-el")
const loginEl = document.getElementById("login-el")

function seasoning(password) {
    const initialSalt = new Uint32Array(200)
    modifiedSalt = self.crypto.getRandomValues(initialSalt)
    let finalSalt = []
    finalSaltCounter = 0
    for(let i = 0; i < modifiedSalt.length; i++) {
        modifiedSalt[i] %= 128
        if((modifiedSalt[i] < 123 && modifiedSalt[i] > 96) || (modifiedSalt[i] < 91 && modifiedSalt[i] > 64)) {
            finalSalt[finalSaltCounter] = String.fromCharCode(modifiedSalt[i])
            finalSaltCounter++
        } else if(modifiedSalt[i] < 58 && modifiedSalt[i] > 47) {
            finalSalt[finalSaltCounter] = modifiedSalt[i]
            finalSaltCounter++
        }
    }
    for (let i = 0; i < finalSaltCounter; i++) {
        password += finalSalt[i]
    }
    return password
}

function hasher(salt) {
    return "choco" + salt
}

class HashTable {
    constructor(username, password) {
        this.username = username
        this.hash = hasher(seasoning(password))
    }
}

let user1 = new HashTable("Alice", "Mypassword123!")
console.log(user1.hash)

let user2 = new HashTable("Steve", "Thisisthepassword@#")
console.log(user2.hash)

let user3 = new HashTable("Joe", "Metsamillion67")
console.log(user3.hash)



loginEl.addEventListener("click", function() {
//    localStorage.setItem(usernameEl.value, passwordEl.value)
//    window.location.reload()
})