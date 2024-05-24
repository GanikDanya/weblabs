document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentValue = '0';
    let previousValue = '';
    let operator = '';
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (button.classList.contains('number')) {
                if (shouldResetDisplay) {
                    currentValue = value;
                    shouldResetDisplay = false;
                } else {
                    currentValue = currentValue === '0' ? value : currentValue + value;
                }
            } else if (button.id === 'clear') {
                currentValue = '0';
                previousValue = '';
                operator = '';
            } else if (button.id === 'sign') {
                currentValue = (parseFloat(currentValue) * -1).toString();
            } else if (button.id === 'percent') {
                currentValue = (parseFloat(currentValue) / 100).toString();
            } else if (button.classList.contains('operator')) {
                if (operator && !shouldResetDisplay) {
                    currentValue = calculate(previousValue, currentValue, operator);
                }
                previousValue = currentValue;
                operator = button.id;
                shouldResetDisplay = true;
            } else if (button.id === 'decimal') {
                if (!currentValue.includes(',')) {
                    currentValue += ',';
                }
            } else if (button.id === 'equals') {
                if (operator && !shouldResetDisplay) {
                    currentValue = calculate(previousValue, currentValue, operator);
                    previousValue = '';
                    operator = '';
                }
            }

            display.textContent = currentValue.replace('.', ',');
        });
    });

    function calculate(a, b, operator) {
        const numA = parseFloat(a.replace(',', '.'));
        const numB = parseFloat(b.replace(',', '.'));

        switch (operator) {
            case 'add':
                return (numA + numB).toString();
            case 'subtract':
                return (numA - numB).toString();
            case 'multiply':
                return (numA * numB).toString();
            case 'divide':
                return (numA / numB).toString();
            default:
                return b;
        }
    }
});
