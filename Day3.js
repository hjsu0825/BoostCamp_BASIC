// 게임 판매 기간
const gamePeriods = [
    { name: "Kong", start: new Date(1970, 0), end: new Date(1981, 3) },
    { name: "Brave", start: new Date(1980, 5), end: new Date(1985, 0) },
    { name: "Dragons", start: new Date(1990, 4), end: new Date(1995, 11) },
    { name: "Mario", start: new Date(2001, 8), end: new Date(2007, 10) },
    { name: "Teken", start: new Date(1998, 6), end: new Date(2009, 11) },
    { name: "Ace", start: new Date(1987, 6), end: new Date(2024, 6) },
    { name: "Prince", start: new Date(1983, 2), end: new Date(2002, 4) },
    { name: "Football", start: new Date(1994, 5), end: new Date(2024, 6) },
    { name: "Civil", start: new Date(2002, 5), end: new Date(2024, 6) },
    { name: "GoCart", start: new Date(2006, 11), end: new Date(2024, 6) }
  ];

// 게임 이름, 단종여부, 장르, 별점, 최대참여자
const games = [
    { name: "Kong", discontinued: true, genre: "Adventure", rating: 4.1, maxPlayers: 1 },
    { name: "Ace", discontinued: false, genre: "Board", rating: 3.8, maxPlayers: 4 },
    { name: "Mario", discontinued: true, genre: "RPG", rating: 3.3, maxPlayers: 2 },
    { name: "Prince", discontinued: true, genre: "RPG", rating: 4.8, maxPlayers: 1 },
    { name: "Dragons", discontinued: true, genre: "Fight", rating: 3.4, maxPlayers: 4 },
    { name: "Civil", discontinued: false, genre: "Simulation", rating: 4.2, maxPlayers: 1 },
    { name: "Teken", discontinued: true, genre: "Fight", rating: 4.0, maxPlayers: 2 },
    { name: "GoCart", discontinued: false, genre: "Sports", rating: 4.6, maxPlayers: 8 },
    { name: "Football", discontinued: false, genre: "Sports", rating: 2.9, maxPlayers: 8 },
    { name: "Brave", discontinued: true, genre: "RPG", rating: 4.2, maxPlayers: 1 }
  ];
games.sort((a,b) => b.rating - a.rating); // 별점을 기준으로 내림차순 정렬

// 문자열로 된 날짜를 Date 객체로 변환하는 함수
function intDate(stringDate) {
    let year = parseInt(stringDate.substring(0,4), 10); // 연도 추출
    let month = parseInt(stringDate.substring(4,6), 10) - 1; // 월 추출(Date에 월이 +1돼서 들어가기 때문에 -1)
    return new Date(year, month); 
};

function find(param0, param1) {
    let date = intDate(param0); // 문자열로 된 날짜를 Date 객체로 변환
    let players = param1; // 참여자 수

    // 입력된 날짜에 플레이 가능한 게임 필터링
    let durationGame = gamePeriods.filter(period => period.start <= date && period.end >= date).map(period => period.name);
    // 날짜 + 인원수에 따른 플레이 가능한 게임 필터링
    let availableGame = games.filter(game => durationGame.includes(game.name) && game.maxPlayers >= players);
    
    // 결과 출력
    // 결과가 하나면서
    if (availableGame.length === 1) {
        return availableGame.map(game => {
            if (game.discontinued) {
                return `${game.name}*(${game.genre})` // 단종된 게임
            } else {
                return `${game.name}(${game.genre})` // 단종되지 않은 게임
            }}).join(', ');
    } 
    // 결과가 여러개면서
    else {
        return availableGame.map(game => {
            if (game.discontinued) {
                return `${game.name}*(${game.genre}) ${game.rating}` // 단종된 게임
            } else {
                return `${game.name}(${game.genre}) ${game.rating}` // 단종되지 않은 게임
            }}).join(', ');
    }
};

// 테스트케이스
console.log(find("198402", 1)); // "Prince*(RPG) 4.8, Brave*(RPG) 4.2"
console.log(find("200008", 8)); // "Football(Sports)"
console.log(find("199004", 5)); // ""