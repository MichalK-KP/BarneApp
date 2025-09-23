// Koden kjører når siden er ferdig lastet
document.addEventListener("DOMContentLoaded", function () {
    // Henter HTML-elementer for svar, score og oppgave
    let svarbox = document.getElementById("svar")
    let score = 0
    let tries = 0
    const maxTries = 3
    const ScoreCount = document.getElementById("score")
    ScoreCount.textContent = score

    // Funksjon for å generere et tilfeldig tall mellom min og max
    function randint(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const oppgavebox = document.getElementById("oppgavene")
    const buttonsContainer = document.getElementById("svarbokser")

    // Funksjon for å lage en ny matteoppgave
    function generateQuestion() {
        tries = 0 // Nullstiller antall forsøk
        const tall1 = randint(0, 10)
        const tall2 = randint(0, 10 - tall1)
        const solution = tall1 + tall2

        // Viser oppgaven på skjermen
        oppgavebox.textContent = `${tall1} + ${tall2} =`
        oppgavebox.style.backgroundColor = "" // Nullstiller bakgrunn
        svarbox.textContent = ""

        // Lager array med riktig svar + tilfeldige alternativer
        const numbersArray = [solution]
        while (numbersArray.length < 6) {
            const rand = randint(1, 10)
            if (!numbersArray.includes(rand)) numbersArray.push(rand)
        }

        // Stokker rekkefølgen på svaralternativene
        for (let i = numbersArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[numbersArray[i], numbersArray[j]] = [numbersArray[j], numbersArray[i]]
        }

        buttonsContainer.innerHTML = "" // Tømmer gamle knapper
        numbersArray.forEach(num => {
            const btn = document.createElement("button")
            btn.textContent = num
            btn.disabled = false 
            // Legger til klikk-funksjon på hver knapp
            btn.addEventListener("click", () => {
                if (num === solution) {
                    // Riktig svar
                    btn.style.backgroundColor = "lightgreen"
                    score++
                    ScoreCount.textContent = score
                    setTimeout(() => generateQuestion(), 700)
                } else {
                    // Feil svar
                    btn.style.backgroundColor = "lightcoral"
                    tries++
                    if (tries >= maxTries) {
                        // Viser riktig svar hvis for mange feil
                        Array.from(buttonsContainer.children).forEach(b => {
                            if (parseInt(b.textContent) === solution) {
                                b.style.backgroundColor = "lightgreen"
                                svarbox.textContent = solution
                            }
                            b.disabled = true
                        })
                        setTimeout(() => generateQuestion(), 1000)
                    } else {
                        btn.disabled = true // Deaktiverer feil knapp
                    }
                }
            })
            buttonsContainer.appendChild(btn)
        })
    }

    generateQuestion() // Starter første oppgave
})

// Variabler for hjelp-knappen
let track = 0
let newdiv = document.createElement("div")

// Funksjon for å vise/skjule hjelp
function hjelp(){
    let btn = document.getElementById("btn")
    let container = document.getElementById("hjelp")

    if (track == 0) {
        btn.style.backgroundColor = "darkgray";
        console.log("container")
        newdiv.textContent = "Regn ut matte oppgaven deretter trykk på svaret som er riktig"
        container.appendChild(newdiv)
        newdiv.style.backgroundColor = "white"
        track +=1
    } else{
        btn.style.backgroundColor = "white"
        newdiv.textContent = ""
        container.removeChild(newdiv)
        track -=1
    }
}

// Funksjon for høyre pil (foreløpig bare console.log)
function PilHoyre(){
    console.log(123)
}

// Funksjon for venstre pil (foreløpig bare console.log)
function PilVenstre(){
    console.log(987)
}

function spillRiktigLyd() {
    document.getElementById('riktigLyd').play();
}

function spillFeilLyd() {
    document.getElementById('feilLyd').play();
}

// Når brukeren svarer, kall spillRiktigLyd() eller spillFeilLyd()
// Eksempel:
function sjekkSvar(erRiktig) {
    if (erRiktig) {
        spillRiktigLyd();
        // ... annen kode for riktig svar ...
    } else {
        spillFeilLyd();
        // ... annen kode for feil svar ...
    }
}
