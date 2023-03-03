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
    const buttonName = this.id.slice(4)
    console.log(buttonName)
    if ( buttonName == 'op') {
        // check if can run operator
        // run operator
    } else if ( buttonName == 'clear') {
        clear()
    } else if ( buttonName == '+' || 
                buttonName == '-' ||
                buttonName == '*' ||
                buttonName == '/' ) {
        // check if calcShow has value
        console.log("outside of if")
        if ( !("num1" in bgMath) && !("num2" in bgMath)) {
            subHead.textContent = 'You need to enter a number first';
        } else if ( "operator" in bgMath ) {
            subHead.textContent = 'You already entered an operator'
            // bgMath.operator = buttonName
            // showMath()
        } else {
            bgMath.operator = buttonName
            showMath()            
        }
        // then add to calcShow
        // add to other array?
    } else {
        if ( !("num1" in bgMath) ) {
            bgMath.num1 = buttonName
            showMath()
        } else if ( !("num2" in bgMath) && "operator" in bgMath) {
            bgMath.num2 = buttonName
            showMath()
        } else if ( !("num2" in bgMath) && !("operator" in bgMath)) {
            subHead.textContent = "You need to enter an operator"
        } else {
            subHead.textContent = "You already entered two numbers"
        }
    }
}

function showMath() {
    if ( "num1" in bgMath && "operator" in bgMath && "num2" in bgMath) {
        calcShow.textContent = `${bgMath.num1} ${bgMath.operator} ${bgMath.num2}`
    } else if ( "num1" in bgMath && "operator" in bgMath) {
        calcShow.textContent = `${bgMath.num1} ${bgMath.operator}`
    } else if ( "num1" in bgMath) {
        calcShow.textContent = `${bgMath.num1}`
    } else {
        calcShow.textContent = ''
    }    
}

function clear() {
    // this is for clearing the fields
    subHead.textContent = ''
    calcShow.textContent = ''
    calcOutput.textContent = ''
    if ( "operator" in bgMath) delete bgMath.operator;
    if ( "num1" in bgMath) delete bgMath.num1;
    if ( "num2" in bgMath) delete bgMath.num2;
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