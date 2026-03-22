// Wrap in IIFE to prevent variable redeclaration if script loads twice
(function() {
  // Prevent double initialization of event listeners
  if (window.calculatorLoaded) {
    console.log('Calculator already initialized');
    return;
  }
  window.calculatorLoaded = true;

  const display = document.getElementById("calcDisplay");
  let current = "0";
  let operator = null;
  let operand = null;
  let resetNext = false;
  let lastExpression = ""; // save expression before pressing operator
  let maxDisplayLength = 15; // limite STRICTE de caractères affichés totalement
  let tooManyTimeout = null;

  function updateDisplay() {
    if (operator && !resetNext) {
      // typing second operand - show the full expression so far
      display.value = lastExpression + " " + operator + " " + current;
    } else if (operator && resetNext) {
      // just pressed operator(s) - show last expression + current operator
      display.value = lastExpression + " " + operator;
    } else {
      display.value = current;
    }
  }

  function showTooManyMessage() {
    let originalValue = display.value;
    display.value = "too many numbers";
    display.style.color = "#ff6b6b"; // rouge

    if (tooManyTimeout) clearTimeout(tooManyTimeout);
    
    tooManyTimeout = setTimeout(() => {
      // Supprimer le dernier chiffre ajouté
      if (current.length > 1) {
        current = current.slice(0, -1);
      } else {
        current = "0";
      }
      
      display.style.color = "#fff"; // blanc
      updateDisplay();
      tooManyTimeout = null;
    }, 3000);
  }

  function inputNumber(num) {
    let newValue;
    if (resetNext) {
      newValue = String(num);
    } else {
      newValue = current === "0" ? String(num) : current + String(num);
    }

    // Calculer la VRAIE totalité affichée
    let totalDisplay;
    if (operator && !resetNext) {
      totalDisplay = lastExpression + " " + operator + " " + newValue;
    } else if (operator && resetNext) {
      totalDisplay = lastExpression + " " + operator;
    } else {
      totalDisplay = newValue;
    }

    // Si dépasse la limite, afficher erreur et bloquer
    if (totalDisplay.length > maxDisplayLength) {
      showTooManyMessage();
      return;
    }

    if (resetNext) {
      current = newValue;
      resetNext = false;
    } else {
      current = newValue;
    }
    updateDisplay();
  }

function inputDot() {
  if (!current.includes(".")) {
    current += ".";
    updateDisplay();
  }
}

function inputOperator(op) {
  if (!operator) {
    // first operator
    lastExpression = current;
    operand = parseFloat(current);
    operator = op;
    resetNext = true;
  } else if (!resetNext) {
    // user just entered a number after an operator - COMPUTE the intermediate result
    let value = parseFloat(current);
    let result;
    switch (operator) {
      case "+": result = operand + value; break;
      case "-": result = operand - value; break;
      case "×": result = operand * value; break;
      case "÷": result = value !== 0 ? operand / value : 0; break;
      default: result = value;
    }
    // Update lastExpression to show what we calculated
    lastExpression = lastExpression + " " + operator + " " + value;
    operand = result; // result becomes new operand for next calculation
    operator = op;
    resetNext = true;
  } else {
    // user pressed operator again - just replace the operator
    operator = op;
  }
  updateDisplay();
}

function compute() {
  if (operator && operand !== null) {
    let value = parseFloat(current);
    let result;
    switch (operator) {
      case "+": result = operand + value; break;
      case "-": result = operand - value; break;
      case "×": result = operand * value; break;
      case "÷": result = value !== 0 ? operand / value : 0; break;
      default: result = value;
    }
    current = String(result);
    operator = null;
    operand = null;
    resetNext = true;
    updateDisplay();
  }
}

function clearAll() {
  current = "0";
  operator = null;
  operand = null;
  resetNext = false;
  updateDisplay();
}

// clear entry not used anymore
function clearEntry() {
  current = "0";
  resetNext = true;
  updateDisplay();
}

function toggleSign() {
  current = String(parseFloat(current) * -1);
  updateDisplay();
}

function percent() {
  current = String(parseFloat(current) / 100);
  updateDisplay();
}

// removed unused functions (square, squareRoot, reciprocal)

function backspace() {
  if (current.length > 1) {
    current = current.slice(0, -1);
  } else {
    current = "0";
  }
  updateDisplay();
}

// memory functions unused

// Initialiser l'affichage
updateDisplay();

// Attacher les événements aux boutons
document.querySelectorAll("#calc-container .buttons-grid button").forEach(btn => {
  btn.addEventListener("click", function() {
    const val = this.textContent.trim();

    // Chiffres
    if (/^[0-9]$/.test(val)) {
      inputNumber(val);
    }
    // Point
    else if (val === ".") {
      inputDot();
    }
    // Opérateurs
    else if (["+", "-", "×", "÷"].includes(val)) {
      inputOperator(val);
    }
    // Égal
    else if (val === "=") {
      compute();
    }
    // Clear total
    else if (val === "C") {
      clearAll();
    }
    // Backspace
    else if (val === "⌫") {
      backspace();
    }
    // Pourcentage
    else if (val === "%") {
      percent();
    }
  });
});

// Bouton retour à la page principale
document.getElementById("backBtn").addEventListener("click", function() {
  window.parent.postMessage("backToMain", "*");
});
})();
