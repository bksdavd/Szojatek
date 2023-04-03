const inputs = document.querySelector(".szo");
const hintTag = document.querySelector(".hint span");
const guessLeft = document.querySelector(".tipp span");
const hibak = document.querySelector(".rossz span");
const resetBtn = document.querySelector(".ujra");
const hintBtn = document.querySelector(".showhint");
const hintElement = document.querySelector(".hint");
const typeInput = document.querySelector(".type-input");

//  Játék változók inicializálása 
let szo, hibasBetu = [], joBetu = [], maxTipp;

//  Random szó kiválasztása, játék elindítása
function startNewGame() {
    alert("Új játék elindítva, tippelj! :)");

    //  Hint element elrejtése
    hintElement.style.display = "none";
    hintElement.style.opacity = "0";
    
    //  Random szó választás
    const randSzo = szoLista[Math.floor(Math.random() * szoLista.length)];
    szo = randSzo.szo;

    //  Ha a szó >= 5 karakter maxTipp = 8 else maxTipp = 6
    maxTipp = szo.length >= 5 ? 8 : 6;
    hibasBetu = [];
    joBetu = [];
    hintTag.innerText = randSzo.hint;
    guessLeft.innerText = maxTipp;
    hibak.innerText = hibasBetu;

    //  Input a szó minden betűjének
    inputs.innerHTML = "";
    for (let i = 0; i < szo.length; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.disabled = true;
        inputs.appendChild(input);
    } 
}

//  User inputok kezelése & game stats frissítés
function inputKezeles(e) {
    //  Nem betűk lettek beírva, volt már ami be lett írva
    const key = e.target.value.toLowerCase();
    if (key.match(/^[a-z]+$/i) && !hibasBetu.includes(`${key}`) && !joBetu.includes(`${key}`)) {
        //  Ellenőrizzük hogy benne van-e
        if (szo.includes(key)) {
            for (let i = 0; i < szo.length; i++) {
                if (szo[i] === key) {
                    inputs.querySelectorAll("input")[i].value += key;
                }
            }
            joBetu += key;
        } else {
            maxTipp--;
            hibasBetu.push(`${key}`);
            hibak.innerText = hibasBetu;
        }
    }

    //  Maradék tippek frissítése, win-lose condition ellenőrzése
    guessLeft.innerText = maxTipp;
    if (joBetu.length === szo.length) {
        alert('Gratulálok! Sikerült kitalálnod a szót ${szo.toUpperCase()}');
        startNewGame();
    } else if (maxTipp < 1) {
        alert("Vesztettél! Nincs több tipped. :(");
        for (let i = 0; i < szo.length; i++) {
            //  Inputba megfelelő szó bekerül
            inputs.querySelectorAll("input")[i].value = szo[i];
        }
    }
    // Input mező tisztítás
    typeInput.value = "";
}

//  Hint element beállítás
function showHintElement() {
    hintElement.style.display = "block";
    hintElement.style.opacity = "1";
}

//  Event listener setup
resetBtn.addEventListener("click", startNewGame);
hintBtn.addEventListener("click", showHintElement);
typeInput.addEventListener("input", inputKezeles);
inputs.addEventListener("click", () => typeInput.focus());
document.addEventListener("keydown", () => typeInput.focus());

startNewGame();