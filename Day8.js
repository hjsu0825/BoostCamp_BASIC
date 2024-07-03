const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dayOfWeek = ['Su', 'Lu', 'Ma', 'Me', 'Jo', 'Ve', 'Sa'];
const shortMonths = [6, 12, 18, 24]; // 27일인 달

function earthDate(input) {
    let [year, month, day] = input.split('-').map(Number);
    function earthLeapYear(year) {
        return year % 4 === 0;
    }
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let total = 0;

    for (let y = 1; y < year; y++) {
        total += earthLeapYear(y) ? 366 : 365;
    }

    for (let m = 1; m < month; m++) {
        total += daysInMonth[m - 1];
    }

    if (month > 2 && earthLeapYear(year)) {
        total += 1; // 윤년이면 2월 29일을 추가
    }

    total += day;

    return total;
}

function marsDate(earthDay) {
    let marsDay = earthDay / 1.02749125; // 지구일 -> 화성일
    let marsYear = Math.floor(marsDay / 668.5907);
    marsDay = Math.floor(marsDay % 668.5907);

    function marsLeapYear(year) {
        return year % 2 === 1;
    }

    let marsMonth = 0;

    for (let i = 1; i <= 24; i++) {
        let marsMonthDay = shortMonths.includes(i) ? 27 : 28;
        if (i === 24 && marsLeapYear(marsYear)) {
            marsMonthDay = 28;
        }
        if (marsDay >= marsMonthDay) {
            marsDay -= marsMonthDay;
        } else {
            marsMonth = i;
            break;
        }
    }
    
    return [marsYear, marsMonth, marsDay];
}

function calendar(marsDate) {
    const [year, month, day] = marsDate;
    let calendarStr = `${year}년 ${month}월\n`;
    calendarStr += dayOfWeek.join(' ') + '\n';

    let daysInMonth = shortMonths.includes(month) ? 27 : 28;

    for (let d = 1; d <= daysInMonth; d++) {
        calendarStr += d.toString().padStart(2, ' ') + ' ';
        if ((d % 7) === 0) {
            calendarStr += '\n';
        }
    }
    console.log(calendarStr);
}

console.clear();
rl.question("지구날짜는? ", (inputDate) => {
    let earthDays = earthDate(inputDate);
    let marsDateResult = marsDate(earthDays);
    console.log(`지구날은 ${earthDays.toLocaleString()} => ${marsDateResult[0]} 화성년 ${marsDateResult[1]}월 ${marsDateResult[2]}일`);
    calendar(marsDateResult);
    rl.close();
});