const height = 5;   // 높이 지정
const width = 5;    // 플레이어 수(너비) 지정
let ladder = []     // 사다리를 저장할 빈 배열

// 배열을 초기화하는 함수
function reset() {
    ladder = Array.from(Array(height), () => {
        let row = []; // 각 행을 저장할 배열
        for (let i =0 ; i < width; i++){
            row.push('|');
            // 사다리 사이에 빈 칸 추가
            if (i < width -1) {
                row.push('   ');
            }
        }
        return row;
    });
}

function randomFill(){
    ladder = Array.from(Array(height), () => {
        let row = [];
        for (let i =0 ; i < width; i++){
            row.push('|');
            if (i < width -1) {
                const board = ['   ','---', '\\-\\', '/-/'];
                const index = Math.floor(Math.random()* board.length);
                row.push(board[index]);
            }
        }
        return row;
    });
}

function analyze() {
    for (let row of ladder) {
        for (let i = 1; i < row.length; i+=2) {
            const left = row[i];
            const right = row[i+2];

            if (left === '---' && right === '---') return console.log(false);
            if (left === '\\-\\' && right === '/-/') return console.log(false);
            if (left === '/-/' && right === '\\-\\') return console.log(false);
        }
    }
    return console.log(true);
}

function display() {
    return console.log(ladder.map(c => c.join('')).join('\n'));
}

reset()
randomFill()
analyze()
display()