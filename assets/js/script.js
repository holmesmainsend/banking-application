const usernameEl = document.getElementById("username-el")
const passwordEl = document.getElementById("password-el")
const loginEl = document.getElementById("login-el")

class hashTable {
    constructor() {
        this.table = new Array(127)
        this.size = 0
    }
    
    testHash(password) {
        let hash = 0
        for(let i = 0; i < password.length; i++) {
            hash += password.charCodeAt(i)
        }
        return hash % this.table.length
    }

    set(password, value) {
        const index = this.testHash(password)
        this.table[index] = [password, value]
        this.size++
    }
}

const hash1 = new hashTable()
hash1.set("Alice", "Mypassphrase123")
console.log(hash1.testHash("Alice"))


loginEl.addEventListener("click", function() {
//    localStorage.setItem(usernameEl.value, passwordEl.value)
//    window.location.reload()
})