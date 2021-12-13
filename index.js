// Calculator functions to use in operate 

const add = function() {
    let result = 0
    for(let i=0;i<arguments.length;i++){
      result = result + arguments[i]
    }
    return result
  }
  
const subtract = function() {
    return arguments[0] - arguments[1]
}
  
const sum = function() {
    let result = 0
    for(let i=0;i<arguments.length;i++){
      result = result + arguments[i]
    }
    return result
}
  
const multiply = function() {
    let result = 1
    for(let i=0;i<arguments.length;i++){
      result = result * arguments[i]
    }
    return result
}
  
const power = function() {
    return arguments[0]**arguments[1]
}
  
const factorial = function(number) {
    let result = 1
    for(let i=number; i>0; i--){
      result = i * result
    }
      return result
}

// higher order operate function to use calculator functions

const operate = (operator, n1, n2) => {
    switch(operator){
        case "+":
            return add(n1,n2)
        case "-":
            return subtract(n1,n2)
        case "*":
            return multiply(n1,n2)
        case "/":
            return multiply(n1,1/n2)
    }
}

// store of calculator values

let displayValue = undefined
let number1 = undefined
let operatorSaved = undefined
let result = undefined

const display = document.querySelector(".display")

const changeDisplay= (id) => {
    display.textContent += id
    displayValue = Number(display.textContent)
}

const delCharacter= () =>{
    display.textContent = display.textContent.slice(0,-1)
    displayValue = Number(display.textContent)
}

const clearDisplay = () => {
    display.textContent = ""
    displayValue = undefined
}

// after pressing an operator this function stores the operator and the previous number

const prepareOperation = (operator) => {
    number1 = displayValue
    operatorSaved = operator
    clearDisplay()
}


function toFixedIfNecessary( value, dp ){
    return +parseFloat(value).toFixed( dp )
} 

const finalizeOperation = () =>{
    result = toFixedIfNecessary(operate(operatorSaved,number1,displayValue),3)
    number1=undefined
    operatorSaved=undefined
    display.textContent = ""
    display.textContent = result
    displayValue = result
    console.log(result)
}

const digitButtons = document.querySelectorAll(".digit-button")
digitButtons.forEach(button => button.addEventListener("click", ()=>changeDisplay(button.id)))

const clearButton = document.querySelector("#clear")
clearButton.addEventListener("click", ()=>clearDisplay())

const operateButtons = document.querySelectorAll(".operate-button")
operateButtons.forEach(button => button.addEventListener("click", ()=>prepareOperation(button.id)))

const resultButton = document.querySelector(".result-button")
resultButton.addEventListener("click", ()=>finalizeOperation())

const delButton = document.querySelector(".delete-button")
delButton.addEventListener("click", ()=>delCharacter())

const playKey = (e) =>{
    console.log(e.keyCode)
    const buttonToPress = document.querySelector(`button[data-key="${e.keyCode}"]`) 
    if(!buttonToPress) {
        switch(e.keyCode){
            case 107:
                prepareOperation("+")
                return ;
            case 109:
                prepareOperation("-")
                return ;
            case 106:
                prepareOperation("*")
                return ;
            case 111:
                prepareOperation("/")
                return ;
            case 40: 
                finalizeOperation()
                return ;
            case 8: 
                delCharacter()
                return ;
            case 37: 
                clearDisplay()
                return ;    
            default: return ;
        }
    } 
    buttonToPress.click()
}

window.addEventListener('keydown', playKey)

