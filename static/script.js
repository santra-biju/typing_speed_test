let startTime;
let timerInterval;
let running = false;
            
const sentences = [
    "The sun rises in the east and sets in the west.",
    "Practice makes progress even when learning feels difficult.",
    "A little kindness can make someone's entire day better.",
    "Technology is changing the way we live and work.",
    "The best way to learn is to keep trying new things.",
    "A journey of a thousand miles begins with one step.",
    "The quick brown fox jumps over the lazy dog.",
    "Success comes from patience, effort, and consistency.",
    "Rain fell softly on the quiet streets last night.",
    "Reading books opens the door to new adventures.",
    "Never stop learning because life never stops teaching.",
    "Fresh coffee and a good book make a perfect morning.",
    "Small improvements every day lead to big results.",
    "The stars shine brightly in the dark night sky.",
    "Good habits help us achieve our long term goals."
];

function displaySentence(sentence) {
    let sentenceElement = document.getElementById("sentence");
    sentenceElement.innerHTML = "";

    for (let i = 0; i < sentence.length; i++) {
        let character = document.createElement("span");

        character.textContent = sentence[i];
        character.style.color = "#8b949e";

        sentenceElement.appendChild(character);
    }
}

function checkTyping() {
    let sentence = document.getElementById("sentence").textContent;
    let typed = document.getElementById("typed").value;
    let characters = document.getElementById("sentence").children;

    for (let i = 0; i < characters.length; i++) {
        if (i >= typed.length) {
            characters[i].style.color = "#8b949e";
        } else if (typed[i] === sentence[i]) {
            characters[i].style.color = "#39ff14";
        } else {
            characters[i].style.color = "#ff6b6b";
        }
    }
}


            function startTest() {
            if (running) return;
            let randomIndex = Math.floor(Math.random() * sentences.length);
            displaySentence(sentences[randomIndex]);
                running = true;
                startTime = Date.now();

                document.getElementById("typed").disabled = false;
                document.getElementById("typed").value = "";
                document.getElementById("typed").focus();

                document.getElementById("start").disabled = true;
                document.getElementById("results").textContent = "";

                timerInterval = setInterval(function() {
                    let seconds = (Date.now() - startTime) / 1000;
                    document.getElementById("timer").textContent =
                        seconds.toFixed(1);
                }, 100);
            }

            function finishTest() {
                if (!running) return;

                running = false;
                clearInterval(timerInterval);

                let endTime = Date.now();
                let seconds = (endTime - startTime) / 1000;

                let sentence =
                    document.getElementById("sentence").textContent;
                let typed = document.getElementById("typed").value;

                let words = typed.trim() ?
                    typed.trim().split(/\s+/).length : 0;

                let minutes = seconds / 60;
                let wpm = minutes > 0 ?
                    Math.round(words / minutes) : 0;

let correct = 0;

for (let i = 0; i < Math.min(sentence.length, typed.length); i++) {
    if (sentence[i] === typed[i]) {
        correct++;
    }
}

let accuracy = typed.length > 0
? Math.round(correct / typed.length * 100) : 0;

                document.getElementById("timer").textContent =
                    seconds.toFixed(1);

                document.getElementById("results").textContent =
                    "Time: " + seconds.toFixed(1) +
                    " seconds | Speed: " + wpm +
                    " WPM | Accuracy: " + accuracy + "%";

                document.getElementById("typed").disabled = true;
                document.getElementById("start").disabled = false;
            }


function handleEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        finishTest();
    }
}

        
