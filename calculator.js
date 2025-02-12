document.addEventListener("DOMContentLoaded", function () {
    let display = document.querySelector(".dis");
    let buttons = document.querySelectorAll("button");
    let expression = "";

    // Disable keyboard input
    display.addEventListener("keydown", function (event) {
        event.preventDefault();
    });

    // Handle button clicks
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            let value = this.innerText;

            if (value === "C") {
                expression = "";
                display.value = "";
            } else if (value === "<=") {
                expression = expression.slice(0, -1);
                display.value = expression;
            } else if (value === "=") {
                try {
                    expression = eval(expression.replace(/x/g, "*").replace(/%/g, "/100*")) + "";
                    display.value = expression;
                } catch {
                    display.value = "Error";
                    expression = "";
                }
            } else {
                if (/[0-9+\-x/%().]/.test(value)) {
                    expression += value;
                    display.value = expression;
                }
            }
        });
    });
});
