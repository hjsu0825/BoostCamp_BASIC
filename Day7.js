let A = null;   // 레지스터 A
let B = null;   // 레지스터 B
let stk = [];   // 스택

function POPA() {
    if (stk.length === 0) {
        return "EMPTY"; // 스택에 꺼낼 값이 없으면 EMPTY 출력
    } else {
        A = stk.pop();  // 스택 메모리에서 값 하나 꺼내서 A에 저장
        return null;
    }
}

function POPB() {
    if (stk.length === 0) {
        return "EMPTY"; // 스택에 꺼낼 값이 없으면 EMPTY 출력
    } else {
        B = stk.pop();  // 스택 메모리에서 값 하나 꺼내서 B에 저장
        return null;
    }
}

function ADD() {
    if (A === null || B === null) {
        return "ERROR";     // A나 B가 초기 상태일 경우 ERROR 출력
    }
    if (stk.length >= 8) {
        return "OVERFLOW";  // 스택의 8칸을 모두 채운 이후 OVERFLOW 출력
    }
    stk.push(A + B);        // A와 B 값 더하기
    A = null;               // 사용한 값 초기화
    B = null;
    return null;
}

function SUB() {
    if (A === null || B === null) {
        return "ERROR";     // A나 B가 초기 상태일 경우 ERROR 출력
    }
    if (stk.length >= 8) {
        return "OVERFLOW";  // 스택의 8칸을 모두 채운 이후 OVERFLOW 출력
    }
    stk.push(A - B);        // A와 B 값 빼기
    A = null;               // 사용한 값 초기화
    B = null;
    return null;
}

function PUSH0() {
    if (stk.length >= 8) {
        return "OVERFLOW";  // 스택의 8칸을 모두 채운 이후 OVERFLOW 출력
    }
    stk.push(0);            // 스택에 0 값 push
    return null;
}

function PUSH1() {
    if (stk.length >= 8) {
        return "OVERFLOW";  // 스택의 8칸을 모두 채운 이후 OVERFLOW 출력
    }
    stk.push(1);            // 스택에 1 값 push
    return null;
}

function PUSH2() {
    if (stk.length >= 8) {
        return "OVERFLOW";  // 스택의 8칸을 모두 채운 이후 OVERFLOW 출력
    }
    stk.push(2);            // 스택에 2 값 push
    return null;
}

function SWAP() {
    if (A === null || B === null) {
        return "ERROR"; // A나 B가 초기 상태일 경우 ERROR 출력
    }
    // temp를 이용해 A와 B 값 swap
    let temp = A;
    A = B;
    B = temp;
    return null;
}

function PRINT() {
    if (stk.length === 0) {
        return "EMPTY"; // 스택이 비어있을 경우 EMPTY 출력 
    }
    return stk.pop().toString(); // 스택의 마지막 값 문자열로 출력
}

// 배열로 된 입력 값을 실행하기 위한 함수
function calculation(input) {
    let output = []; // 출력할 결과를 담을 리스트
    for (let cmd of input) {
        let result; // 함수를 실행한 결과
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
            output.push(result); // 결과값이 null이 아닐 경우만 출력
        }
    }
    return output;
}

// 테스트 케이스
console.log(calculation(["PRINT", "PUSH0", "PRINT", "POPA"])); // ["EMPTY", "0", "EMPTY"]
console.log(calculation(["PUSH1", "PUSH1", "PUSH2", "POPA", "POPB", "SWAP", "ADD", "PRINT", "PRINT"])); // ["3", "1"]
console.log(calculation(["PUSH2", "PUSH2", "PUSH1", "POPA", "POPB", "SWAP", "SUB", "POPA", "POPB", "ADD", "PRINT"])); // ["3"]
console.log(calculation(["ADD", "PUSH2", "PUSH1", "PUSH0", "PUSH2", "PUSH1", "PUSH2", "PUSH2", "PUSH0", "PUSH2", "PUSH3"])); // ["ERROR", "OVERFLOW", "UNKNOWN"]