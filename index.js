//Simple Calculator
const NUM_ARR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const INITIAL_NUM = 0;

let result = 0;

let currentDisplay = 0;

let firstOpFlag = false;

let prevOp = 0;

let floatFlag = false;

// let test = 125.5
// let dec = test.toString(10).indexOf('.');
// let a = test.toString(10).length - dec;

// console.log(test.toString(10).length)
// console.log(dec);
// console.log(a);

//Press Numbers
function inputNums(num) {
    let findDot = currentDisplay.toString(10).indexOf('.');
    if (floatFlag === false && findDot === -1) {
        if (currentDisplay === 0) return num;
        return currentDisplay * 10 + num;
    } else {
        if (findDot === -1) {
            return currentDisplay += (num / 10);
        } else {
            let decimalLength = currentDisplay.toString(10).length - findDot;
            return currentDisplay += Math.pow(10, -decimalLength) * num;
        }
    }


}

//Numbers
let numbers = document.querySelectorAll(".cell.numbers");

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", () => {
        currentDisplay = inputNums(NUM_ARR[i]);
        document.querySelector(".output").children[0].innerHTML = currentDisplay;
    });
}

//delete
document.getElementById("del").addEventListener("click", () => {
    currentDisplay = INITIAL_NUM;
    result = INITIAL_NUM;
    firstOpFlag = false;
    floatFlag = false;
    prevOp = 0;
    document.querySelector(".output").children[0].innerHTML = currentDisplay;
});

//dot
document.getElementById("dot").addEventListener("click", () => {
    floatFlag = true;
    document.querySelector(".output").children[0].innerHTML = currentDisplay + ".";
});

//Operations
function calculateOperator(op) {
    if (prevOp === 0) {
        result = currentDisplay;
        prevOp = op;
        currentDisplay = INITIAL_NUM;
    } else {
        switch (prevOp) {
            case 1:
                result += currentDisplay;
                break;
            case 2:
                result -= currentDisplay;
                break;
            case 3:
                result = result * currentDisplay;
                break;
            case 4:
                result = result / currentDisplay;
                break;
        }
        prevOp = op;
        currentDisplay = INITIAL_NUM;
        document.querySelector(".output").children[0].innerHTML = result;
    }
}

let operators = document.querySelectorAll(".cell.operator");

for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", () => {
        calculateOperator(i + 1);
        floatFlag = false;
    });
}

//shortcuts
function calculateShortcuts(sc) {
    switch (sc) {
        case 0:
            currentDisplay = 1 / currentDisplay;
            break;
        case 1:
            currentDisplay = currentDisplay * currentDisplay;
            break;
        case 2:
            currentDisplay = Math.pow(currentDisplay, 0.5);
            break;
        default:
            break;
    }
    document.querySelector(".output").children[0].innerHTML = currentDisplay;
}

let shortcuts = document.querySelectorAll(".topcell.shortcuts");

for (let i = 0; i < shortcuts.length; i++) {
    shortcuts[i].addEventListener("click", () => {
        calculateShortcuts(i);
    });
}

//enter
document.getElementById("enter").addEventListener("click", () => {
    switch (prevOp) {
        case 1:
            result += currentDisplay;
            break;
        case 2:
            result -= currentDisplay;
            break;
        case 3:
            result = result * currentDisplay;
            break;
        case 4:
            result = result / currentDisplay;
            break;
    }

    document.querySelector(".output").children[0].innerHTML = result;
    currentDisplay = result;
    firstOpFlag = false;
    prevOp = 0;

});
