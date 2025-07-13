console.log("JavaScript loaded");

let expressionDisplay = document.getElementById('expression');
let resultDisplay = document.getElementById('result');
let buttons = document.querySelectorAll('#buttons button');

let currentInput = "";

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    let value = button.textContent;

    if (value === "AC") {
      currentInput = "";
      expressionDisplay.textContent = "";
      resultDisplay.textContent = "0";
    } else if (value === "=") {
      try {
        let result = eval(currentInput);
        expressionDisplay.textContent = currentInput;
        resultDisplay.textContent = result;
        currentInput = result.toString(); // allows further calc
      } catch {
        expressionDisplay.textContent = currentInput;
        resultDisplay.textContent = "Error";
        currentInput = "";
      }
    } else if (value === "←" || value === "⌫") {
      currentInput = currentInput.slice(0, -1);
      resultDisplay.textContent = currentInput || "0";
    } else {
      let lastChar = currentInput.slice(-1);
      let operators = ['+', '-', '*', '/'];

      if (
        operators.includes(lastChar) &&
        operators.includes(value)
      ) return;

      if (currentInput === "" && ['+', '*', '/'].includes(value)) return;

      currentInput += value;
      resultDisplay.textContent = currentInput;
    }
  });
});


// Keyboard Support
document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (
    (key >= '0' && key <= '9') ||
    ['+', '-', '*', '/', '.', '(', ')'].includes(key)
  ) {
    currentInput += key;
    resultDisplay.textContent = currentInput;
  } else if (key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    resultDisplay.textContent = currentInput || "0";
  } else if (key === 'Enter' || key === '=') {
    try {
      let result = eval(currentInput);
      expressionDisplay.textContent = currentInput;
      resultDisplay.textContent = result;
      currentInput = result.toString();
    } catch {
      expressionDisplay.textContent = currentInput;
      resultDisplay.textContent = "Error";
      currentInput = "";
    }
  } else if (key === 'Escape') {
    currentInput = "";
    expressionDisplay.textContent = "";
    resultDisplay.textContent = "0";
  }
});
