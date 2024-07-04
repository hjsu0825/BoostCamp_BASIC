// 총괄 함수(클래스 역할)
async function getMarsCalender(earthDate){
    const days = earthDateTODays(earthDate);
    const marsDate = daysTOMarsDate(days);
    // 5초 대기 progress bar 그리기
    await showProgressBar(5000);
    display(marsDate);

    // 지구 날짜를 전체 일수로 변경
    function earthDateTODays(earthDate) {
        const [years, month, days] = earthDate.split("-").map(Number);
        const earthMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        let totalDays = (+years - 1) * 365.25;

        for (let i = 0; i < month - 1; i++){
            totalDays += earthMonth[i];
        }

        totalDays += days;
        totalDays += isLeapYear(years) && month > 2 ? 1 : 0;

        // 윤년 여부를 확인하는 함수
        function isLeapYear(year) {
            return (year % 4 === 0);
        }
        
        return parseInt(totalDays);
    }

    // 일수를 화성 날짜로 변경
    function daysTOMarsDate(totalDays){
        const years = parseInt(totalDays / 668.5) + 1;
        let month = (totalDays % 668.5) / 28;
        let days = Math.ceil((totalDays % 668.5) % 28);
        
        // 달 바꾸기
        if (parseInt(month) !== month) month = parseInt(month) + 1;
        days += (month === 24)? 3 : Math.floor(month / 6);

        const marsDate = [years,month,days].join("-");
        return marsDate;
    }

    // 가시화
    function display(date){
        let [years, month, days] = date.split("-").map(String);
        const week = ["Su", "Lu", "Ma", "Me", "Jo", "Ve", "Sa"];
        years = years + "년";
        month = month + "월";
        // 윤년 체크
        if ([6, 12, 18, 24].includes(month)) {
            if (years % 2 === 0 && month === 24) days = 28;
            else days = 27;
        }
        else days = 28;
        
        console.log("    ", years, month);
        console.log(week.join(" "));
        for(let i = 1; i < (+days + 1); i++){
            process.stdout.write(`${i.toString().padStart(2, ' ')} `);
            if (i % 7 === 0) console.log();
        }
        
    }

    // 5초 대기 progress bar 함수
    function showProgressBar(duration) {
        return new Promise((resolve) => {
            const interval = 50; // progress bar 업데이트 간격 (ms)
            const totalSteps = duration / interval;
            const maxHashCount = 10;
            let currentStep = 0;
            
            process.stdout.write("Progress: [");
            const progressBarInterval = setInterval(() => {
                currentStep++;
                const hashCount = Math.floor((currentStep / totalSteps) * maxHashCount);
                const percentage = Math.floor((currentStep / totalSteps) * 100);
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                process.stdout.write(`Progress: [${'='.repeat(hashCount).padEnd(maxHashCount, ' ')}] ${percentage}%`);
                if (currentStep >= totalSteps) {
                    clearInterval(progressBarInterval);
                    console.log();
                    console.log(marsDate);
                    resolve();
                }
            }, interval);
        });
    }

    return marsDate;
}



function testCase1(){
    const earthDate = '2024-01-01';
    getMarsCalender(earthDate);
}

testCase1();