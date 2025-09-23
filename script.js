document.addEventListener("DOMContentLoaded", function () {
    let svarbox = document.getElementById("svar")
    let score = 0
    let tries = 0
    const maxTries = 3
    const ScoreCount = document.getElementById("score")
    ScoreCount.textContent = score

    function randint(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const oppgavebox = document.getElementById("oppgavene")
    const buttonsContainer = document.getElementById("svarbokser")

    function generateQuestion() {
        tries = 0 // reset tries
        const tall1 = randint(0, 10)
        const tall2 = randint(0, 10 - tall1)
        const solution = tall1 + tall2

        oppgavebox.textContent = `${tall1} + ${tall2} =`
        oppgavebox.style.backgroundColor = "" // reset background
        svarbox.textContent = ""

        const numbersArray = [solution]
        while (numbersArray.length < 6) {
            const rand = randint(1, 10)
            if (!numbersArray.includes(rand)) numbersArray.push(rand)
        }

        // shuffle array
        for (let i = numbersArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[numbersArray[i], numbersArray[j]] = [numbersArray[j], numbersArray[i]]
        }

        buttonsContainer.innerHTML = ""
        numbersArray.forEach(num => {
            const btn = document.createElement("button")
            btn.textContent = num
            btn.disabled = false // make sure button is enabled
            btn.addEventListener("click", () => {
                if (num === solution) {
                    spillRiktigLyd(); // Spill riktig lyd
                    btn.style.backgroundColor = "lightgreen"
                    score++
                    ScoreCount.textContent = score
                    // go to next question after short delay
                    setTimeout(() => generateQuestion(), 700)
                } else {
                    spillFeilLyd(); // Spill feil lyd
                    btn.style.backgroundColor = "lightcoral"
                    tries++
                    if (tries >= maxTries) {
                        // reveal the correct answer
                        Array.from(buttonsContainer.children).forEach(b => {
                            if (parseInt(b.textContent) === solution) {
                                b.style.backgroundColor = "lightgreen"
                                svarbox.textContent = solution
                            }
                            b.disabled = true
                        })
                        setTimeout(() => generateQuestion(), 1000)
                    } else {
                        btn.disabled = true // disable this wrong button
                    }
                }
            })
            buttonsContainer.appendChild(btn)
        })
    }

    generateQuestion()
})






function hjelp(){
    console.log("abc")
}

function PilHoyre(){
    console.log(123)
}


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
