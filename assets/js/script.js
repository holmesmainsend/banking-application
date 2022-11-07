const usernameEl = document.getElementById("username-el")
const passwordEl = document.getElementById("password-el")
const loginEl = document.getElementById("login-el")

function seasoning(password) {
    const initialSalt = new Uint32Array(1000)
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
    let hashVal = 0
    let midHashArr = []
    let finalHash = ""
    let finalHashCounter = 0
    let finalHashArr = []
    for(let i = 0; i < salt.length; i++) {
        let val = salt.charCodeAt(i)
        hashVal = ((hashVal << 6) - hashVal) + val
        hashVal = hashVal & hashVal
        midHashArr[i] = Math.abs(hashVal)
    }
    for(let i = 0; i < midHashArr.length; i++) {
        singleVal = midHashArr[i] % 128
            if((singleVal < 123 && singleVal > 96) || (singleVal < 91 && singleVal > 64)) {
                finalHashArr[finalHashCounter] = String.fromCharCode(singleVal)
                finalHashCounter++
            } else if(singleVal < 58 && singleVal > 47) {
                finalHashArr[finalHashCounter] = singleVal
                finalHashCounter++
            }
    }
    let i = 0
    while(finalHash.length < 200) {
        finalHash += finalHashArr[i]
        i++
        if(finalHash.length == 200) {
            break
        }
    }
    return finalHash
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

let user4 = new HashTable("Jeffrey", "117el8tion")
console.log(user4.hash)



loginEl.addEventListener("click", function() {
//    localStorage.setItem(usernameEl.value, passwordEl.value)
//    window.location.reload()
})