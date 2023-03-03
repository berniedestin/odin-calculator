// calculator

// create variables for DOM items

const subHead = document.querySelector('.sub-head')
const calcShow = document.querySelector('#calc-show')
const calcOutput = document.querySelector('#calc-ooutput')
const buttons = document.querySelectorAll('.btn-basic')
buttons.forEach( button => button.addEventListener('click', assignValue))

// this object is for actually holding the values
const bgMath = {}

// assignValue function is the workhorse of this script
function assignValue(){
    const buttonName = this.id.slice(4)
    // console.log(buttonName)
    if ( buttonName == 'op') {
        // check if can run operator
        // run operator
    } else if ( buttonName == 'clear') {
        // run clear
    } else if ( buttonName == '+' || 
                buttonName == '-' ||
                buttonName == '*' ||
                buttonName == '/' ) {
        // check if calcShow has value
        // then add to calcShow
        // add to other array?
    } else {
        // add to calcShow
        // add to other array?
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