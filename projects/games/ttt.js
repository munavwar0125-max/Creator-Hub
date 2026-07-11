let boxes=document.querySelectorAll(".box");
let msgContainer=document.querySelector("#msg-Container");
let msg=document.querySelector("#msg");
let resetBtn=document.querySelector(".reset");
let newBtn=document.querySelector("#new-btn");
let turnO=true;
let winPatterns=[
  [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2]
];
boxes.forEach((box)=>
{
  box.addEventListener("click",()=>{
    if(turnO){
      box.innerText="O";
      turnO=false;
      
    }
    else{

      box.innerText="X";
      turnO=true;
      
}
    box.disabled=true;
    checkWinner();
  });
});
 
  const checkWinner = () => {
  for (let pattern of winPatterns) {
    
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        
      }
    }
  }
};
  
  
  const showWinner=(winner)=>{
    msg.innerText=`Congrats! Winner is ${winner}`;
        disabledBoxes()
  };
   const disabledBoxes=()=>{
     boxes.forEach((box)=>{
    box.disabled=true;
     });
     };
   
   const enabledBoxes=()=>{
     boxes.forEach((box)=>{
    box.disabled=false;
   });
   };
   
   const resetGame = () => {
  turnO = true;
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  msg.innerText = "";
};

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);