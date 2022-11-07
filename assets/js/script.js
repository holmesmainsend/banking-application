const usernameEl = document.getElementById("username-el")
const passwordEl = document.getElementById("password-el")
const loginEl = document.getElementById("login-el")

class HashTable {
    constructor() {
        this.values = {}
        this.length = 0
        this.size = 0
    }

    hasher(username) {
        return username.toString().length % this.size
    }
    
    insert(username, value) {
        const hash = this.hasher(username)
        if (!this.values.hasOwnProperty(hash)) {
          this.values[hash] = {}
        }
        if (!this.values[hash].hasOwnProperty(username)) {
           this.length++
        }
        this.values[hash][username] = value
    }
    
      search(username) {
        const hash = this.hasher(username)
        if (this.values.hasOwnProperty(hash) && this.values[hash].hasOwnProperty(username)) {
            return this.values[hash][username]
        } else {
            return null
        }
    }
}

const hashTable = new HashTable()
hashTable.insert("Alice", "Mypassword123!")
hashTable.insert("Steve", "Gorockcats77@1")
hashTable.insert("Joe", "Thisisnotap@ssw0rd")

console.log(hashTable.search("Alice"))



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

// console.log(seasoning("Mypassword123!"))




loginEl.addEventListener("click", function() {
//    localStorage.setItem(usernameEl.value, passwordEl.value)
//    window.location.reload()
})