const fs = require('fs');
const filePath = './system.log';

// 로그 항목을 나타내는 클래스 정의
class LogType {
    constructor(level, time, process, message) {
        this.level = level; // 로그 레벨
        this.time = time; // 기록 시각
        this.process = process; // 프로세스
        this.message = message; // 기록
    }
}

// 파일을 읽고 로그 항목으로 파싱하는 함수
function parseFile(filePath) {
    const data = fs.readFileSync(filePath, 'utf8'); // 파일 내용을 읽어 문자열로 반환
    const lines = data.trim().split('\n'); // 문자열을 줄 단위로 분리

    return lines.map(line => {
        const parts = line.split('\t'); // 각 줄을 탭 문자로 분리
        return new LogType(parts[0], parts[1], parts[2], parts[3]); // 분리된 부분을 사용하여 LogType 객체 생성
    });
}

// 로그 레벨에 따라 필터링하는 함수
function filterLevel(logEntries, level) {
    return logEntries.filter(entry => entry.level === level); // 로그 레벨이 일치하는 항목만 반환
}

// 로그 시각으로 정렬하는 함수
function sortTime(logEntries) {
    return logEntries.sort((a, b) => new Date(a.time) - new Date(b.time)); // 시간 순으로 정렬
}

// 프로세스 이름으로 필터링하는 함수
function filterProcess(logEntries, name) {
    return logEntries.filter(entry => entry.process === name); // 프로세스 이름이 일치하는 항목만 반환
}

// 프로세스 이름으로 정렬하는 함수
function sortProcess(logEntries) {
    return logEntries.sort((a, b) => {
        const processA = a.process || ''; // 프로세스 이름이 없으면 빈 문자열로 대체
        const processB = b.process || ''; // 프로세스 이름이 없으면 빈 문자열로 대체
        return processA.localeCompare(processB); // 프로세스 이름을 기준으로 문자열 비교
    });
}

// 로그레벨, 프로세스 별로 카운트값을 가져오는 함수
function countLevelProcess(logEntries) {
    const count = {}; // 결과를 저장할 객체
    logEntries.forEach(entry => { // 각 로그 항목에 대해
        if (!count[entry.level]) { // 해당 로그 레벨이 객체에 없으면
            count[entry.level] = {}; // 새로운 객체 생성
        }
        if (!count[entry.level][entry.process]){ // 해당 프로세스 이름이 객체에 없으면
            count[entry.level][entry.process] = 0; // 카운트를 0으로 초기화
        }
        count[entry.level][entry.process]++; // 해당 레벨과 프로세스에 대한 카운트 증가
    });
    return count;
}

const logEntries = parseFile(filePath);

// 테스트 케이스
// console.log(parseFile(filePath));
// console.log(filterLevel(logEntries, 'error'));
// console.log(sortTime(logEntries)); 
// console.log(filterProcess(logEntries, 'bluetoothd')); 
// console.log(filterProcess(logEntries, 'mediaanalysisd'));
// console.log(sortProcess(logEntries));
// console.log(countLevelProcess(logEntries));
