// calculator

// create variables for DOM items

// add function
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