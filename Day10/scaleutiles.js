const LOGITUDE_SCALE = 10;
const POPULATION_SCALE = 5000;
function scaleByPopulation(a) {
  b = [];
  for (i = 0; i < a.length; i++) {
    a.popluation /= POPULATION_SCALE;
    let { seq, year, population } = [a.seq, a.year, a.population];
    b.push({ seq, year, population });
  }
  return b;
}

function sacleByLogitude(a) {
  b = [];
  for (i = 0; i < a.length; i++) {
    a.logitude *= LOGITUDE_SCALE;
    let { seq, year, logitude } = [a.seq, a.year, a.logitude];
    b.push({ seq, year, logitude });
  }
  return b;
}

module.exports = { scaleByPopulation, sacleByLogitude };