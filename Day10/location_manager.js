const { Location } = require("./location.js");
const { scaleByPopulation, scaleByLongitude } = require("./scaleutiles.js");
const cityCluster = require("./cityCluster.js");

const MAX_YEAR_RANGE = 2024;
const MIN_YEAR_RANGE = 1940;
const MAX_POPULATION_RANGE = 10000;
const MIN_POPULATION_RANGE = 1000;
const MIN_LONGITUDE_RANGE = 1200;
const MAX_LONGITUDE_RANGE = 1300;

class LocationManager {
  #locations;
  #k;
  #initialCentroids;
  clusters_pop;
  clusters_long;

  constructor(input) {
    this.#locations = input.map((location) => new Location(location));
    this.#k = this.#getRandomInt(2, 10);
    this.#initialCentroids = new Array(this.#k);
    console.log(`초기 k 값: ${this.#k}`);
    console.log('초기 위치 데이터:', this.#locations);
  }

  #getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  #getRandomCentroid(k, opt) {
    let result = [];
    if (opt === "pop") {
      for (let i = 0; i < k; i++) {
        let x = this.#getRandomInt(MIN_YEAR_RANGE, MAX_YEAR_RANGE);
        let y = this.#getRandomInt(MIN_POPULATION_RANGE, MAX_POPULATION_RANGE);
        result.push({ year: x, population: y });
      }
    } else if (opt === "long") {
      for (let i = 0; i < k; i++) {
        let x = this.#getRandomInt(MIN_YEAR_RANGE, MAX_YEAR_RANGE);
        let y = this.#getRandomInt(MIN_LONGITUDE_RANGE, MAX_LONGITUDE_RANGE);
        result.push({ year: x, longitude: y });
      }
    }
    console.log(`초기 센트로이드 (${opt}):`, result);
    return result;
  }

  getClassToMap(locations) {
    let result = [];
    for (let e of locations) {
      let node = {
        seq: e.seq,
        city: e.city,
        year: e.year,
        latitude: e.latitude,
        longitude: e.longitude,
        population: e.population,
      };
      result.push(node);
    }
    return result;
  }

  kmeans_pop() {
    const cluster = new cityCluster(this.getClassToMap(scaleByPopulation(this.#locations)));
    const result = cluster.kmeans_pop(
      this.#k,
      this.#getRandomCentroid(this.#k, "pop")
    );
    this.clusters_pop = result.clusters;
    console.log('인구 기준 클러스터링 결과:', result);
    return result;
  }

  kmeans_long() {
    const cluster = new cityCluster(this.getClassToMap(scaleByLongitude(this.#locations)));
    const result = cluster.kmeans_long(
      this.#k,
      this.#getRandomCentroid(this.#k, "long")
    );
    this.clusters_long = result.clusters;
    console.log('경도 기준 클러스터링 결과:', result);
    return result;
  }

  printClusters(clusters, type) {
    clusters.forEach((cluster, index) => {
      if (!cluster || !cluster.centroid) {
        console.log(`그룹#${index + 1}에 문제가 있습니다:`, cluster);
        return;
      }
      const centroid = cluster.centroid;
      const cities = cluster.cities.map(city => city.city);
      console.log(`그룹#${index + 1} 중심값 : (${centroid.year}, ${type === "population" ? centroid.population : centroid.longitude})`);
      console.log(`그룹#${index + 1} 도시들 : ${JSON.stringify(cities)}`);
    });
  }

  printResults() {
    console.log("인구 기준 클러스터 결과:");
    this.printClusters(this.clusters_pop, "population");
    console.log("\n경도 기준 클러스터 결과:");
    this.printClusters(this.clusters_long, "longitude");
  }
}

module.exports = { LocationManager };
