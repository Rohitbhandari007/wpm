let easy_words = "a about all also and as at be because but by can come could day do even find first for fruit me more my new no not now of on one only or other our out people say see she its just know like look make man many me more my new no not now of they thing think this those time to two up use very want way we well what when which who will with think this those time to two up use very want way we well what when which who will with where here I me my international national Nepal Kathmandu USA India Japan Hungry Item it ginger tomato potato valorant silver platinum gold radiant master hero agent power money prize coin coins prizes buffalo cat dog ant Messi better Ronaldo than is go eat fight advanced"

let medium_words = "Do one thing every day that scares you Failure is the condiment that gives success its flavor Happiness is not something ready made. It comes from your own actions Fairy tales are more than true not because they tell us that dragons exist, but because they tell us that dragons can be beaten A paragraph is a self contained unit of discourse in writing dealing with a particular point or idea Though not required by the orthographic conventions of any language with a writing system paragraphs are a conventional means of organizing extended segments of prose A paragraph is a self contained unit of discourse in writing dealing with a particular point or idea Though not required by the orthographic conventions here I me my international national Nepal Kathmandu USA India Japan Hungry Item it ginger tomato potato valorant silver platinum gold radiant master hero agent power money prize coin coins prizes buffalo cat dog ant Messi better Ronaldo than is go eat fight advanced"

let dark_theme = {
  "bg":"#222",
  "color":"#fff",
  "mainBg":"#333",
  "boxShadow":"0 8px 32px 0 #222"
}
let light_theme = {
  "bg":"#fff",
  "color":"#222",
  "mainBg":"#ffff",
  "boxShadow":"0 8px 32px 0 #dfcfcf"
}


let current_theme = dark_theme


let theme = document.querySelector(".select-theme")


// background: rgba(27, 25, 25, 0.4);
  // backdrop-filter: blur(9px);

function getTheme(){
  if(theme.value === "dark"){
    current_theme=dark_theme
    words_div.style.boxShadow = current_theme.boxShadow;

    words_div.style.backgroundColor = current_theme.bg;
    document.querySelector(".game-container").style.backgroundColor =current_theme.mainBg
    document.querySelector(".time-and-other").style.color =current_theme.color;
    accuracy_div.style.backgroundColor = current_theme.mainBg
    speed_div.style.backgroundColor = current_theme.mainBg
    timer_div.style.backgroundColor = current_theme.bg
    timer_div.style.color = current_theme.color
    time_div.style.backgroundColor = current_theme.bg
    time_div.style.color= current_theme.color
    speed_div.style.color= current_theme.color

    stats.style.color = current_theme.color
    accuracy_div.style.color= current_theme.color
  }
  if(theme.value === "light"){
    current_theme=light_theme
    words_div.style.boxShadow = current_theme.boxShadow;

    words_div.style.backgroundColor = current_theme.bg;
    // words_div.style.boxShadow = current_theme.boxShadow;
    document.querySelector(".game-container").style.backgroundColor =current_theme.mainBg
    document.querySelector(".time-and-other").style.color =current_theme.color;
    accuracy_div.style.backgroundColor = current_theme.bg
    speed_div.style.backgroundColor = current_theme.bg
    timer_div.style.backgroundColor = current_theme.bg
    timer_div.style.color = current_theme.color
    time_div.style.backgroundColor = current_theme.bg
    time_div.style.color= current_theme.color
    speed_div.style.color= current_theme.color

    stats.style.color = current_theme.color
    accuracy_div.style.color= current_theme.color


  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
let words = ""

if (Math.random() < 0.5) {
  words = easy_words;
} else {
  words = medium_words;
}
let wordArray = words.split(" ")
  
let word_list = [];
let random_words = shuffleArray(wordArray)
words = random_words.join(" ")



let words_div = document.querySelector(".words");
let accuracy_div = document.querySelector(".accuracy");
let errors_div = document.querySelector(".errors");
let word_count_div = document.querySelector(".word-count");
let stats = document.querySelector(".stats");
let time_div = document.querySelector(".timer-div");
const timer_div = document.querySelector(".timer"); // Element to display the countdown
let restart_btn = document.querySelector(".restart_btn");
let typingIndicatorYpos = 0;
words_div.scroll({
  bottom: 500,
  behavior: 'smooth'
});

// restart_btn
const alphanumericKeys = [
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)), // lowercase letters (a-z)
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), // uppercase letters (A-Z)
  ...Array.from({ length: 10 }, (_, i) => String(i)), // numerical digits (0-9)
  " ",
];

let accuracy = 0;
let calc_accuracy = 0;
let errors = 0;
//for coloring
let errorIntensity = 0;
let accuracyIntensity = 0;

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
 
    } else {
      newWord.id = item;
      newWord.innerHTML = "&nbsp";

    }
    words_div.appendChild(newWord);
  });
};
getWord();

let typingIndicator = document.createElement("span");
typingIndicator.innerHTML = "|";
typingIndicator.style.position = "fixed";
let intialPosx = 0

typingIndicatorYpos = intialPosx;


let perviousKeys = [];
let newWordList = word_list.join("").split(" ");
let remaining_time = "";
let wpm = "";
let speed_div = document.querySelector(".speed");
let durationInSeconds = 60;
let key_press_count = 0;
let game_stop_timer = durationInSeconds;
timer_div.innerHTML = game_stop_timer;

function getDuration() {
  let time = document.querySelector(".select-time").value;
  durationInSeconds = time;
  timer_div.innerHTML = durationInSeconds;

}

