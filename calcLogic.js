let displayValue = '0';
let operand_1 = null;
let operand_2 = null;
let operator_1 = null;
let operator_2 = null;
let result = null;
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
    updateDisplay();
}

function clearEntry() {
    if(displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
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
    if (displayValue === '0') {
        displayValue = number;
    } else {
        displayValue += number;
    }
    updateDisplay();
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
            default:
                inputNumber(input);
        }
    }

updateDisplay();
document.addEventListener('keydown', handleKeyboard);
document.addEventListener('click', handleClick);