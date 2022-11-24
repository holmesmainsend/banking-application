// TODO: finish README

// TODO: record video, include on GitHub repo

/*
    Future plans (move to README):
        - move major algorithms (salting, hashing, session key generation) to separate Java layer
        - add SQL database layer for user credentials, balances, etc.
        - add stricter password requirements
        - add separate admin/server dashboard
*/

// TODO: write Word Doc for project


// Initial page variables (for event listener access)
let usernameRegisterEl = "";
let passwordRegisterEl = "";
let passwordDuplicateEl = "";
let returningUserEl = "";
let usernameEl = "";
let passwordEl = "";
let loginEl = "";
let failedLoginEl = "";
let backstepEl = "";

/*
    Below are the first 5000 digits of pi, stored as a string (source: 
    https://clickcalculators.com/pi-calculator/5000). 
    
    Why store these digits in a string instead of in a floating-point number? 
        This is because JavaScript does not permit very long floats (> 17 decimal places) without losing 
        precision. By storing them in a string, the program has access to all the first 5000 digits of pi. 
    
    Why use a string and not an integer, simply removing the decimal point after the 3? 
        JavaScript does not permit regular integers longer than 15 digits, creating the same problem as with 
        floats except now converting to scientific notation instead. The net result of this is many trailing 
        zeroes, which for this program's purposes would be useless. 
    
    In 2020, JavaScript introduced a new data type, BigInt, to address this issue of masssive integers. Why, 
    then, still use a string instead of a BigInt? 
        This has to do with the role pi plays in this algorithm: no mathematical operations are being performed 
        on pi itself. It remains constant, and can exist as an unchanging string. The program does not need to 
        hold it as a data type capable of mathematical modification. Rather, the digits of pi are used as a 
        reference for the operations performed in the seasoning function below.
        
    Why include pi at all?
        Pi is irrational and its digits never repeat in a cyclical fashion. However, it cannot be called 
        "random" in the traditional sense because its digits are always the same. The second digit of pi is 
        always 1, the third is always 4, and so on. According to David H. Bailey of the Department of Energy's
        National Energy Research Scientific Computing Center, numbers like pi are "normal", meaning "their 
        digits are random in a certain statistical sense." This normality is valuable for this program because 
        it means each time the seasoning function is run for a given user (assuming they keep the same username 
        and password), the exact same "random series" of digits will be used to generate their salt. The 
        security assumption being made is that the use of pi would not be publicly known, thereby making it 
        more difficult for malicious third parties to determine how the seasoning function operates. The added
        benefit is that for any implementation of this program, pi is easily located on the web. It 
        could be used in many different contexts with minimal demand for coordination between different 
        parties (source for the above information and quote: 
        https://www2.lbl.gov/Science-Articles/Archive/pi-random.html).

    Why not use a dedicated library to generate a random number instead, or a cryptographically 
    secure online random number generator?
        Either one of these methods would produce a different value with each function call. They can be 
        considered random, but that comes at a cost to this program. Not only would the program have to 
        generate a new random number each time, but doing so would break the entire hashing algorithm. Hashing 
        algorithms produce an identical output for a specific input. Random number generators would produce 
        different digits each time, meaning (for the seasoning function as it currently stands) a different 
        salt even for the same user credentials, ultimately meaning a different hash value for this same user 
        with each login or transaction. This would complicate the user verification process since the database 
        would not be able to hold a constant hash value for a given user but would have to continuously 
        generate new hashes for every user. In addition, it is possible that constantly generating new hashes 
        would provide malicious third parties with more hints and insights into the hashing algorithm's inner 
        workings. 
        
        There are already dedicated libraries for everything in this program - from the salting to the hashing 
        to the session key generation. Using those pre-built solutions, however, would defeat the goal of this 
        final project, namely to implement one's own original approach to their final topic (in this case, 
        hashing algorithms and symmetric key cryptography).
*/
const piString = "31415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632788659361533818279682303019520353018529689957736225994138912497217752834791315155748572424541506959508295331168617278558890750983817546374649393192550604009277016711390098488240128583616035637076601047101819429555961989467678374494482553797747268471040475346462080466842590694912933136770289891521047521620569660240580381501935112533824300355876402474964732639141992726042699227967823547816360093417216412199245863150302861829745557067498385054945885869269956909272107975093029553211653449872027559602364806654991198818347977535663698074265425278625518184175746728909777727938000816470600161452491921732172147723501414419735685481613611573525521334757418494684385233239073941433345477624168625189835694855620992192221842725502542568876717904946016534668049886272327917860857843838279679766814541009538837863609506800642251252051173929848960841284886269456042419652850222106611863067442786220391949450471237137869609563643719172874677646575739624138908658326459958133904780275900994657640789512694683983525957098258226205224894077267194782684826014769909026401363944374553050682034962524517493996514314298091906592509372216964615157098583874105978859597729754989301617539284681382686838689427741559918559252459539594310499725246808459872736446958486538367362226260991246080512438843904512441365497627807977156914359977001296160894416948685558484063534220722258284886481584560285060168427394522674676788952521385225499546667278239864565961163548862305774564980355936345681743241125150760694794510965960940252288797108931456691368672287489405601015033086179286809208747609178249385890097149096759852613655497818931297848216829989487226588048575640142704775551323796414515237462343645428584447952658678210511413547357395231134271661021359695362314429524849371871101457654035902799344037420073105785390621983874478084784896833214457138687519435064302184531910484810053706146806749192781911979399520614196634287544406437451237181921799983910159195618146751426912397489409071864942319615679452080951465502252316038819301420937621378559566389377870830390697920773467221825625996615014215030680384477345492026054146659252014974428507325186660021324340881907104863317346496514539057962685610055081066587969981635747363840525714591028970641401109712062804390397595156771577004203378699360072305587631763594218731251471205329281918261861258673215791984148488291644706095752706957220917567116722910981690915280173506712748583222871835209353965725121083579151369882091444210067510334671103141267111369908658516398315019701651511685171437657618351556508849099898599823873455283316355076479185358932261854896321329330898570642046752590709154814165498594616371802709819943099244889575712828905923233260972997120844335732654893823911932597463667305836041428138830320382490375898524374417029132765618093773444030707469211201913020330380197621101100449293215160842444859637669838952286847831235526582131449576857262433441893039686426243410773226978028073189154411010446823252716201052652272111660396665573092547110557853763466820653109896526918620564769312570586356620185581007293606598764861179104533488503461136576867532494416680396265797877185560845529654126654085306143444318586769751456614068007002378776591344017127494704205622305389945613140711270004078547332699390814546646458807972708266830634328587856983052358089330657574067954571637752542021149557615814002501262285941302164715509792592309907965473761255176567513575178296664547791745011299614890304639947132962107340437518957359614589019389713111790429782856475032031986915140287080859904801094121472213179476477726224142548545403321571853061422881375850430633217518297986622371721591607716692547487389866549494501146540628433663937900397692656721463853067360965712091807638327166416274888800786925602902284721040317211860820419000422966171196377921337575114959501566049631862947265473642523081770367515906735023507283540567040386743513622224771589150495309844489333096340878076932599397805419341447377441842631298608099888687413260472";

