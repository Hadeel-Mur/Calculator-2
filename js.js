class Calculator {
    constructor(prevOperAndTextElemnt, currOperAndTextElemnt){
        this.prevOperAndTextElemnt = prevOperAndTextElemnt
        this.currOperAndTextElemnt = currOperAndTextElemnt
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute()
        }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
    }
    compute(){
     let computation
     const prev = parseFloat(this.previousOperand)
     const current = parseFloat(this.currentOperand)
     if (isNaN(prev) || isNaN(current)) return
     switch (this.operation){
        case '+':
            computation = prev + current
            break
        case '-':
            computation = prev - current
                break
        case '/':
            computation = prev / current
            break
        case '*':
            computation = prev * current
            break
        default :
        return 
     }
     this.currentOperand = computation
     this.operation = undefined
     this.previousOperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toLocalString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDigits = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits :0
            })
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }


    updateDisplay(){
    this.currOperAndTextElemnt.innerText =
     this.getDisplayNumber(this.currentOperand)
    if (this.operation != null){
    this.prevOperAndTextElemnt.innerText = 
    `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    }else{
        this.prevOperAndTextElemnt.innerText = ''
    }
    
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const prevOperAndTextElemnt = document.querySelector('[data-previous-operand]')
const currOperAndTextElemnt = document.querySelector('[data-current-operand]')

const Calculator = new Calculator(prevOperAndTextElemnt, currOperAndTextElemnt)
numberButtons.forEach(button => {
    button.addEventListener('click' , ()=> {
        Calculator.appendNumber(button.innerText)
        Calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click' , ()=> {
        Calculator.chooseOperation(button.innerText)
        Calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button =>{
    Calculator.compute()
    Calculator.updateDisplay()
})

allClearButton.addEventListener('click', button =>{
    Calculator.clear()
    Calculator.updateDisplay()
})

deleteButton.addEventListener('click', button =>{
    Calculator.delete()
    Calculator.updateDisplay()
})