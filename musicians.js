import fs from "fs";
import Musiker from "./musician.js";

export default class MusikerLista {
  #lista = [];

  constructor() {
    this.#fetchMusikerData();
  }

  get lista() {
    return this.#lista;
  }


  #fetchMusikerData() {
    const jsonString = fs.readFileSync("musiker.json");
    const data = JSON.parse(jsonString);


    for (let i = 0; i < data.length; i++) {
      this.#lista.push(new Musiker(data[i].name, data[i].lastname, data[i].instrument, data[i].födelseår, data[i].nuverandeband, data[i].gammalband, data[i].info));
    }
  }


  skrivUtMusiker() {
    for (let i = 0; i < this.#lista.length; i++) {
      console.log(`${i + 1}. ${this.#lista[i].name} ${this.#lista[i].lastname} ${this.#lista[i].instrument} ${this.#lista[i].födelseår} ${this.#lista[i].nuverandeband}`);
    }
  }


  skrivUtMusikerMedCheckIn() {
    for (let i = 0; i < this.#lista.length; i++) {
      console.log(`${i + 1}. ${this.#lista[i].name} ${this.#lista[i].lastname} ${this.#lista[i].instrument} ${this.#lista[i].födelseår} ${this.#lista[i].nuverandeband} ${this.#lista[i].gammalband} ${this.#lista[i].checkedIn} = ${this.#lista[i].checkedIn}`);
    }
  }


  addMusikerToList(name, lastname, instrument, födelseår, nuverandeband, gammalband, info) {
    this.#lista.push(new Musiker(name, lastname, instrument, födelseår, nuverandeband, gammalband, info));
    this.#updateJsonFile();
  }

  removeMusikerFromList(index) {
    this.#lista.splice(index, 1);
    this.#updateJsonFile();
  }

  #updateJsonFile() {
    let tempList = [];

    for (let i = 0; i < this.#lista.length; i++) {
      tempList.push(this.#lista[i].dataInfo());
    }

    fs.writeFileSync('./musiker.json', JSON.stringify(tempList, null, 2), (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });
  }

  checkInMusiker(index) {
    this.#lista[index].checkInAndOut();
    this.#updateJsonFile();
  }

  getLength() {
    return this.#lista.length;
  }
} 