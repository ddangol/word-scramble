const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
message = document.querySelector(".message"),
refereshBtn =  document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer); 
    timer = setInterval(() => {
        if(maxTime > 0){
            maxTime--;
            return timeText.innerText = maxTime;

        }

        clearInterval(timer);
        message.innerText=`time's upppppppp!!! `;
        message.style.color = 'goldenrod';
        initGame();
    
    },1000);

}

const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length )];
    let wordArray = randomObj.word.split("");
    // console.log(randomObj);
    // console.log(wordArray);

    for(let i = wordArray.length-1;i>0;i--){
        let j = Math.floor(Math.random() * (i+1));//randomly getting the index
    

    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]]; //swapping the letters
    }

    wordText.innerText = wordArray.join(""); //passes shuffled word as word text
    hintText.innerText = randomObj.hint; //updates hint 
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);//clearing for the next input
    console.log( randomObj);
    
}

initGame();

const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase();
    if(!userWord)
        {
            message.style.color = 'goldenrod';
            return message.innerText= "pplease enter a word";
            

        } 
    if (userWord != correctWord) 
        {
            message.style.color = 'red';
            return message.innerText= `oops! ${userWord} is incorrect.`;
}
            
    message.innerText=`hoooooooooohooh. ${userWord.toUpperCase()} is absolutely correct!!!`;//else is not needed due to the return statement exits the function
    message.style.color = 'green';
    initGame();
}

refereshBtn.addEventListener("click", initGame);

checkBtn.addEventListener("click", checkWord);

