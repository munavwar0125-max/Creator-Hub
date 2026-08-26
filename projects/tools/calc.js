const hoursWheel   = document.getElementById("h");
const minutesWheel = document.getElementById("m");
const secondsWheel = document.getElementById("s");

const ITEM_HEIGHT = 40;  // must match .item height in CSS

createWheel(hoursWheel,   24);
createWheel(minutesWheel, 60);
createWheel(secondsWheel, 60);

function createWheel(wheel, max) {
    for (let repeat = 0; repeat < 30; repeat++) {
        for (let i = 0; i < max; i++) {
       const item = document.createElement("div");
 item.classList.add("item");
  item.textContent = String(i).padStart(2, "0");
  wheel.appendChild(item);
        }
    }
    wheel.scrollTop = wheel.scrollHeight / 2;
}

makeInfinite(hoursWheel,   24);
makeInfinite(minutesWheel,   60);
makeInfinite(secondsWheel,   60);

function makeInfinite(wheel, max) {
    wheel.addEventListener("scroll", () => {
        const maxScroll = wheel.scrollHeight - wheel.clientHeight;
        if (wheel.scrollTop < 100) {
            wheel.scrollTop += wheel.scrollHeight / 2;
        }
        if (wheel.scrollTop > maxScroll - 100) {
            wheel.scrollTop -= wheel.scrollHeight / 2;
        }
    });
}


function getSelectedValue(wheel,max){
  
    const index=
    Math.round(
    wheel.scrollTop/ITEM_HEIGHT
    );

    return index%max;
}

let timerInterval;
let paused=false;
let totalSeconds=0;

document.getElementById("start")
.addEventListener("click",()=>{

    let hr=
    getSelectedValue(hoursWheel,24);

    let min=
    getSelectedValue(minutesWheel,60);

    let sec=
    getSelectedValue(secondsWheel,60);

     totalSeconds=
    hr*3600+min*60+sec;

    clearInterval(timerInterval);
    runTimer();
});

let audioCtx=null;
  let osc=null;
  
function beep() {
  
     audioCtx = new AudioContext();

     osc = audioCtx.createOscillator();
/*"sine"
"square"
"sawtooth"
"triangle"*/

/*200 Hz  → deep sound
500 Hz  → medium sound
800 Hz  → high beep
1500 Hz → very high beep
*/    osc.type = "sawtooth";
    osc.frequency.value = 900;

    osc.connect(audioCtx.destination);

    osc.start();

  /*  setTimeout(() => {
        osc.stop();
    }, 10000);*/
}

function stopBeep() {
    if (osc) {
        osc.stop();
        osc=null;
    }

    if (audioCtx) {
        audioCtx.close();
      audioCtx=null;
    }
    
}


function runTimer () {
    timerInterval=setInterval(()=>{

        if(totalSeconds<0){
beep()
            clearInterval(timerInterval);

            document.getElementById("display")
            .textContent="Time's Up!";

            return;
        }

        const hh=
        Math.floor(totalSeconds/3600);

        const mm=
        Math.floor(
        (totalSeconds%3600)/60
        );

        const ss=
        totalSeconds%60;

        document.getElementById("display")
        .textContent=
        `${String(hh).padStart(2,"0")}:`+
        `${String(mm).padStart(2,"0")}:`+
        `${String(ss).padStart(2,"0")}`;

        totalSeconds--;

    },1000);

}

document.getElementById("reset")
.addEventListener("click",()=>{
stopBeep();

    clearInterval(timerInterval);

    document.getElementById("display")
    .textContent="00:00:00";

});
document.getElementById("pause").addEventListener("click", () => {
  stopBeep();

    if (!paused) {
        clearInterval(timerInterval);  // stop ticking
        paused = true;
    } else {
        paused = false;
        runTimer();                    // resume from where it stopped
    }
});