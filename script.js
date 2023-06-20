let words = "Rohit Bhandari";
let word_list = [];

let words_div = document.querySelector(".words");

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
      currentP.style.background = 'green'
      currentIndex++;
   

      console.log(currentIndex, word_list[currentIndex], "next index, word");
    } else {
      if(e.key==="Backspace"){
        currentIndex--;

        let currentP = document.getElementById(currentIndex)
      currentP.style.background = 'gray'
        
        return
        
      }
  
     
      let currentP = document.getElementById(currentIndex)
      currentP.style.background = 'red'
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
