const height = 5;   // 높이 지정
const width = 5;    // 플레이어 수(너비) 지정
let ladder = []     // 사다리를 저장할 빈 배열

// 배열을 초기화하는 함수
function reset() {
    ladder = Array.from(Array(height), () => {
        let row = []; // 각 행을 저장할 배열
        for (let i =0 ; i < width; i++){
            row.push('|');
            if (i < width -1) {
                row.push('   '); // 사다리 사이에 빈 칸 추가
            }
        }
        return row;
    });
}

// 3가지 발판을 랜덤으로 채우는 함수
function randomFill(){
    ladder = Array.from(Array(height), () => {
        let row = [];
        for (let i =0 ; i < width; i++){
            row.push('|');
            if (i < width -1) {
                const board = ['   ','---', '\\-\\', '/-/']; // 랜덤으로 채울 발판
                const index = Math.floor(Math.random()* board.length); // 발판 랜덤 인덱스 선택
                row.push(board[index]); // 랜덤한 발판 추가
            }
        }
        return row;
    });
}

// 사다리 데이터 구조 분석 함수
function analyze() {
    for (let row of ladder) {
        for (let i = 1; i < row.length; i+=2) { // 발판만 검사
            const left = row[i]; // 왼쪽
            const right = row[i+2]; // 오른쪽

            // 좌우에 1자 발판이 연속
            if (left === '---' && right === '---') return console.log(false);
            // 좌측에 우하향 발판 + 우측에 좌하향 발판
            if (left === '\\-\\' && right === '/-/') return console.log(false);
            // 좌측에 좌하향 발판 + 우측에 우하향 발판
            if (left === '/-/' && right === '\\-\\') return console.log(false);
        }
    }
    // 조건에 맞는 경우가 없을 때
    return console.log(true);
}

// 사다리 데이터 구조를 분석해서 문자열로 리턴
function display() {
    return console.log(ladder.map(c => c.join('')).join('\n'));
}

// 테스트 케이스
reset()
display()

console.log('=================')

reset()
randomFill()
display()

console.log('=================')

reset()
randomFill()
analyze()
display()