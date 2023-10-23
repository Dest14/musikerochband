import fs from "fs";
import Bander from "./band.js";

export default class BandLista {
  #listan = [];

  constructor() {
    this.#fetchBanderData();
  }

  get listan() {
    return this.#listan;
  }


  #fetchBanderData() {
    const jsonString = fs.readFileSync("band.json");
    const data = JSON.parse(jsonString);


    for (let i = 0; i < data.length; i++) {
      this.#listan.push(new Bander(data[i].name, data[i].about, data[i].funded, data[i].concluded));
    }
  }


  skrivUtBander() {
    for (let i = 0; i < this.#listan.length; i++) {
      console.log(`${i + 1}. ${this.#listan[i].name} ${this.#listan[i].about}`);
    }
  }


  skrivUtBanderMedCheckIn() {
    for (let i = 0; i < this.#listan.length; i++) {
      console.log(`${i + 1}. ${this.#listan[i].name} -> ${this.#listan[i].checkedIn}`);
    }
  }


  addBanderToList(name, about, funded, concluded) {
    this.#listan.push(new Bander(name, about, funded, concluded));
    this.#updateJsonFile();
  }

  removeBanderFromList(index) {
    this.#listan.splice(index, 1);
    this.#updateJsonFile();
  }

  #updateJsonFile() {
    let tempList = [];

    for (let i = 0; i < this.#listan.length; i++) {
      tempList.push(this.#listan[i].dataInfo());
    }

    fs.writeFileSync('./band.json', JSON.stringify(tempList, null, 2), (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });
  }

  checkInBander(index) {
    this.#listan[index].checkInAndOut();
    this.#updateJsonFile();
  }

  getLength() {
    return this.#listan.length;
  }
} 