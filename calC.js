   let display = document.getElementById('display');
    let history = document.getElementById('history');
    let currentValue = '0';
    let previousValue = '';
    let operation = '';

    function appendNumber(num) {
      if (currentValue === '0' || currentValue === 'Error') {
        currentValue = num;
      } else {
        currentValue += num;
      }
      updateDisplay();
    }

    function appendOperator(op) {
      if (currentValue === 'Error') return;
      
      if (previousValue && operation && currentValue !== '0') {
        calculate();
      }
      
      previousValue = currentValue;
      operation = op;
      currentValue = '0';
      updateHistory();
    }

    function calculate() {
      if (!previousValue || !operation || currentValue === 'Error') return;

      let result;
      const prev = parseFloat(previousValue);
      const current = parseFloat(currentValue);

      switch(operation) {
        case '+':
          result = prev + current;
          break;
        case '-':
          result = prev - current;
          break;
        case '*':
          result = prev * current;
          break;
        case '/':
          if (current === 0) {
            currentValue = 'Error';
            updateDisplay();
            setTimeout(() => {
              clearDisplay();
            }, 1500);
            return;
          }
          result = prev / current;
          break;
        default:
          return;
      }

      currentValue = result.toString();
      if (currentValue.includes('.')) {
        currentValue = parseFloat(currentValue).toFixed(8).replace(/\.?0+$/, '');
      }
      
      previousValue = '';
      operation = '';
      updateDisplay();
      history.textContent = '';
    }

    function clearDisplay() {
      currentValue = '0';
      previousValue = '';
      operation = '';
      updateDisplay();
      history.textContent = '';
    }

    function deleteLast() {
      if (currentValue === 'Error' || currentValue === '0') {
        clearDisplay();
        return;
      }
      
      currentValue = currentValue.slice(0, -1);
      if (currentValue === '' || currentValue === '-') {
        currentValue = '0';
      }
      updateDisplay();
    }

    function updateDisplay() {
      display.value = currentValue;
    }

    function updateHistory() {
      let symbol = operation;
      if (operation === '*') symbol = '×';
      if (operation === '/') symbol = '÷';
      history.textContent = previousValue + ' ' + symbol;
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
      if (e.key === '.') appendNumber('.');
      if (e.key === '+') appendOperator('+');
      if (e.key === '-') appendOperator('-');
      if (e.key === '*') appendOperator('*');
      if (e.key === '/') {
        e.preventDefault();
        appendOperator('/');
      }
      if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
      }
      if (e.key === 'Escape') clearDisplay();
      if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLast();
      }
    });
