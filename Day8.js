const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dayOfWeek = ['Sol', 'Lun', 'Mar', 'Mer', 'Jov', 'Ven', 'Sat'];
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

    // 입력된 월의 1일부터 입력된 일 이전까지의 일수를 더함
    total += day;

    return total.toLocaleString();
}

function marsDate(earthDay) {
    let marsDay = earthDay / (24.65979 / 24);
    let marsYear = Math.floor(marsDay / 668.5907);
    marsDay = Math.floor(marsDay % 668.5907);

    function marsLeapYear(year) {
        return year % 2 === 0;
    }

    let marsTotal = marsLeapYear(marsYear) ? 669 : 668;
    let marsMonth = 0;

    for (let i = 1; i <= 24; i++){
        let marsMonthDay = shortMonths.includes(i) ? 27 : 28;
        if (i === 24 && marsLeapYear(marsYear)) {
            marsMonthDay = 28;
        }
        if (marsDay >= marsMonthDay) {
            marsDay -= marsMonthDay;
        }
        else {
            marsMonth = i;
            break;
        }
    }
    
    return [marsYear, marsMonth, marsDay];
}

function calendar(marsDate) {
    const [year, month, day] = marsDate;
    let calendar = `${year} 화성년 ${month}월 ${day}일\n`;
    calendar += dayOfWeek.join(' ') + '\n';

    
}

console.clear();
rl.question("지구날짜는? ", (inputDate) => {
    console.log('지구날은',earthDate(inputDate));
    rl.close();
})