const { LocationManager } = require("./location_manager.js");
const fs = require("fs");

const input = fs.readFileSync("./locations.txt").toString().trim().split("\n").map(location => location.split(" "));

const locationManager = new LocationManager(input);
locationManager.kmeans_pop();
locationManager.kmeans_long();

locationManager.printResults();
