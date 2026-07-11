let userScore=0;
let cScore=0;

const rcp=document.querySelectorAll(".card");
const msg=document.querySelector("#msg");
const uScPara=document.querySelector("#user-score");
const cScPara=document.querySelector("#c-score");
/* computer choice */
const cChoice= ()=>{
  const ops=["rock","paper","scissors"];
  const rIdx=Math.floor(Math.random()*3);
  return ops[rIdx];
};
/*Draw*/
const drawGame=()=>{
  msg.innerText="The Game was Draw!";
  msg.style.backgroundColor="grey";

msg.fontSize="95px"
};

const playGame=(userChoice)=>{
  const compChoice=cChoice();
  
  if(userChoice===compChoice)
   {drawGame();}
  else{
    let userWin=true;
    if(userChoice==="rock"){
     userWin=compChoice==="paper"?false:true;}
     else if(userChoice==="paper"){
     userWin=compChoice==="scissors"?false:true;}
     else{
     userWin=compChoice==="rock"?false:true;
     }showWinner(userWin,userChoice,compChoice);
  }
    
  
};
const showWinner=(userWin,userChoice,compChoice)=>{
  if(userWin){
   userScore++;
   uScPara.innerText=userScore;
   msg.innerText=`You Win! Your ${userChoice} beats ${compChoice}`;
   msg.style.backgroundColor="green";
    msg.fontSize="95px"
  }
  else{
    cScore++;
    cScPara.innerText=cScore;
    msg.innerText=`You lose! ${compChoice} beats  Your ${userChoice}`;
    msg.style.backgroundColor="red";
 msg.fontSize="95px"
  } 
};

/* userChoice */
 rcp.forEach((card)=>{
   card.addEventListener("click",()=>{
   const userChoice=card.getAttribute("id");
   playGame(userChoice);
   });
  });
  
  