const toggle = document.querySelector(".toggle")
const toggleIph = document.querySelector(".toggle-iphone")
const body = document.querySelector('body')
const btns = document.querySelectorAll('.btn')
const btnBackspace = document.querySelector(".backspace")
const topBtn = document.querySelector('.top-btn')
const btnHistory = document.querySelector('.history')
const calculator = document.querySelector('.calculator')
const display = document.querySelector('.display')
const primaryDisplay = document.querySelector('.primary-display')
const secondaryDisplay = document.querySelector('.secondary-display')
const historyDisplay = document.querySelector('.history-display')
const btnHistoryDelete = document.querySelector(".delete-history")

toggle.addEventListener('click', (e) => {  
    if (body.classList.contains('dark')) { 
        body.classList.remove('iphone', 'dark')
        body.classList.add('light')
        toggle.classList.add('dark')
        toggle.classList.remove('light') 
        toggleIph.classList.remove('active')
        topBtn.classList.remove('dark')
        topBtn.classList.add('light')
        btnBackspace.classList.remove('dark')
        btnBackspace.classList.add('light')
        btnHistory.classList.add('light')
        btnHistory.classList.remove('dark')
        calculator.classList.remove('dark')
        calculator.classList.add('light')
        display.classList.remove('dark')
        display.classList.add('light')
        historyDisplay.classList.remove("dark");
        historyDisplay.classList.add("light");
        e.target.innerHTML = 'Dark Mode'
    } else {
        body.classList.add('dark')
        body.classList.remove('light', 'iphone')
        calculator.classList.add('dark')
        calculator.classList.remove('light')
        toggle.classList.remove('dark')
        toggle.classList.add('light')
        toggleIph.classList.remove('active')
        topBtn.classList.add('dark')
        btnBackspace.classList.add('dark')
        btnHistory.classList.add("dark")
        btnHistory.classList.remove('light'); 
        btnBackspace.classList.remove('light')
        topBtn.classList.remove('light')
        display.classList.add('dark')
        display.classList.remove('light')
        historyDisplay.classList.add("dark");
        historyDisplay.classList.remove("light");
        e.target.innerHTML = 'Light Mode'
    }
})

toggleIph.addEventListener('click', (e) => {
    body.classList.add('iphone')
    toggleIph.classList.add('active')
    toggle.classList.add('dark')
    btnBackspace.classList.remove("light", "dark");
    btnHistory.classList.remove('light', 'dark')
    topBtn.classList.remove("light", "dark");
    display.classList.remove('light', 'dark')
    calculator.classList.remove('light', 'dark')
    for (const btn of btns) {
        btn.classList.remove('dark', 'light')
    }
    historyDisplay.classList.remove("light", "dark")
})

toggle.addEventListener('click', (e) => {
    if (toggle.classList.contains('light')) {
        for (const btn of btns) {
            btn.classList.add('dark')
            btn.classList.remove('light')
        }
    } else {
        for (const btn of btns) {
            btn.classList.remove('dark')
            btn.classList.add('light')
        }
    }
})

let firstValue = ""
let secondValue = ""
let firstOperator = ""
let nextOperator = ""
let result = ""
let output = "0"
let input = ""

btnHistory.addEventListener("click", () => {
    if (historyDisplay.classList.contains("active")) {
        historyDisplay.classList.remove("active")
        historyDisplay.classList.add("hide")
    } else {
        historyDisplay.classList.add("active")
        historyDisplay.classList.remove("hide")
    }
})

function calculate(a, b, sign) {
    if (sign === "+") {
        return a + b
    } else if (sign === "-") {
        return a - b
    } else if (sign === "*") {
        return a * b
    } else if(sign === "/"){
        if (b === 0) {
            return "Infinity"
        } else {
            return a / b
        }
    }
}

function displayContent() {
    primaryDisplay.innerText = output
    secondaryDisplay.innerText = input
    if (output.length > 8) {
        primaryDisplay.innerText = output.substring(0,8)
    }  
}
displayContent()

function displayHistory() {
    let paragraph = document.createElement("p");
    let historyData = input + "=" + output;
    paragraph.innerText = historyData;
    historyDisplay.appendChild(paragraph);
    btnHistoryDelete.addEventListener("click", () => {
    paragraph.innerText = ""
    })
    return output; 
}

