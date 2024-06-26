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

// 날짜를 받는 함수
function intDate(stringDate) {
    let year = parseInt(stringDate.substring(0,4), 10);
    let month = parseInt(stringDate.substring(4,6), 10) - 1;
    return new Date(year, month);
};

function find(param0, param1) {
    let date = intDate(param0);
    let players = param1;

    let durationGame = gamePeriods.filter(period => period.start <= date && period.end >= date).map(period => period.name);
    let availableGame = games.filter(game => durationGame.includes(game.name) && game.maxPlayers >= players);
    
    return availableGame.map(game => {
        if (game.discontinued) {
            return `${game.name}*(${game.genre}) ${game.rating}`
        } else {
            return `${game.name}(${game.genre}) ${game.rating}`
        }}).join(', ');
};

console.log(find("198402", 1)); // "Prince*(RPG) 4.8, Brave*(RPG) 4.2"
console.log(find("200008", 8)); // "Football(Sports)"
console.log(find("199004", 5)); // ""