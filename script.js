let words = "Rohit Bhandari is the godfather of everyone";
let word_list = [];

let words_div = document.querySelector(".words");
let accuracy_div = document.querySelector(".accuracy");
let errors_div = document.querySelector(".errors");

let accuracy = 0
let calc_accuracy = 0
let errors = 0

let total_words = accuracy +errors;
const getWord = () => {
  let word = words.split("")
  
  word_list = word;
  word_list.forEach((index, item) => {
    let newWord = document.createElement("p");
    if(index!= " "){
      newWord.id = item;
      newWord.innerText = index;
      console.log(item)
      console.log(newWord)
    }else{
      newWord.id = item;
      newWord.innerHTML = "&nbsp"
      console.log(item)

      console.log(newWord)
      
    }
    words_div.appendChild(newWord);
    
  });
};
getWord();

console.log(word_list)
// generateParagraph();

// const generateParagraph = () => {
 
// };


let getKeyCharacter = () => {
  let keyCharacter = "";
  let currentIndex = 0;
  console.log(currentIndex, word_list[currentIndex], "index, word");

  document.body.addEventListener("keydown", (e) => {
    console.log("=========================================", e.key);

    console.log(currentIndex, word_list[currentIndex], "index, word");

    if(["Shift", "Alt","Enter"].includes(e.key)){
      return
    }

    
    // cosole.log(currentIndex, "current index after event");

    keyCharacter = e.key;

    if (keyCharacter === word_list[currentIndex]) {
      let currentP = document.getElementById(currentIndex)
      currentP.style.background = '#59DCA6'
      currentP.style.color="black"
      currentIndex++;
      accuracy++;
      total_words = accuracy + errors;
      calc_accuracy =( accuracy/total_words)*100
    
      accuracy_div.innerHTML =parseInt(calc_accuracy);
   

      console.log(currentIndex, word_list[currentIndex], "next index, word");
    } else {
      if(e.key==="Backspace"){
        currentIndex--;

        let currentP = document.getElementById(currentIndex)
      currentP.style.background = 'gray'
        
        return
        
      }
  
     
      let currentP = document.getElementById(currentIndex)
      currentP.style.background = '#ec6e6e'
      currentP.style.color="black"
      errors++;
      total_words = accuracy + errors;
      calc_accuracy =( accuracy/total_words)*100
    
      errors_div.innerHTML= errors;
      accuracy_div.innerHTML =parseInt(calc_accuracy);
      
      currentIndex++;

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