function countdownTimer(duration, display) {
  let timer = duration;

  setInterval(function () {
    display.style.transition = "0.2s ease";
    display.innerHTML = timer;

    remaining_time = timer;
    wpm = (wordCount / (startingTime - remaining_time)) * 60;

    speed_div.innerHTML = parseInt(wpm);
    game_stop_timer = timer;

    if (--timer < 0) {
      timer = 0;
    }
  }, 1000);
}

// Example usage
let stop_game = false;
let start_text = document.querySelector(".start-text");
let getKeyCharacter = () => {
  let keyCharacter = "";
  let currentIndex = 0;


  document.body.addEventListener("keydown", (e) => {
    let x = typingIndicator.getBoundingClientRect().left;
    let y = typingIndicator.getBoundingClientRect().top;
    let start = new Date();
    if (currentIndex === 0 && alphanumericKeys.includes(e.key)) {
      startingTime = durationInSeconds;
      countdownTimer(startingTime - 1, timer_div);
      start_text.style.transition = "0.8s ease";
      start_text.style.color = "gray";
      start_text.style.display = "none";
      restart_btn.style.transition = "0.8s ease";
      restart_btn.style.display = "block";

      restart_btn.style.opacity = "1";
    }
    if (currentIndex < 0) {
      currentIndex = 0;

    }
    if(currentIndex === 1){
      intialPosx = y;


    }
    liveTime = start;
    key_press_count += 1;
   
     typingIndicatorYpos = y;
     
     if(typingIndicatorYpos > intialPosx){
      words_div.scroll({
        top: words_div.scrollTop + (typingIndicatorYpos - intialPosx),
        behavior: 'smooth'
      });
      // intialPosx = typingIndicatorYpos

     }

    // typingIndicator.addEventListener("change", function(e){
      


    // })
    //increase the background intesitity wiht speed
    // let intesitityBoxShadow = key_press_count + wpm;

    // let red = "";
    // let green = "";
    // let blue = "";
    // let boxShadow = "";

    // if (intesitityBoxShadow > 0) {
    //   let scaledIntensity = Math.floor((intesitityBoxShadow / 500) * 255);

    //   red = scaledIntensity;
    //   green = scaledIntensity;
    //   blue = scaledIntensity;

    //   if (errorIntensity > accuracyIntensity) {
    //     red =
    //       scaledIntensity +
    //       errorIntensity * 10 +
    //       (errorIntensity - accuracyIntensity);
    //     // green = scaledIntensity - accuracyIntensity - 1000;
    //   } else {
    //     green =
    //       scaledIntensity +
    //       accuracyIntensity * 10 +
    //       (accuracyIntensity - errorIntensity);
    //     // red = scaledIntensity - errorIntensity - 1000;
    //   }
    // }

    // boxShadow = `0 8px 32px 0 rgb(${red}, ${green}, ${blue})`;

    // words_div.style.boxShadow = boxShadow;
    // words_div.style.transition = "1s ease";

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

    if (word_list.length === currentIndex) {
      stop_game = true;
    }
    if (game_stop_timer === 0 || stop_game === true) {
      currentIndex = word_list.length;

      return;
    } else {
      keyCharacter = e.key;
      if (alphanumericKeys.includes(e.key)) {
        perviousKeys.push(e.key);
        words_div.style.transition = "0.5s ease";
        stats.style.transition = "0.5s ease";
        stats.style.border = "2px solid white";
        time_div.style.transition = "0.5s ease";
        time_div.style.border = "2px solid white";
        
        // typingIndicator.classList.toggle = "typingIndicator"
        typingIndicator.className = "typingIndicator";
      }

      if (keyCharacter === word_list[currentIndex]) {
        let currentP = document.getElementById(currentIndex);
        currentP.style.transition = "0.2s ease";
        // currentP.style.color = "#ffa";
        currentP.style.color = current_theme.color
        currentP.style.position = "relative";

        currentIndex++;

        accuracy++;
        accuracyIntensity++;
        total_words = accuracy + errors;
        calc_accuracy = (accuracy / total_words) * 100;
        currentP.appendChild(typingIndicator);
        accuracy_div.innerHTML = parseInt(calc_accuracy);
      } else {
        if (e.key === "Backspace") {
          // typingIndicator.classList.toggle = "typingIndicatorleft"
          typingIndicator.className = "typingIndicatorleft";

          perviousKeys.pop();
          currentIndex--;

          let currentP = document.getElementById(currentIndex);
          if (currentP) {
            currentP.style.transition = "0.2s ease";
            currentP.style.color = "gray";
          }

          let previousP = document.getElementById(currentIndex - 1);
          if (previousP) {
            previousP.appendChild(typingIndicator);
          }

          return;
        }

        let currentP = document.getElementById(currentIndex);
        currentP.style.transition = "0.2s ease";

        currentP.style.color = "#ec6e6e";
        errors++;
        errorIntensity++;
        total_words = accuracy + errors;
        calc_accuracy = (accuracy / total_words) * 100;

        errors_div.innerHTML = errors;
        accuracy_div.innerHTML = parseInt(calc_accuracy);

        currentIndex++;
        currentP.appendChild(typingIndicator);
      }
    }
  });

  return keyCharacter;
};
getKeyCharacter();

function Refresh() {
  window.parent.location = window.parent.location.href;
}


window.addEventListener('keydown', function(e) {
  // Check if the pressed key is the space bar
  if (e.keyCode === 32) {
    // Prevent the default scrolling behavior
    e.preventDefault();
  }
});
