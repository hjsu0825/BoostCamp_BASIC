const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dayOfMonth = {
    default: 28,
    short: 27
};
const dayOfWeek = ['Sol', 'Lun', 'Mar', 'Mer', 'Jov', 'Ven', 'Sat'];
const shortMonths = [6, 12, 18, 24]; // 27일인 달

function totalDay(input) {
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

function isLeapYear(year) {
    return year % 2 === 0;
}

function marsDate(earthDay) {
    let marsDay = earthDay / (24.65979 / 24);
    let marsYear = Math.floor(marsDay / 668.5907);
    marsDay %= 668.5907;

    
}

console.clear();
rl.question("지구날짜는? ", (inputDate) => {
    console.log('지구날은',totalDay(inputDate));
    rl.close();
})