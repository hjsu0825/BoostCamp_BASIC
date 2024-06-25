/*
A, B, C, D 4명의 참가자
매 턴마다 1~4 사이 값 입력 제공
모든 참가자는 시작 지점에서 출발
한 번도 방문하지 않은 곳을 방문하면 방문자가 소유
다른 사람이 이미 소유한 곳은 뺏을 수 없음
모든 장소를 소유할 때까지 이동 가능
입력값이 없거나 방문할 곳이 없으면 종료
종료 시점에 소유한 장소 개수 리턴
*/

function play(moves){
    const board = Array(16).fill(null); // 보드판
    const players = ['A', 'B', 'C', 'D']; // 플레이어명
    const playerLoc = {'A': 0, 'B': 0, 'C': 0, 'D': 0}; // 플레이어 현재 위치
    const playerCnt = {'A': 0, 'B': 0, 'C': 0, 'D': 0}; // 플레이어 점유한 땅 개수

    let idx = 0; // 이동값 인덱스 초기화

    while (idx < moves.length) {
        let player = players[idx % 4]; // 현재 턴의 플레이어
        let move = moves[idx]; // 현재 턴의 이동값
        
        playerLoc[player] = (playerLoc[player] + move) % 16; // 현재 위치에 이동값을 더하고 16으로 나눈 값으로 보드판 순회
        let location = playerLoc[player]; // 이동 후 플레이어 위치

        if (board[location] === null && location !== 0) { // 이동한 위치가 비어있고, 시작 지점이 아니면
            board[location] = player; // 플레이어가 해당 위치 소유
            playerCnt[player] += 1; // 해당 플레이어의 점유한 땅 개수 +1
        }
        idx += 1; // 이동값 인덱스 +1
    }
    return playerCnt; // 모든 땅이 소유되면 종료 후 플레이어의 점유한 땅 개수 반환
}

// 테스트케이스
const test1 = [
    1,2,3,4,
    1,1,1,2,
    1,1,2,1,
    1,1,1,2];
console.log(play(test1));
// { A: 1, B: 2, C: 1, D: 4 }
const test2 = [
    1, 1, 1, 3,
    1, 1, 1, 1,
    1, 1, 1, 4,
    1, 1, 1, 1,
    2, 2, 1, 3,
    4, 4, 4, 2,
    1, 1, 1, 2,
    1, 1, 1, 1];
console.log(play(test2));
// { A: 5, B: 0, C: 1, D: 6 }
const test3 = [
    1, 2, 3, 4,
    4, 4, 4, 4,
    4, 4, 4, 4,
    4, 4, 4, 4,
    2, 3, 1, 3,
    1, 3, 2, 4];
console.log(play(test3));
// { A: 4, B: 4, C: 4, D: 3 }