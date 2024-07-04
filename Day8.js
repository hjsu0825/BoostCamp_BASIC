// 입력 처리를 받는 메서드
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dayOfWeek = ['Su', 'Lu', 'Ma', 'Me', 'Jo', 'Ve', 'Sa']; // 요일 선언
const shortMonths = [6, 12, 18, 24]; // 27일인 달

// 지구 날짜 계산하는 함수
function earthDate(input) {
    let [year, month, day] = input.split('-').map(Number); // 문자열로 입력 받은 날짜 연, 월, 일 분리
    function earthLeapYear(year) {
        return year % 4 === 0; // 윤년 계산하는 함수
    }
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 지구 월별 일수

    let total = 0;

    for (let y = 1; y < year; y++) {
        total += earthLeapYear(y) ? 366 : 365; // 윤년일 경우 1년 = 366일
    }

    for (let m = 1; m < month; m++) {
        total += daysInMonth[m - 1]; // 이번 연도 직전 달까지 합계
    }

    if (month > 2 && earthLeapYear(year)) {
        total += 1; // 윤년이면 2월 29일을 추가
    }

    total += day; // 남은 일수 총 날짜에 합계

    return total;
}

// 화성 날짜로 변환하는 함수
function marsDate(earthDay) {
    let marsDay = earthDay; // 지구일 -> 화성일

    let marsYear = Math.floor(marsDay / 668.5); // 총 화성일을 이용해 화성 연도 계산
    marsDay = Math.floor(marsDay % 668.5); // 화성 연도 계산 후 남은 일수

    function marsLeapYear(year) {
        return year % 2 === 0; // 윤년 계산
    }

    let marsMonth = 0; // 화성월을 담을 변수

    for (let i = 1; i <= 24; i++) {
        let marsMonthDay = shortMonths.includes(i) ? 27 : 28; // 6,12,18,24월이면 한 달에 27일
        if (i === 24 && marsLeapYear(marsYear)) {
            marsMonthDay = 28; // 윤년이면서 마지막 달은 28일
        }
        if (marsDay >= marsMonthDay) {
            marsDay -= marsMonthDay; // 남은 일수가 월보다 크면 빼줌
        }
        else {
            marsMonth = i; // 빼준만큼 화성월로 설정
            break;
        }
    }

    return [marsYear, marsMonth, marsDay];
}

// 달력을 출력하는 함수
function calendar(marsDate) {
    const [year, month, day] = marsDate;
    let calendarStr = `     ${year}년 ${month}월\n`;
    calendarStr += dayOfWeek.join(' ') + '\n';

    let daysInMonth = shortMonths.includes(month) ? 27 : 28;

    for (let i = 1; i <= daysInMonth; i++) {
        calendarStr += i.toString().padStart(2, ' ') + ' '; // 2칸으로 설정해서 출력 형식 유지
        if ((i % 7) === 0) {
            calendarStr += '\n'; // 7일마다 줄바꿈
        }
    }
    console.log(calendarStr);
}

// 진행바 출력 함수
function progressBar(duration) {
    return new Promise((resolve) => {
        const ticks = 10; // 10% 단위로 업데이트
        const intervalDuration = duration / ticks; // 각 업데이트 간의 시간 간격

        let progress = 0;

        const interval = setInterval(() => {
            progress += 10; // 10% 단위로 증가
            process.stdout.clearLine(); // 진행바를 동적으로 보여주기 위해 clear
            process.stdout.cursorTo(0); // 설정해주지 않으면 진행바가 계속 옆으로 이동함
            process.stdout.write(`${'▓'.repeat(progress / 10)}${'░'.repeat((100 - progress) / 10)} 화성까지 여행 ${progress}%`);

            if (progress >= 100) {
                clearInterval(interval); // 진행이 완료되면 interval을 멈춤
                resolve();
            }
        }, intervalDuration);
    });
}

// 실행
console.clear();
rl.question("지구날짜는? ", async (inputDate) => {
    let earthDays = earthDate(inputDate);
    let marsDays = marsDate(earthDays);
    await progressBar(5000);
    console.log(`\n지구날은 ${earthDays.toLocaleString()} => ${marsDays[0]} 화성년 ${marsDays[1]}월 ${marsDays[2]}일\n`);
    calendar(marsDays);
    rl.close();
});