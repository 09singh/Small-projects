let boxes = document.querySelectorAll(".box");
let reset = document.getElementsByClassName("reset")[0];
let win = document.querySelector(".winner");
let msg = document.querySelector(".msg");
let newgame = document.querySelector(".newgame")
let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [6, 4, 2],
    [8, 4, 0],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return;

        if (turnO) {
            box.innerText = "X";
            turnO = false;
        } else {
            box.innerText = "O";
            turnO = true;
        }

        checkWinner(); 
    });
});

reset.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        win.classList.add("hide");
    });
    turnO = true;
});
const displaywin = (winner) => {
     msg.innerText = `CONGRATULATION WINNER IS : ${winner}`;
    win.classList.remove("hide");
    reset.disabled = true;
}
function disableBoxes() {
    document.querySelectorAll(".box")
    boxes.forEach((box) => {
        box.disabled = true;
    }
  )
};
function enableBoxes() {
    document.querySelectorAll(".box")
    boxes.forEach((box) => {
        box.disabled = false;
    }
  )
};

    

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            console.log(`Winner is: ${pos1Val}`);
            displaywin(pos1Val);
            disableBoxes();
           
        }
    }
}; 
newgame.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        win.classList.add("hide");
        reset.disabled = false;
        enableBoxes();
    });
    turnO = true;
});