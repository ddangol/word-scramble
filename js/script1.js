const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
// message = document.querySelector(".message"),
refereshBtn =  document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");

const startBox = document.querySelector('.start');
const play = document.querySelector('.play');

const openModal = document.querySelector('.modal');
const result = document.querySelector('h4');
const replay = document.querySelector('.replay');



let correctWord, timer;

//openModal function

function showModal(modal){
    if(modal == null) return;
    clearInterval(timer);
    modal.classList.add('active')
    overlay.classList.add('active')}

function closeModal(modal){
    if(modal == null) return;
    modal.classList.remove('active')
    overlay.classList.remove('active')
    initGame()
}

showModal(startBox);

const initTimer = maxTime => {
    clearInterval(timer); 
    timer = setInterval(() => {
        
        console.log(maxTime)
        if(maxTime > 0){
            maxTime--;
            return timeText.innerText = maxTime;

        }

        clearInterval(timer);
        // message.innerText=`time's upppppppp!!! `;
        // message.style.color = 'goldenrod';
        result.innerText = 'times up!!!';
        openModal.querySelector("img").src = "img/times up.gif"
        showModal(openModal);
        // initGame();
    
    },1000);

}

const initGame = () => {
    clearInterval(timer); 

    initTimer(30);
    openModal.classList.remove("show");
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

// initGame();

const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase();
    if(!userWord)
        {
            
            result.innerText = "pplease enter a word";
            showModal(openModal);
            // message.style.color = 'goldenrod';
            // return message.innerText= "pplease enter a word";
            // return null;

        } 
    if (userWord != correctWord) 
        {
            
            // return false;
            showModal(openModal);
            result.innerText = "oops! its incorrect";
            openModal.querySelector("img").src = "img/wrong answer.gif"
            
            message.style.color = 'red';
            return message.innerText= `oops! ${userWord} is incorrect.`;


}
            
    
    result.innerText = "Congrutations!";
    openModal.querySelector("img").src = "img/confetti.gif"
    showModal(openModal);
    // message.innerText=`hoooooooooohooh. ${userWord.toUpperCase()} is absolutely correct!!!`;//else is not needed due to the return statement exits the function
    // message.style.color = 'green';



    // return true;
    //showModal(openModal);
    //initGame();

}

play.addEventListener("click", () =>{
    closeModal(startBox);
    initGame();
})

refereshBtn.addEventListener("click", initGame);

checkBtn.addEventListener("click", checkWord);

replay.addEventListener("click", ()=>{
    closeModal(openModal);
    initGame();

})