// Adds salt to password based on username, preparing it for hashing function
function seasoning(username, password) {
    let userDigits = 1;
    const modifiedSalt = [];
    let modifiedSaltCounter = 0;

    // Generates initial digits from ASCII values of username chars, adds to userDigits
    for(let i = 0; i < username.length; i++) {
        userDigits += username.charCodeAt(i) * username.length;
    }

    // Expansion into modifiedSalt array (multiplication by userDigits from specific starting digit of pi)
    for(let i = userDigits % 128; i < 3000; i++) {
        modifiedSalt[modifiedSaltCounter] = parseInt(piString.substring(i, i + 1)) + i * userDigits;
        modifiedSaltCounter++;
    }

    const finalSalt = [];
    finalSaltCounter = 0;

    /*
        Transferring (into the finalSalt array) only those array values of modifiedSalt that, after modulo 128, 
        happen to fall within the ASCII values for either lowercase letters, uppercase letters, or numbers.
        These ASCII values are then converted into their corresponding character or number.
    */
    for(let i = 0; i < modifiedSalt.length; i++) {
        modifiedSalt[i] %= 128;
        if((modifiedSalt[i] < 123 && modifiedSalt[i] > 96) || (modifiedSalt[i] < 91 && modifiedSalt[i] > 64)
           || (modifiedSalt[i] < 58 && modifiedSalt[i] > 47)) {
            finalSalt[finalSaltCounter] = String.fromCharCode(modifiedSalt[i]);
            finalSaltCounter++;
        }
    }

    // Adding the final salt to the original password
    for (let i = 0; i < finalSaltCounter; i++) {
        password += finalSalt[i];
    }
    return password;
}

