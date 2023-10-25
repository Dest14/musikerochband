import fs from "fs";
import Band from "./bands.js"

export default class MusikerLista {
  lista = [];
  constructor() {
    this.fetchMusikerData();
    this.band = new Band();
  }

  fetchMusikerData() {
    const jsonString = fs.readFileSync("musiker.json");
    const data = JSON.parse(jsonString);


    for (let i = 0; i < data.length; i++) {
      this.lista.push(data[i]);
    }
  }

  MusikerLista(name, age, info) {
    const newMusiker = new NewMusiker(name, age, info);
    this.lista.push(newMusiker.dataInfo())
    this.writeToJson()
  }

  writeToJson() {
    fs.writeFileSync('./musiker.json', JSON.stringify(this.lista, null, 2), (err) => {
      if (err) throw err;
      console.log("Data saved");
    })
  }

  visaAllaMusiker() {
    for (let i = 0; i < this.lista.length; i++) {
      console.log(`${i}. ${this.lista[i].name}`);
    }
  }

  skapaEttNyttBand(choice, instrument, bandName, bandFounded) {
    const tempID = this.band.skapaEttNyttBand(bandName, bandFounded, this.lista[choice].musikerID, this.lista[choice].name, instrument);
    this.editMusikerLista(choice, instrument, tempID, bandName, bandFounded);
    this.band.writeToJson();
    this.writeToJson();
  }
  editMusikerLista(index, instrument, bandID, bandName, founded) {
    if (!this.lista[index].instrument.includes(instrument)) {
      this.lista[index].instrument.push(instrument);
    }
    this.lista[index].currentBand.push({ bandID: bandID, bandName: bandName, founded: founded });
  }

  addMTB(musikerIndex, instrument, bandID, bandName) {
    this.editMusikerLista(musikerIndex, instrument, bandID, bandName, new Date().getFullYear());
    this.band.editBand()
  }
}



class NewMusiker {
  constructor(name, age, info) {
    this.name = name
    this.age = age
    this.info = info
  }
  dataInfo() {
    return {
      musikerID: 'id' + new Date().getTime(),
      name: this.name,
      age: this.age,
      info: this.info,
      currentBand: [],
      previousBand: [],
      instrument: [],
    };
  }
}

