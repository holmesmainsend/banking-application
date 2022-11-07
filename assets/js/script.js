const usernameEl = document.getElementById("username-el")
const passwordEl = document.getElementById("password-el")
const loginEl = document.getElementById("login-el")

class hashTable {
    constructor() {
        this.table = new Array(127)
        this.size = 0
    }
    
    testHash(password) {
        const array = 
        salt = ""
    }

    set(password, value) {
        const index = this.testHash(password)
        this.table[index] = [password, value]
        this.size++
    }
}


const initialSalt = new Uint32Array(100)
modifiedSalt = self.crypto.getRandomValues(initialSalt)
for(let i = 0; i < modifiedSalt.length; i++) {
    modifiedSalt[i] %= 128
    console.log(modifiedSalt[i])
}


const hash1 = new hashTable()
//hash1.set("Alice", "Mypassphrase123")
//console.log(hash1.testHash("Alice"))


loginEl.addEventListener("click", function() {
//    localStorage.setItem(usernameEl.value, passwordEl.value)
//    window.location.reload()
})