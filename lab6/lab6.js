function checkNumber(arg) {
    if (typeof arg !== 'number' || isNaN(arg)) return '';
    return arg % 2 === 0 ? 'парне' : 'непарне';
}

function sumFirstFivePrimes() {
    function isPrime(num) {
        if (num <= 1) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    }

    let primes = [];
    let num = 2; // Почати перевірку з першого простого числа
    while (primes.length < 5) {
        if (isPrime(num)) {
            primes.push(num);
        }
        num++;
    }

    return primes.reduce((acc, cur) => acc + cur, 0);
}

function calculateSpecialSum(n) {
    if (typeof n !== 'number' || isNaN(n)) return '';

    let sum = 0;
    let term = 0;

    for (let i = 0; i < n; i++) {
        term = term * 10 + 1;
        sum += term;
    }

    return sum;
}

function toggleInputField() {
    const functionSelect = document.getElementById('functionSelect').value;
    const inputValue = document.getElementById('inputValue');
    
    if (functionSelect === 'sumFirstFivePrimes') {
        inputValue.disabled = true;
        inputValue.value = '';
    } else {
        inputValue.disabled = false;
    }
}

function calculate() {
    const functionSelect = document.getElementById('functionSelect').value;
    const inputValue = document.getElementById('inputValue').value;
    let result;

    switch (functionSelect) {
        case 'checkNumber':
            const number = parseFloat(inputValue);
            result = checkNumber(number);
            break;
        case 'sumFirstFivePrimes':
            result = sumFirstFivePrimes();
            break;
        case 'calculateSpecialSum':
            const n = parseFloat(inputValue);
            result = calculateSpecialSum(n);
            break;
        default:
            result = 'Невірна функція';
    }

    document.getElementById('result').innerText = `Результат: ${result}`;
}

// Встановити початковий стан поля введення
document.addEventListener('DOMContentLoaded', toggleInputField);