// Takes salted password and outputs final hash
function hasher(salt) {
    let hashVal = 0;
    const midHashArr = [];
    let finalHash = "";
    let finalHashCounter = 0;
    const finalHashArr = [];

    /*
        The hashing algorithm begins with converting the characters and numbers of the salted password back
        into their corresponding ASCII codes. However, it diverges from the salting algorithm by using
        a bitwise left shift (<<) operator and does not directly rely on pi. The hashVal is initially zero 
        but with each iteration of the loop it is newly generated, dependent on the previous hashVal and the 
        ASCII value for the current index of the salt. The absolute value of each hashVal is then inserted 
        into the midHashArr array. Without this absolute value conversion, the hashes all become undefined.
    */
    for(let i = 0; i < salt.length; i++) {
        let val = salt.charCodeAt(i);
        hashVal = ((hashVal << 4) - val);
        midHashArr[i] = Math.abs(hashVal);
    }

    // Converting each index back into corresponding letter or number, if applicable, based on ASCII code
    for(let i = 0; i < midHashArr.length; i++) {
        singleVal = midHashArr[i] % 128;
        if((singleVal < 123 && singleVal > 96) || (singleVal < 91 && singleVal > 64)
           || (singleVal < 58 && singleVal > 47)) {
            finalHashArr[finalHashCounter] = String.fromCharCode(singleVal);
            finalHashCounter++;
        }
    }

    // Forming single finalHash string from finalHashArr indices
    let i = 0;
    while(finalHash.length < 300) {
        finalHash += finalHashArr[i];
        i++;
    }

    /*
        Returning final hash string of 256 characters and numbers. This hash length was chosen arbitrarily
        (partly as a nod to the SHA-256 algorithm, despite this program bearing little similarity to it). 
        The important aspect is that each and every user's hash is the same length. This is a central 
        characteristic of hashing algorithms: variable input length but fixed output length. The shorter the
        hash length, the greater the likelihood of there being two or more different users with the same hash 
        value (a phenomenon known as a collision).
    */
    return finalHash.substring(0, 256);
}

// Creates initial user object
class HashTable {
    constructor(username, password) {
        this.username = username;
        this.hash = hasher(seasoning(username, password));
        this.balance = 0;
    }

