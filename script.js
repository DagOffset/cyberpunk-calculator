const display = document.getElementById('screen');
const buttons = document.querySelectorAll('.btn');

const historyPanel = document.getElementById('history-panel');
const historyToggle = document.getElementById('history-toggle');
const closeHistory = document.getElementById('close-history');
const historyList = document.getElementById('history-list');

let currentInput = '';
let history = [];

function updateHistoryUI() {
  historyList.innerHTML = '';
  
  history.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.expression} = ${item.result}`;
    
    li.addEventListener('click', () => {
      currentInput = item.result.toString();
      display.textContent = currentInput;
    });

    historyList.appendChild(li);
  });
}

historyToggle.addEventListener('click', () => {
  historyPanel.classList.toggle('hidden');
});

closeHistory.addEventListener('click', () => {
  historyPanel.classList.add('hidden');
});

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    if (button.id === 'history-toggle') return;

    if (value === 'C') {
      currentInput = '';
      display.textContent = '0';
    } else if (value === '=') {
      try {
        const expression = currentInput;
        const result = eval(currentInput);

        if (expression !== '') {
          history.unshift({ expression, result });
          updateHistoryUI();
        }

        currentInput = result.toString();
        display.textContent = currentInput;
      } catch {
        display.textContent = 'ERROR';
        currentInput = '';
      }
    } else {
      currentInput += value;
      display.textContent = currentInput;
    }
  });
});