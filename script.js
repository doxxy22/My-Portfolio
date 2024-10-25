let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false;

const currentOperandDisplay = document.querySelector('.current-operand');
const previousOperandDisplay = document.querySelector('.previous-operand');

function updateDisplay() {
    currentOperandDisplay.textContent = formatNumber(currentOperand);
    previousOperandDisplay.textContent = previousOperand;
}

function formatNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    
    if (isNaN(integerDigits)) {
        integerDisplay = '';
    } else {
        integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0
        });
    }
    
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
    } else {
        return integerDisplay;
    }
}

function addNumber(number) {
    if (shouldResetScreen) {
        currentOperand = '';
        shouldResetScreen = false;
    }
    if (currentOperand === '0' && number !== '0') {
        currentOperand = number;
    } else if (currentOperand.length < 12) {
        currentOperand += number;
    }
    updateDisplay();
}

function addDecimal() {
    if (shouldResetScreen) {
        currentOperand = '0';
        shouldResetScreen = false;
    }
    if (!currentOperand.includes('.')) {
        currentOperand += '.';
    }
    updateDisplay();
}

function addOperator(operator) {
    if (operation !== undefined) calculate();
    previousOperand = currentOperand + ' ' + operator;
    operation = operator;
    shouldResetScreen = true;
    updateDisplay();
}

function calculate() {
    if (operation === undefined || shouldResetScreen) return;
    
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    let computation;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert('Cannot divide by zero!');
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }
    
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    shouldResetScreen = true;
    updateDisplay();
}

function clearHistory() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    shouldResetScreen = false;
    updateDisplay();
}

function clearEntry() {
    currentOperand = '0';
    shouldResetScreen = false;
    updateDisplay();
}

function backspace() {
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
}

function toggleSign() {
    currentOperand = (parseFloat(currentOperand) * -1).toString();
    updateDisplay();
}

function calculateSquareRoot() {
    const number = parseFloat(currentOperand);
    if (number < 0) {
        alert('Cannot calculate square root of negative number!');
        return;
    }
    currentOperand = Math.sqrt(number).toString();
    updateDisplay();
}

function calculatePercent() {
    currentOperand = (parseFloat(currentOperand) / 100).toString();
    updateDisplay();
}

function calculatePower() {
    currentOperand = (Math.pow(parseFloat(currentOperand), 2)).toString();
    updateDisplay();
}

function calculateInverse() {
    const number = parseFloat(currentOperand);
    if (number === 0) {
        alert('Cannot divide by zero!');
        return;
    }
    currentOperand = (1 / number).toString();
    updateDisplay();
}

updateDisplay();