    /*
        Generates a session key for each user via symmetric key cryptopgraphy. An LFSR is used, which is here 
        an implementation of the queue ADT. Critically, this session key is generated not from a user's hash 
        (public) or from their username (public) but from their password (private).
    */
    sessionKeyGenerator(username, password) {
        let passString = "";

        /*
            As with the salting and hashing algorithms, the ASCII code for the character at each index of the
            password is taken and added together into a single variable, the passString.
        */
        for(let i = 0; i < password.length; i++) {
            passString += password.charCodeAt(i);
        }

        // Taking each integer of passString and storing it in plainBitArr as either 1 or 0
        const plainBitArr = [];
        for(let i = 0; i < passString.length; i++) {
            plainBitArr[i] = parseInt(passString.substring(i, i + 1)) % 2;
        }

        /*
            Random (atmospheric noise) initial bits provided by https://www.random.org/bytes/. Because both 
            mathematical and array operations are being performed on these values, it is not stored as a 
            string like pi was above. If necessary a new string of key bits can be easily generated and, unlike 
            pi, can be called truly random. Even if the use of pi for the salting algorithm becomes public 
            knowledge, it will not interfere with the security of the sessionKeyGenerator function or the 
            keyBits stream. The one can be compromised without necessarily compromising the other.
        */
        const keyBits = [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1];
        
        const finalKeyStream = [];
        const cipherBitArr = [];
        let initialKeyBitXOR = 0;

        // LFSR with tap (XOR) bits at position 1 and position 3rd to last of the keyBits array
        for(let i = 0; i < 600; i++) {
            initialKeyBitXOR = keyBits[2] ^ keyBits[keyBits.length - 3];
            keyBits.unshift(initialKeyBitXOR);
            finalKeyStream[i] = keyBits.pop();
        }
        
        // Generating cipherBits from XOR of original plain bits and final key stream
        for (let i = 0; i < plainBitArr.length; i++) {
            cipherBitArr[i] = plainBitArr[i] ^ finalKeyStream[i + (finalKeyStream.length - plainBitArr.length)];
        }

        // Setting cipherBitArr as the session key for the given user
        sessionStorage.setItem(username, cipherBitArr);
        return sessionStorage.getItem(username);
    }
}

// Seeding "database" with sample users
const user1 = new HashTable("Alice", "Mypassword123!");
const user2 = new HashTable("Steve", "Thisisthepassword@#");
const user3 = new HashTable("Joe", "Metsamillion67");
const user4 = new HashTable("Jeffrey", "117el8tion");

// Array of current users
const userArray = [user1, user2, user3, user4];

// Generates user dashboard if credentials correct
function dashboardGenerator() {
    const returningUsername = usernameEl.value.trim();
    const returningPassword = passwordEl.value.trim();
    let user = 0;
    let i = 0;
    while(i < userArray.length && user === 0) {
        if(returningUsername === userArray[i].username) {
            user = userArray[i];
        }
        i++;
    }
    if(user === 0) {
        failedLoginEl.innerText = "Incorrect username and/or password";
    } else if(user.hash === hasher(seasoning(returningUsername, returningPassword))) {
        usernameEl.value = "";
        user.sessionKeyGenerator(returningUsername, returningPassword);
        document.body.innerHTML = `
        <h1>Lunome Q</h1>
        <h2>Welcome to your dashboard, ${returningUsername}</h2>
        <button type="button" id="balance-el">CHECK BALANCE</button>
        <p id="balance-display"></p>
        <p>Make Deposit:</p>
        <input type="number" id="deposit-val" min="1">
        <button type="button" id="deposit-el">SUBMIT</button>
        <p>Make Withdrawal:</p>
        <input type="number" id="withdrawal-val" min="1">
        <button type="button" id="withdrawal-el">SUBMIT</button>
        <p id="warning"></p>
        <button type="button" id="logout-el">LOGOUT</button>
        `;
        const depositVal = document.getElementById("deposit-val");
        const depositEl = document.getElementById("deposit-el");
        const balanceEl = document.getElementById("balance-el");
        const balanceDisplay = document.getElementById("balance-display");
        const withdrawalVal = document.getElementById("withdrawal-val");
        const withdrawalEl = document.getElementById("withdrawal-el");
        const warningEl = document.getElementById("warning");
        const logoutEl = document.getElementById("logout-el");

        /*
            Deposit, check balance, and withdrawal operations available to user. For each action, the program 
            checks that (a) the session key is correct for the given user and that (b) the user's intended 
            action is valid (e.g., a withdrawal greater than the user's current balance would be invalid) 
            before the action is carried out.
        */
        depositEl.addEventListener("click", function() {
            if(sessionStorage.getItem(returningUsername) == user.sessionKeyGenerator(returningUsername, returningPassword)) {
                if(parseFloat(depositVal.value) < 1 || isNaN(parseFloat(depositVal.value))) {
                    warningEl.innerText = "Positive numbers only";
                    depositVal.value = "";
                } else {
                    user.balance += parseFloat(depositVal.value);
                    depositVal.value = "";
                    warningEl.innerText = "";
                    balanceDisplay.innerText = "Current Balance: " + user.balance;
                }
            } else {
                warningEl.innerText = "Request Denied";
            }
        })
        balanceEl.addEventListener("click", function() {
            if(sessionStorage.getItem(returningUsername) == user.sessionKeyGenerator(returningUsername, returningPassword)) {
                balanceDisplay.innerText = "Current Balance: " + user.balance;
                warningEl.innerText = "";
            } else {
                warningEl.innerText = "Request Denied";
            }
        })
        withdrawalEl.addEventListener("click", function() {
            if(sessionStorage.getItem(returningUsername) == user.sessionKeyGenerator(returningUsername, returningPassword)) {
                if(user.balance < withdrawalVal.value) {
                    warningEl.innerText = "Insufficient funds";
                    withdrawalVal.value = "";
                } else if(parseFloat(withdrawalVal.value) < 1 || isNaN(parseFloat(withdrawalVal.value))) {
                    warningEl.innerText = "Positive numbers only";
                    withdrawalVal.value = "";
                } else {
                    user.balance -= parseFloat(withdrawalVal.value);
                    withdrawalVal.value = "";
                    warningEl.innerText = "";
                    balanceDisplay.innerText = "Current Balance: " + user.balance;
                }
            } else {
                warningEl.innerText = "Request Denied";
            }
        })

        // Logging out clears the sessionStorage and prevents another user from reopening the same tab
        logoutEl.addEventListener("click", function() {
            sessionStorage.clear();
            window.close();
        })
    } else {
        failedLoginEl.innerText = "Incorrect username and/or password";
    }
}

