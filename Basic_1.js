/*
요구사항
- '-' 문자가 포함되어 있어도 동작해야 한다. 이 부분 코드를 찾아서 개선한다.
- 001과 002로 시작하는 번호는 국제전화로 판단해서 앞 3자리를 제외하고 8자리 ~ 12자리까지만 허용하는 로직을 추가한다.
*/
function solution(telno) {
    const tel = telno.replace(/-/g, ''); // replace를 이용해 하이픈 제거
    const failure = ["전국", "X"];
    const map = {
        "010": "휴대폰", "011": "휴대폰", "016": "휴대폰", "017": "휴대폰", "018": "휴대폰", "019": "휴대폰",
        "031": "경기", "032": "인천", "033": "강원",
        "041": "충청", "042": "대전", "044": "세종",
        "051": "부산", "052": "울산", "053": "대구", "054": "경북", "055": "경남",
        "061": "전남", "062": "광주", "063": "전북", "064": "제주"
    };

    if (tel.length > 15 || tel.length < 9) { // 전화번호 길이가 15자리 초과하거나 9자리 미만이면 failure
        if (tel.startsWith("001") || tel.startsWith("002")) // 국제전화일 경우
            return ["국제전화", "X"];
        else {
            return failure;
        }
    }
    else if (tel[0] !== '0') return failure; // 전화번호 시작이 0이 아니면 failure

    const top = tel.substring(0, 3); // 전화번호 앞 3자리
    const ext = tel.substring(tel.length - 4); // 전화번호 끝 4자리
    const mid = tel.substring(3); // 전화번호 앞 3자리를 제외한 부분

    if (tel.startsWith("001") || tel.startsWith("002")) { // 국제전화 검사
        if (mid.length >= 8 && mid.length <= 12) { // 앞 3자리를 제외한 부분이 8자리 이상 12자리 이하
            return ["국제전화", "O"];
        } else {
            return ["국제전화", "X"];
        }
    }

    if (tel[1] === '2') { // 전화번호 앞자리가 02로 시작할 경우
        if (tel.length !== 10) return ["서울", "X"]; // 전화번호 길이가 10자리가 아닐 경우
        if (ext[0] === ext[1] && ext[1] === ext[2] && ext[2] === ext[3]) return ["서울", "X"]; // 전화번호 끝 4자리가 겹칠 경우
        return ["서울", "O"];
    }
    else if (tel[1] === '1') { // 전화번호가 앞자리가 01로 시작할 경우
        if (!map[top]) return failure; // 앞 3자리가 map에 없을 경우, ex) 012, 013, ..
        if (tel[2] !== '0') return ["휴대폰", "X"]; // 전화번호 3번째 자리가 0이 아닐 경우
        if (tel.length === 11 && parseInt(tel[3]) % 2 === 0) return ["휴대폰", "O"]; // 전화번호 길이가 11자리, 전화번호 4번째 자리가 짝수일 경우
        return ["휴대폰", "X"];
    }
    else if (map[top]) { // map에 첫 3자리가 있을 경우
        if (tel.length === 10 && tel[3] === '0') return [map[top], "X"]; // 길이가 10, 4번째 자리가 0일 경우
        return [map[top], "O"];
    }

    return failure;
}

console.log(solution("010-123-1234"));  // [ '휴대폰', 'X' ]
console.log(solution("010-2234-1234")); // [ '휴대폰', 'O' ]
console.log(solution("02-1234-1234"));  // [ '서울', 'O' ]
console.log(solution("0212341111"));    // [ '서울', 'X' ]
console.log(solution("0311237890"));    // [ '경기', 'O' ]
console.log(solution("061-012-7890"));  // [ '전남', 'X' ]
console.log(solution("015-0157899"));   // [ '전국', 'X' ]
console.log(solution("042-2123-7890")); // [ '대전', 'O' ]

console.log(solution("0-1-0-2-2-3-45678")); // [ '휴대폰', 'O' ]
console.log(solution("001-12345678"));      // [ '국제전화', 'O' ]
console.log(solution("002-234567890123"));  // [ '국제전화', 'O' ]
console.log(solution("002-3456789"));       // [ '국제전화', 'X' ]
console.log(solution("001-4567890123456")); // [ '국제전화', 'X' ]