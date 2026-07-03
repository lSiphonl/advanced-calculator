let displayValue = '0';
let operand_1 = null;
let operand_2 = null;
let operator_1 = null;
let operator_2 = null;
let result = null;
let waitingForOperand = false;
const buttons = document.querySelectorAll('button');

function updateDisplay() {
    const display = document.getElementById('display-screen');
    display.innerText = displayValue;
    if(displayValue.length > 10) {
        display.innerHTML = displayValue.substring(0, 10);
    }
}

function clearAll() { 
    displayValue = '0';
    operand_1 = null;
    operand_2 = null;
    operator_1 = null;
    operator_2 = null;
    result = null;
    waitingForOperand = false;
    updateDisplay();
}

function clearEntry() {
    if(displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
        if(displayValue === '-' || displayValue === '') {
            displayValue = '0';
        }
    }
    else {
        displayValue = '0';
    }
    updateDisplay();
}

function inputPercentage() {
    displayValue = (parseFloat(displayValue) / 100).toString();
    updateDisplay();
}

function inputSign() {
    displayValue = (parseFloat(displayValue) * -1).toString();
    updateDisplay();
}

function roundAccurately(number, placements) {
    return parseFloat(Math.round(number + 'e' + placements) + 'e-' + placements);
}

function inputNumber(number) {
    if (waitingForOperand) {
        displayValue = number;
        waitingForOperand = false;
    } 
    else if (displayValue === '0') {
        displayValue = number;
    } 
    else {
        displayValue += number;
    }

    updateDisplay();
}

function calculate(num1, num2, operator) {

    switch(operator) {

        case '+':
            return num1 + num2;

        case '-':
            return num1 - num2;

        case '*':
            return num1 * num2;

        case '/':
            if (num2 === 0) {
                return "BAD USER!";
            }
            return num1 / num2;

        default:
            return num2;
    }
}

function operate() {

    if (
        operand_1 !== null &&
        operator_1 !== null &&
        !waitingForOperand
    ) {

        result = calculate(
            operand_1,
            parseFloat(displayValue),
            operator_1
        );

        if (typeof result === "string") {
            displayValue = result;
        } 
        else {
            displayValue = roundAccurately(result, 10).toString();
        }

        operand_1 = null;
        operator_1 = null;
        waitingForOperand = true;

        updateDisplay();
    }
}

function handleKeyboard(event) {
    const key = event.key;
    if (['1','2','3','4','5','6','7','8','9','0','.','+','-','*','/','%','~','=','Enter','Backspace','Escape'].includes(key)) {
        event.preventDefault();
    }
    if(/^[0-9]$/.test(key)) {
        inputNumber(key);
        return;
    }
    if(key === '.') {
        inputDecimal(key);
        return;
    }
    if(['+', '-', '*', '/'].includes(key)) {
        handleOperator(key);
        return;
    }
    if(key === '%') {
        inputPercentage();
        return;
    }
    if(key === '~') {
        inputSign();
        return;
    }
    if(key === 'Enter' || key === '=') {
        operate();
        return;
    }
    if(key === 'Escape') {
        clearAll();
        return;
    }
    if(key === 'Backspace') {
        clearEntry();
        return;
    }
}

function handleOperator(operator) {
    if (
        operator_1 !== null &&
        !waitingForOperand
    ) {

        result = calculate(
            operand_1,
            parseFloat(displayValue),
            operator_1
        );

        if (typeof result === "string") {
            displayValue = result;
        } 
        else {
            displayValue = roundAccurately(result, 10).toString();
        }

        operand_1 = parseFloat(displayValue);
        updateDisplay();
    }

    else {
        operand_1 = parseFloat(displayValue);
    }

    operator_1 = operator;
    waitingForOperand = true;
}

function handleClick(event) {
    const button = event.target.closest('button');
    if (!button) return;

    const input = button.value;

    switch(input) {
        case 'clearAll':
            clearAll();
            break;

        case 'clearEntry':
            clearEntry();
            break;

        case '%':
            inputPercentage();
            break;

        case 'sign':
            inputSign();
            break;
        
        case '.':
            inputDecimal();
            break;

        case '=':
            operate();
            break;

        case '+':
        case '-':
        case '*':
        case '/':
            handleOperator(input);
            break;

        default:
            inputNumber(input);
    }
}

function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    updateDisplay();
}

updateDisplay();
document.addEventListener('keydown', handleKeyboard);
document.addEventListener('click', handleClick);