let A = null;
let B = null;
let stk = [];

function POPA() {
    if (stk.length === 0) {
        return "EMPTY";
    }
    else {
        A = stk.pop();
        return null;
    }
}

function POPB() {
    if (stk.length === 0) {
        return "EMPTY";
    }
    else {
        B = stk.pop();
        return null;
    }
}

function ADD() {
    if (A === null || B === null) {
        return "ERROR";
    }
    if (stk.length >= 8) {
        return "OVERFLOW";
    }
    stk.push(A + B);
    return null;
}

function SUB() {
    if (A === 0 || B === 0) {
        return "ERROR";
    }
    if (stk.length >= 8) {
        return "OVERFLOW";
    }
    stk.push(A - B);
    return null;
}

function PUSH0() {
    if (stk.length >= 8) {
        return "OVERFLOW";
    }
    stk.push(0);
    return null;
}

function PUSH1() {
    if (stk.length >= 8) {
        return "OVERFLOW";
    }
    stk.push(1);
    return null;
}

function PUSH2() {
    if (stk.length >= 8) {
        return "OVERFLOW";
    }
    stk.push(2);
    return null;
}

function SWAP() {
    if (A === 0 || B === 0) {
        return "ERROR";
    }
    let temp = A;
    A = B;
    B = temp;
    return null;
}

function PRINT() {
    if (stk.length === 0) {
        return "EMPTY";
    }
    return stk.pop().toString();
}

function calculation(input) {
    let output = [];
    for (let cmd of input) {
        let result;
        switch (cmd) {
            case "POPA": result = POPA(); break;
            case "POPB": result = POPB(); break;
            case "ADD": result = ADD(); break;
            case "SUB": result = SUB(); break;
            case "PUSH0": result = PUSH0(); break;
            case "PUSH1": result = PUSH1(); break;
            case "PUSH2": result = PUSH2(); break;
            case "SWAP": result = SWAP(); break;
            case "PRINT": result = PRINT(); break;
            default: result = "UNKNOWN";
        }
        if (result !== null) {
            output.push(result);
        }
    }
    return output;
}

console.log(calculation(["PRINT", "PUSH0", "PRINT", "POPA"])); // ["EMPTY", "0", "EMPTY"]
console.log(calculation(["PUSH1", "PUSH1", "PUSH2", "POPA", "POPB", "SWAP", "ADD", "PRINT", "PRINT"])); // ["3", "1"]
console.log(calculation(["PUSH2", "PUSH2", "PUSH1", "POPA", "POPB", "SWAP", "SUB", "POPA", "POPB", "ADD", "PRINT"])); // ["3"]
console.log(calculation(["ADD", "PUSH2", "PUSH1", "PUSH0", "PUSH2", "PUSH1", "PUSH2", "PUSH2", "PUSH0", "PUSH2", "PUSH3"])); // ["ERROR", "OVERFLOW", "UNKNOWN"]