function clicked() {
    for (let button of btns) {
        button.addEventListener("click", () => {
            if (button.classList.contains("number")) {
                numberInput(button.value)
                displayContent()
            } else if (button.classList.contains("operator")) {
                operatorInput(button.value)
            } else if (button.classList.contains("equal")) {
                equals()
                displayContent()
                displayHistory();
            } else if (button.classList.contains("point")) {
                decimal(button.value)
                displayContent()
            } else if (button.classList.contains("percent")) {
                percentage(output)
                displayContent()
            } else if (button.classList.contains("clear")) {
                clear()
                displayContent()
            } else if (button.classList.contains("backspace")) {
                backspace()
                displayContent()
            } else if (button.classList.contains("ad")) {
                negPosSymbol(output)
                displayContent()
            } else if (button.classList.contains("brackets")) {
                brackets()
                displayContent()
            }
        })
    }
}
clicked()

function numberInput(number) {
    if (firstValue === "") {
        if (output === "0" || output === 0) {
            output = number
        } else if (output === firstValue) {
            output = number
        } else {
            output += number
        }
    } else {
        if (output === firstValue) {
            output = number   
        } else {
            output += number
        }
    }
    if (firstValue != "") {
        if (firstOperator != "" && nextOperator ==="") {
           input = firstValue + firstOperator + output    
        } else if (nextOperator != "" && firstOperator != "") {
            input = firstValue + nextOperator + output   
        }
    }  
}

function operatorInput(operator) {
    if (firstOperator != "" && nextOperator === "") {  
        nextOperator = operator
        secondValue = output
        result = calculate(parseFloat(firstValue), parseFloat(secondValue), firstOperator)
        if (result > 10000) {
          output = shortResult(result, 1).toString();
        } else {
          output = result;
        } 
        firstValue = output
        result = ""
    } else if (firstOperator != "" && nextOperator != "") {
        secondValue = output
        result = calculate(parseFloat(firstValue), parseFloat(secondValue), nextOperator)
        nextOperator = operator
        if (result > 10000) {
          output = shortResult(result, 1).toString();
        } else {
          output = result;
        }
        firstValue = output
        result = ""
    } else {
        firstOperator = operator
        firstValue = output
    }
}

function equals() {
    if (firstOperator === "") {
        output = output
    } else if (nextOperator != "") {
        secondValue = output 
        result = calculate(parseFloat(firstValue), parseFloat(secondValue), nextOperator)
        if (result === "Infinity") {
            output = "Infinity"    
        } else { 
            if (result > 10000) {
              output = shortResult(result, 1).toString();
            } else {
              output = result;
            }
            firstValue = output
            secondValue = ""
            firstOperator = ""
            nextOperator = ""
            result = ""
        }
    } else {
        secondValue = output
        result = calculate(parseFloat(firstValue), parseFloat(secondValue), firstOperator)
        if (result === "Infinity") {
          output = "Infinity";
        } else {
          if (result > 10000) {
            output = shortResult(result, 1).toString();
          } else {
            output = result;
          }
          firstValue = output;
          secondValue = "";
          firstOperator = "";
          nextOperator = "";
          result = "";
        }
    }
}

function shortResult(x, f) {  
 return Number.parseFloat(x).toExponential(f)  
}

function decimal(point) {
    if (output === firstValue || output === secondValue) {
        output = "0"
        output += point 
    } else if (!output.includes(point)) {
        output += point 
    }
}

function percentage(n) {
    output = (n/100).toString()
}

function clear() {
    output = "0"
    input = ""
    firstOperator = ""
    nextOperator = ""
    firstValue = ""
    secondValue = ""
    result = ""
}

function backspace() {
    input = input.slice(0, -1)
    output = output.slice(0,-1)
}

function negPosSymbol(val) {
    output = (val * -1).toString()
    input = firstValue + output 
}

function brackets() {
    if (
      output.indexOf("(") === -1 ||
      (output.indexOf("(") !== -1 &&
        output.indexOf(")") !== -1 &&
        output.lastIndexOf("(") < output.lastIndexOf(")"))
    ) {
      output += "(";
    } else if (
      (output.indexOf("(") !== -1 && output.indexOf(")") === -1) ||
      (output.indexOf("(") !== -1 &&
        output.indexOf(")") !== -1 &&
        output.lastIndexOf("(") > output.lastIndexOf(")"))
    ) {
      output += ")";
    }
    primaryDisplay.innerHTML = output
    secondaryDisplay.innerHTML = output;
}

document.addEventListener("keydown", (e) => {
  const keyPress = document.querySelector(`button[data-key='${e.key}']`);
  keyPress.click();
});