let words =
  "sunny birds sing atop green trees gentle waves caress sandy shores children laugh play meadows colorful flowers bloom gardens warm sunshine kisses rosy cheeks cozy blankets wrap around cuddles delicious cookies fill kitchen soft pillows provide peaceful slumber friendly smiles light up faces";
let word_list = [];

let words_div = document.querySelector(".words");
let accuracy_div = document.querySelector(".accuracy");
let errors_div = document.querySelector(".errors");
let word_count_div = document.querySelector(".word-count");
let stats = document.querySelector(".stats")
let time_div = document.querySelector(".time-and-other")

const alphanumericKeys = [
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)), // lowercase letters (a-z)
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), // uppercase letters (A-Z)
  ...Array.from({ length: 10 }, (_, i) => String(i)), // numerical digits (0-9)
  " ",
];

let accuracy = 0;
let calc_accuracy = 0;
let errors = 0;

let total_words = accuracy + errors;

let startingTime = "";
let liveTime = "";
let wordCount = 0;

const getWord = () => {
  let word = words.split("");

  word_list = word;
  word_list.forEach((index, item) => {
    let newWord = document.createElement("p");
    if (index != " ") {
      newWord.id = item;
      newWord.innerText = index;
      // console.log(item);
      // console.log(newWord);
    } else {
      newWord.id = item;
      newWord.innerHTML = "&nbsp";
      // console.log(item);

      // console.log(newWord);
    }
    words_div.appendChild(newWord);
  });
};
getWord();

let typingIndicator = document.createElement("span");
typingIndicator.innerHTML = "|";
// typingIndicator.className = "typingIndicator"

// setInterval(() => {
//   typingIndicator.style.visibility =
//     typingIndicator.style.visibility === "hidden" ? "visible" : "hidden";
// }, 500);

typingIndicator.style.position = "fixed";

let perviousKeys = [];
let newWordList = word_list.join("").split(" ");
let remaining_time = "";
let wpm = "";
let speed_div = document.querySelector(".speed");
function countdownTimer(duration, display) {
  let timer = duration;

  setInterval(function () {
    display.style.transition = "0.2s ease";
    display.innerHTML = timer;
    remaining_time = timer;
    console.log(startingTime, remaining_time, wordCount);
    wpm = (wordCount / (startingTime - remaining_time)) * 60;

    speed_div.innerHTML = parseInt(wpm);

    console.log(wpm);
    if (--timer < 0) {
      timer = 0;
    }
  }, 1000);
}

// Example usage
const durationInSeconds = 10; // Countdown duration in seconds
const timer_div = document.querySelector(".timer"); // Element to display the countdown

let getKeyCharacter = () => {
  let keyCharacter = "";
  let currentIndex = 0;

  // console.log(currentIndex, word_list[currentIndex], "index, word");

  document.body.addEventListener("keydown", (e) => {
    let start = new Date();
    
    if (currentIndex === 0) {
      startingTime = durationInSeconds;
      countdownTimer(durationInSeconds, timer_div);
    }
    liveTime = start;

    let newPreviousKeys = perviousKeys
      .join("")
      .split(" ")
      .filter((word) => word !== "");

    let filteredKeys = newPreviousKeys.filter((word) =>
      newWordList.includes(word)
    );
    wordCount = filteredKeys.length;
    word_count_div.innerHTML = wordCount;



    if (["Shift", "Alt", "Enter", "Tab", "Control"].includes(e.key)) {
      return;
    }

    keyCharacter = e.key;
    if (alphanumericKeys.includes(e.key)) {
      perviousKeys.push(e.key);
      words_div.style.transition= "0.5s ease"
      stats.style.transition= "0.5s ease"
      stats.style.border = "2px solid white"
      time_div.style.transition= "0.5s ease"
      time_div.style.border = "2px solid white"
      // typingIndicator.classList.toggle = "typingIndicator"
      typingIndicator.className = "typingIndicator"
      
    }

    if (keyCharacter === word_list[currentIndex]) {
      let currentP = document.getElementById(currentIndex);
      currentP.style.transition = "0.2s ease";
      currentP.style.color = "white";
      currentP.style.position = "relative";

      currentIndex++;

      accuracy++;
      total_words = accuracy + errors;
      calc_accuracy = (accuracy / total_words) * 100;
      currentP.appendChild(typingIndicator);
      accuracy_div.innerHTML = parseInt(calc_accuracy);
      // console.log(currentIndex, word_list[currentIndex], "next index, word");
    } else {
      if (e.key === "Backspace") {
        // typingIndicator.classList.toggle = "typingIndicatorleft"
        typingIndicator.className = "typingIndicatorleft"


        perviousKeys.pop();
        currentIndex--;

        let currentP = document.getElementById(currentIndex);
        currentP.style.transition = "0.2s ease";

        currentP.style.color = "gray";
        let previousP = document.getElementById(currentIndex - 1);
        previousP.appendChild(typingIndicator);

        return;
      }

      let currentP = document.getElementById(currentIndex);
      currentP.style.transition = "0.2s ease";

      currentP.style.color = "#ec6e6e";
      errors++;
      total_words = accuracy + errors;
      calc_accuracy = (accuracy / total_words) * 100;

      errors_div.innerHTML = errors;
      accuracy_div.innerHTML = parseInt(calc_accuracy);

      currentIndex++;
      currentP.appendChild(typingIndicator);
    }
  });
  return keyCharacter;
};
getKeyCharacter();
