const previousoperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll(".teclado-botoes button");

class Calculator {
    constructor(previousoperationText, currentOperationText) {
        this.previousoperationText = previousoperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }

    // add digit to calculator screen
    addDigit(digit) {
        // check if current operation already has a dot
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        this.currentOperation = digit;
        this.updateScreen();
    }

    //process all calculator operations
    processoperation(operation) {
        //check if current is empty
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            //Change operation
            if (this.previousoperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }


        // Get current and previous value
        let operationValue;
        const previous = +this.previousoperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "x":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearOperation();
                break;
            case "=":
                this.processEqualOperation();
                break;
            default:
                return;
        }
    }

    // change values of the calculator screen
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            //Check if value is zero, if it is just add current value
            if (previous === 0) {
                operationValue = current;
            }

            //Add current value to previous
            this.previousoperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }


    //  Change math operation
    changeOperation(operation) {

        const mathOperations = ["x", "/", "+", "-"]

        if (!mathOperations.includes(operation)) {
            return
        }

        this.previousoperationText.innerText =
            this.previousoperationText.innerText.slice(0, -1) + operation;
    }

    //Delet the last digit
    processDelOperator() {
        this.currentOperationText.innerText =
            this.currentOperationText.innerText.slice(0, -1);
    }

    //erase current operation
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }

    //Clear all operations
    processClearOperation() {
        this.currentOperationText.innerText = "";
        this.previousoperationText.innerText = "";
    }

    //Process and operation
    processEqualOperation(){
        const operation = previousoperationText.innerText.split(" ")[1];

        this.processoperation(operation);
    }
}

const calc = new Calculator(previousoperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        }
        else {
            calc.processoperation(value);
        }
    })
});