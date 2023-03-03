// calculator

// create variables for DOM items

const subHead = document.querySelector('.sub-head')
const calcShow = document.querySelector('#calc-show')
const calcOutput = document.querySelector('#calc-output')
const buttons = document.querySelectorAll('.btn-basic')
buttons.forEach( button => button.addEventListener('click', assignValue))

// subHead.textContent = ''
// calcShow.textContent = ''
// calcOutput.textContent = ''


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
        // check if can run operator
        if ( "num1" in bgMath && "operator" in bgMath && "num2" in bgMath) {
            bgMath.ans = operate(bgMath.operator,bgMath.num1,bgMath.num2)
            showMath()
        }
        // run operator
    } else if ( buttonName == 'clear') {
        clear()
    } else if ( buttonName == '+' || 
                buttonName == '-' ||
                buttonName == '*' ||
                buttonName == '/' ) {
        updateOutput("")
        if ( !("num1" in bgMath) && !("num2" in bgMath)) {
            // no numbers entered yet
            subHead.textContent = 'You need to enter a number first';
        } else if ( "operator" in bgMath ) {
            // already operator
            subHead.textContent = 'You already entered an operator'
        } else {
            bgMath.operator = buttonName
            showMath()            
        }
    } else {
        // checks to erase old data
        if ( "ans" in bgMath) clear();
        // runs normal numbers
        if ( !("num1" in bgMath) ) {
            // no num1, so fill in num1
            bgMath.num1 = buttonName
            updateOutput(buttonName)
            showMath()
        } else if ( !("num2" in bgMath) && "operator" in bgMath) {
            // operator, but no num2, fill in num2
            bgMath.num2 = buttonName
            updateOutput(buttonName)
            showMath()
        } else if ( !("num2" in bgMath) && !("operator" in bgMath)) {
            subHead.textContent = "You need to enter an operator"
        } else {
            subHead.textContent = "You already entered two numbers"
        }
    }
}

function showMath() {
    if ( "num1" in bgMath && "operator" in bgMath && "num2" in bgMath && "ans" in bgMath )  {
        calcShow.textContent = `${bgMath.num1} ${bgMath.operator} ${bgMath.num2}`
        calcOutput.textContent = ''
        calcOutput.textContent = `${bgMath.ans}`
    } else if ( "num1" in bgMath && "operator" in bgMath) {
        calcShow.textContent = `${bgMath.num1} ${bgMath.operator}`
    } else {
        calcShow.textContent = ''
    }    
}

function updateOutput(num) {
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

// operate function per Odin
function operate(symOperator,a,b){
    // Error catch symOperator not a string
    if (typeof(symOperator) != "string") return "ERROR"
    // Error catch a not number
    if (typeof(a) != 'number') {
        if (typeof(a) == 'string' ) {
            a = +a
            if ( isNaN(a) )  return "ERROR"
        }
    }
    // Error catch b not number
    if (typeof(b) != 'number') {
        if (typeof(b) == 'string' ) {
            b = +b
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