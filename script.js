// calculator

// YET TO DO LIST
// - string together answers

// create variables for DOM items

const subHead = document.querySelector('.sub-head')
const calcShow = document.querySelector('#calc-show')
const calcOutput = document.querySelector('#calc-output')
const buttons = document.querySelectorAll('.btn-basic')
buttons.forEach( button => button.addEventListener('click', assignValue))

// this object is for actually holding the values
const bgMath = {}

// assignValue function is the workhorse of this script
function assignValue(){
    // makes variable out of everything after the "btn-"
    const buttonName = this.id.slice(4)
    // erase error message
    subHead.textContent = ''
    // checks which button was pressed and acts 
    if ( buttonName == 'op') {
        isEq()
    } else if ( buttonName == 'clear') {
        clear()
    } else if ( buttonName == '+' || 
                buttonName == '-' ||
                buttonName == '*' ||
                buttonName == '/' ) {
        isOperator(buttonName)
    } else {
        isNumKey(buttonName)
    }
}

function showMath(str) {
    // concatinates the top show bar
    calcShow.textContent = calcShow.textContent.concat(" ", str)
}

function updateOutput(num) {
    // updates the main output
    calcOutput.textContent = ''
    calcOutput.textContent = num
}

function clear() {
    // this is for clearing the fields
    subHead.textContent = ''
    calcShow.textContent = ''
    calcOutput.textContent = ''
    if ( "operator" in bgMath) delete bgMath.operator;
    if ( "num1" in bgMath) delete bgMath.num1;
    if ( "num2" in bgMath) delete bgMath.num2;
    if ( "ans" in bgMath) delete bgMath.ans;
}

function isEq(){
    // console.table(bgMath)
    // check if can run operator
    if ( bgMath.isEval) return;
    if ( arguments[0] === "special" && 
        "num1" in bgMath && 
        "operator" in bgMath && 
        "num2" in bgMath &&
        "ans" in bgMath) {
        // special with ans

        bgMath.ans = operate(bgMath.operator,bgMath.ans,bgMath.num2)
        if (bgMath.ans == Infinity) {
            clear()
            subHead.textContent = "Snarky snark YARR!"
        } else {
        updateOutput(bgMath.ans)
        }
        bgMath.isEval = true
    } else if ( arguments[0] === "special" && 
        "num1" in bgMath && 
        "operator" in bgMath && 
        "num2" in bgMath) {
        // special without ans

        bgMath.ans = operate(bgMath.operator,bgMath.num1,bgMath.num2)
        if (bgMath.ans == Infinity) {
            clear()
            subHead.textContent = "Snarky snark YARR!"
        } else {
            updateOutput(bgMath.ans)
        }
        bgMath.isEval = true
    } else if ( "num1" in bgMath && "operator" in bgMath && "num2" in bgMath) {
        // update output
        showMath(calcOutput.textContent)

        bgMath.ans = operate(bgMath.operator,bgMath.num1,bgMath.num2)
        if (bgMath.ans == Infinity) {
            clear()
            subHead.textContent = "Snarky snark YARR!"
        } else {
        updateOutput(bgMath.ans)
        }
        bgMath.isEval = true
    } 
}

function isOperator(buttonName){
    // update show
    if (bgMath.justHit) return;
    showMath(calcOutput.textContent)
    if ( !("num1" in bgMath) && !("num2" in bgMath)) {
        // no numbers entered yet
        subHead.textContent = 'You need to enter a number first';
    } else if ( "operator" in bgMath && "ans" in bgMath ) {
        // if (!bgMath.isEval) return;
        if ( bgMath.operator == calcShow.textContent.slice(calcShow.textContent.length -1)) return;
        bgMath.isEval = false
        // adds operator if ans exists
        isEq("special")
        bgMath.num1 = bgMath.ans
        bgMath.num2 = ''
        bgMath.operator = buttonName
        showMath(buttonName)
    } else if ( 'operator' in bgMath && 
                'num1' in bgMath &&
                'num2' in bgMath ) {
        // if (!bgMath.isEval) return;
        if ( bgMath.operator == calcShow.textContent.slice(calcShow.textContent.length -1)) return;
        bgMath.isEval = false
        isEq("special")
        bgMath.num1 = bgMath.ans
        bgMath.num2 = ''
        bgMath.operator = buttonName
        showMath(buttonName)

    } else {
        bgMath.isEval = false
        bgMath.operator = buttonName
        showMath(buttonName)
    }
    bgMath.justHit = true
}

function isNumKey(buttonName){

    bgMath.isEval = false
    if ( !("num1" in bgMath)) {
        // no num1, so fill in num1
        bgMath.num1 = buttonName
        updateOutput(buttonName)
        // showMath(buttonName)
    } else if ( "num1" in bgMath && !("operator" in bgMath)){
        // num1 needs to be appended, no operator yet
        bgMath.num1 = `${bgMath.num1}${buttonName}`
        updateOutput(bgMath.num1)
        // showMath()
    } else if ( !("num2" in bgMath) && "operator" in bgMath) {
        // operator, but no num2, fill in num2
        bgMath.num2 = buttonName
        updateOutput(buttonName)
        // showMath()
    } else if ( ("num2" in bgMath) && "operator" in bgMath) {
        // operator and num2, append num2
        bgMath.num2 = `${bgMath.num2}${buttonName}`
        updateOutput(bgMath.num2)
        // showMath()
    } else if ( !("num2" in bgMath) && !("operator" in bgMath)) {
        subHead.textContent = "You need to enter an operator"
    } else {
        subHead.textContent = "You already entered two numbers"
    }
    bgMath.justHit = false
}

// operate function per Odin
function operate(symOperator,a,b){
    // Error catch symOperator not a string
    if (typeof(symOperator) != "string") return "ERROR"
    // Error catch a not number
    if (typeof(a) != 'number') {
        if (typeof(a) == 'string' ) {
            a = Number(a)
            if ( isNaN(a) )  return "ERROR"
        }
    }
    // Error catch b not number
    if (typeof(b) != 'number') {
        if (typeof(b) == 'string' ) {
            b = Number(b)
            if ( isNaN(b) )  return "ERROR"
        }
    }
    // runs correct function bsed on operator
    if ( symOperator === "+" ) {
        return add(a,b)
    } else if ( symOperator === "-" ){
        return subtract(a,b)
    } else if ( symOperator === "*"){
        return mult(a,b)
    } else if ( symOperator === "/" ) {
        return divide(a,b)
    }
}

// addition function
function add(){
    if (arguments.length < 2) return "ERROR"
    let sum = 0
    for (argument of arguments) {
        sum += argument
    }
    return sum
}

// subtract funciton
function subtract(){
    if (arguments.length < 2) return "ERROR"
    let ans = arguments[0]
    for ( let i = 1; i < arguments.length; i++) {
        ans -= arguments[i]
    }
    return ans
}

// multiply funtion
function mult(){
    if (arguments.length < 2) return "ERROR"
    let ans = arguments[0]
    for ( let i = 1; i < arguments.length; i++) {
        ans *= arguments[i]
    }
    return ans
}

// divide function
function divide(){
    if (arguments.length < 2) return "ERROR"
    let ans = arguments[0]
    for ( let i = 1; i < arguments.length; i++) {
        ans /= arguments[i]
    }
    return Math.round( ans * 1000000) / 1000000
}