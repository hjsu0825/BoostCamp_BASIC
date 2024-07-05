class Location{
  #seq;
  #city;
  #year;
  #latitude;
  #longitude;
  #population;

  constructor(location) {
    this.#seq = Number(location[0]);
    this.#city = location[1];
    this.#year = Number(location[2]);
    this.#latitude = Number(location[3]);
    this.#longitude = Number(location[4]);
    this.#population = Number(location[5]);
  }

  get seq() {
    return this.#seq;
  }

  get city() {
    return this.#city;
  }

  get year() {
    return this.#year;
  }

  get latitude() {
    return this.#latitude;
  }

  get longitude() {
    return this.#longitude;
  }

  get population() {
    return this.#population;
  }
}

module.exports = {Location};
