let firstOperand = '';
let operator = '';
let secondOperand = '';
let answer = ''

const output = document.querySelector('.output');
const input = document.querySelector('.input');
const buttons = document.querySelectorAll('button');
const clearButton = document.querySelector('#clear')
const deleteButton = document.querySelector('#delete')
const equalButton = document.querySelector('#equal');
const dotButton = document.querySelector('#dot');
const operations = document.querySelectorAll('.operator');

//Event Listeners
clearButton.addEventListener('click', clearDisplay);
deleteButton.addEventListener('click', deleteDigit);
equalButton.addEventListener('click', solveNumbers)
dotButton.addEventListener('click', appendDecimal);
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.className === 'digit' && button.className !== 'operator') {
            appendNumber(button.textContent);
        } 
    });
});
operations.forEach(operation => {
    operation.addEventListener('click', () => {
        appendOperator(operation.textContent);
    })
})

function appendNumber(digit) { 
    if (firstOperand === '' ) {
        if (output.textContent.startsWith('0.')) output.textContent += digit;
        else if (output.textContent.startsWith('-')) output.textContent += digit;
        else output.textContent = digit;
        firstOperand = output.textContent;
    } else if (operator !== '') {
        if (secondOperand.length !== 9) {
            output.textContent += digit;    
            let string = output.textContent.toString().split(" ");
            console.log(string);
            secondOperand = string[2]; 
        }
    } else {
        if (firstOperand.length !== 9 ) {
            output.textContent += digit;
            firstOperand = output.textContent;
        } 
    }
    console.log(firstOperand, operator, secondOperand);
}

function appendOperator(sign) {
    if (output.textContent === '-') return;
        if (sign === '-' && output.textContent === '') return output.textContent = '-';
        if (output.textContent !== '' ) {
            if (secondOperand === '') {            
                if (operator) {  
                    deleteDigit();
                    deleteDigit();
                    output.textContent += `${sign} `;
                    operator = sign;
                } else {
                    operator = sign;
                    output.textContent += ` ${sign} `;
                }
            } 
        }
}

function appendDecimal(){
    if (!operator && output.textContent.includes(".")) return;
    if (operator && output.textContent.split(" ")[2].includes(".")) return;
    output.textContent += ".";
}


function solveNumbers(){
    if (secondOperand === '') return;
    output.textContent = operate(operator, +firstOperand, +secondOperand).toFixed(2);
    answer = output.textContent;
    firstOperand = answer;
    operator = '';
    secondOperand = '';
    
    checkDecimal();
    console.log(firstOperand, operator, secondOperand )

}

function checkDecimal() {
    if (answer.endsWith('.00')) {
        let cut = output.textContent.slice(0, -3);
        console.log('hi')
        console.log(cut);
        output.textContent = cut;
    } else {
        output.textContent = answer;
    }
}

function clearDisplay() {
    output.textContent = '';
    firstOperand = '';
    operator = '';
    secondOperand = '';
    answer = ''
}

function deleteDigit() {
    output.textContent = output.textContent.slice(0, -1);
    firstOperand = output.textContent;

    if (operator !== '') operator = '';

}

function addNumbers (numA, numB) {
    return numA + numB;
}

function subtractNumbers (numA, numB) {
    return numA - numB;
}

function multiplyNumbers (numA, numB) {
    return (numA * numB);
}

function divideNumbers (numA, numB) {
    if (firstOperand === 0) return output.textContent = 'ERROR'
        return (numA / numB);
}

function operate (operator, firstNumber, secondNumber) {
    switch (operator) {
        case '+': return addNumbers(firstNumber, secondNumber);
        case '-': return subtractNumbers(firstNumber, secondNumber);
        case 'x': case '*': return multiplyNumbers(firstNumber, secondNumber);
        case '/': case '÷':  return divideNumbers(firstNumber, secondNumber);  
    }
}

//Keyboard
document.addEventListener("keydown", (e) => {
    let key = e.key;
    if (key === "Backspace") {
        deleteDigit();
    } else if (key === "Escape") {
        clearDisplay();
    } else if (key === "Enter" || key === "=") {
        solveNumbers();
    } else if (key.match(/^[0-9]$/)) {
        appendNumber(key);
    } else if (key === ".") {
        appendDecimal();
    } else if (["+", "-", "÷", "/", "x", "*"].includes(key)) {
        appendOperator(key);
    }
  });
