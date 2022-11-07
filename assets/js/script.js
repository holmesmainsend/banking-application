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

// console.log(seasoning("Mypassword123!"))




loginEl.addEventListener("click", function() {
//    localStorage.setItem(usernameEl.value, passwordEl.value)
//    window.location.reload()
})