// Creating new users (function under construction)
function userCreator(username, password, passwordDuplicate) {
    if(password != passwordDuplicate) {
        reigstrationNotificationEl.innerText = "Passwords do not match";
    } else if(username.length < 10 || password.length < 10) {
        reigstrationNotificationEl.innerText = "Longer username and/or password required";
    } else {
        username.value = "";
        password.value = "";
        passwordDuplicate.value = "";
        reigstrationNotificationEl.innerText = "Account created!";
    }
}

// Generates registration page HTML
function registrationPageGenerator() {
    document.body.innerHTML = `
    <h1>Lunome Q</h1>
    <h2>Create a free account today</h2>
    <input type="text" id="username-register" placeholder="username">
    <p>minimum of 10 alphanumeric characters</p>
    <input type="password" id="password-register" placeholder="password">
    <p>minimum of 10 alphanumeric characters</p>
    <input type="password" id="password-duplicate" placeholder="retype password">
    <button type="button" id="register-el">REGISTER</button>
    <p id="registration-notification-el"></p>
    <button type="button" id="returning-user">Already have an account?</button>
    `;
    
    usernameRegisterEl = document.getElementById("username-register");
    passwordRegisterEl = document.getElementById("password-register");
    passwordDuplicateEl = document.getElementById("password-duplicate");
    registerEl = document.getElementById("register-el");
    reigstrationNotificationEl = document.getElementById("registration-notification-el");
    returningUserEl = document.getElementById("returning-user");

    registerEl.addEventListener("click", function() {
        userCreator(usernameRegisterEl.value, passwordRegisterEl.value, passwordDuplicateEl.value);
    })
    returningUserEl.addEventListener("click", loginPageGenerator);
}

// Generates login page HTML
function loginPageGenerator() {
    document.body.innerHTML = `
    <h1>Lunome Q</h1>
    <h2>Login Page</h2>
    <input type="text" id="username-el" placeholder="username">
    <input type="password" id="password-el" placeholder="password">
    <button type="button" id="login-el">LOGIN</button>
    <p id="failed-login-el"></p>
    <button type="button" id="backstep-el">Create new account</button>
    `;

    usernameEl = document.getElementById("username-el");
    passwordEl = document.getElementById("password-el");
    loginEl = document.getElementById("login-el");
    failedLoginEl = document.getElementById("failed-login-el");
    backstepEl = document.getElementById("backstep-el");

    loginEl.addEventListener("click", dashboardGenerator);
    backstepEl.addEventListener("click", registrationPageGenerator);
}

// Website opens with account registration page
registrationPageGenerator();