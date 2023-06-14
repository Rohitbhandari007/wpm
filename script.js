let words = "012345678";
let word_list = [];

let words_div = document.querySelector(".words");
generateParagraph(words);

const getWord = () => {
  let word = words.split("");
  word_list = word;
};

getWord();
let getKeyCharacter = () => {
  let keyCharacter = "";
  let currentIndex = 0;
  console.log(currentIndex, word_list[currentIndex], "index, word");

  document.body.addEventListener("keydown", (e) => {
    console.log("=========================================");
    console.log(currentIndex, word_list[currentIndex], "index, word");

    // console.log(currentIndex, "current index after event");

    keyCharacter = e.key;

    if (keyCharacter === word_list[currentIndex]) {
      currentIndex++;
      console.log(currentIndex, word_list[currentIndex], "next index, word");
    } else {
      console.log(word_list[5]);
      console.log(word_list[currentIndex], keyCharacter, "matchnotfound");

      console.log("next index", currentIndex);
      console.log("nextword", words[currentIndex]);
    }
  });
  return keyCharacter;
};
getKeyCharacter();

// for(let i=0; i<words.length; i++){
//     console.log(words[i])
//     if(hihello===words[i]){
//         console.log("matchfoiund")
//     }
// }

const generateParagraph = (list_of_words) => {
  word_list.forEach((index, item) => {
    let newWord = document.createElement("p");
    newWord.id = index;
    newWord.innerHTML = item;
    words_div.appendChild(newWord);
  });
};
