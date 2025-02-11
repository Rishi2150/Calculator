document.addEventListener("DOMContentLoaded", function () {
    let display = document.querySelector(".dis");
    let buttons = document.querySelectorAll("button");
    let firstInput = "";
    let secondInput = "";
    let operator = "";
    let isSecondInput = false;
    
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            let value = button.textContent;
            
            if (!isNaN(value) || value === "0") {
                if (isSecondInput) {
                    secondInput += value;
                } else {
                    firstInput += value;
                }
            } else if (value === "C") {
                firstInput = "";
                secondInput = "";
                operator = "";
                isSecondInput = false;
            } else if (value === "<=") {
                if (isSecondInput && secondInput.length > 0) {
                    secondInput = secondInput.slice(0, -1);
                } else if (!isSecondInput && operator) {
                    operator = "";
                    isSecondInput = false;
                } else {
                    firstInput = firstInput.slice(0, -1);
                }
            } else if (value === "=") {
                if (firstInput && secondInput && operator) {
                    try {
                        let result = eval(`${firstInput} ${operator} ${secondInput}`);
                        display.value = `${firstInput} ${operator} ${secondInput} = ${result}`;
                        firstInput = result.toString();
                        secondInput = "";
                        operator = "";
                        isSecondInput = false;
                    } catch (error) {
                        display.value = "Error";
                    }
                }
            } else {
                if (!operator && firstInput) {
                    operator = value;
                    isSecondInput = true;
                }
            }
            
            if (firstInput || secondInput || operator) {
                display.value = `${firstInput} ${operator} ${secondInput}`;
            } else {
                display.value = "";
            }
        });
    });
});
