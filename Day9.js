const fs = require('fs');
const filePath = 'D:\\BoostCamp_BASIC\\system.log';

class LogType {
    constructor(level, time, process, message) {
        this.level = level;
        this.time = time;
        this.process = process;
        this.message = message;
    }
}

function parseFile(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.trim().split('\n');

    return lines.map(line => {
        const part = line.split('\t')
        return new LogType(part[0], part[1], part[2], part[3]);
    }); 
}



//console.log(parseFile(filePath));
console.log(filterLevel(LogType, 'ERROR'));
//console.log(sortTime(LogType));