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
    let marsDay = earthDay; // 지구일 -> 화성일

    let marsYear = Math.floor(marsDay / 668.5);
    marsDay = Math.floor(marsDay % 668.5);

    function marsLeapYear(year) {
        return year % 2 === 0;
    }

    let marsMonth = 0;

    for (let i = 1; i <= 24; i++) {
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
    let calendarStr = `     ${year}년 ${month}월\n`;
    calendarStr += dayOfWeek.join(' ') + '\n';

    let daysInMonth = shortMonths.includes(month) ? 27 : 28;

    for (let i = 1; i <= daysInMonth; i++) {
        calendarStr += i.toString().padStart(2, ' ') + ' ';
        if ((i % 7) === 0) {
            calendarStr += '\n';
        }
    }
    console.log(calendarStr);
}

function progressBar(duration) {
    return new Promise((resolve) => {
        const ticks = 10; // 10% 단위로 업데이트
        const intervalDuration = duration / ticks; // 각 업데이트 간의 시간 간격

        let progress = 0;

        const interval = setInterval(() => {
            progress += 10; // 10% 단위로 증가
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(`${'▓'.repeat(progress / 10)}${'░'.repeat((100 - progress) / 10)} 화성까지 여행 ${progress}%`);

            if (progress >= 100) {
                clearInterval(interval); // 진행이 완료되면 interval을 멈춤
                resolve();
            }
        }, intervalDuration);
    });
}

console.clear();
rl.question("지구날짜는? ", async (inputDate) => {
    let earthDays = earthDate(inputDate);
    let marsDays = marsDate(earthDays);
    await progressBar(5000);
    console.log(`\n지구날은 ${earthDays.toLocaleString()} => ${marsDays[0]} 화성년 ${marsDays[1]}월 ${marsDays[2]}일\n`);
    calendar(marsDays);
    rl.close();
});