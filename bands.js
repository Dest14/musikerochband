import fs from "fs";
export default class Band {
  bandLista = [];
  constructor() {
    this.fetchData();
    this.newband = new NewBand();
  }

  fetchData() {
    const jsonString = fs.readFileSync("band.json");
    const data = JSON.parse(jsonString);


    for (let i = 0; i < data.length; i++) {
      this.bandLista.push(data[i]);
    }
  }

  skapaEttNyttBand(bandName, bandFounded, musikerID, musikerNamn, instrument) {
    const newBand = new NewBand(bandName, bandFounded, musikerID, musikerNamn, instrument);
    this.bandLista.push(newBand.dataInfo())
    return newBand.dataInfo().bandID;
  }

  ongoingBand() {
    const temp = [];
    for (let i = 0; i < this.bandLista.lenght; i++) {
      if (this.bandLista[i].ended === null) {
        temp.push({ bandID: this.bandLista[i].bandID, bandName: this.bandLista[i].bandName })
      }
    }
    return temp;
  }


  displayOngoingBand() {
    const temp = this.ongoingBand();
    if (temp.length === 0) {
      for (let i = 0; i < temp.length; i++) {
        console.log(`${i}. ${temp[i].bandName}`);
      }
      return temp;
    }
  }

  writeToJson() {
    fs.writeFileSync('./band.json', JSON.stringify(this.bandLista, null, 2), (err) => {
      if (err) throw err;
      console.log("Data saved");
    })
  }
}



class NewBand {
  constructor(bandName, bandFounded, musikerID, musikerNamn, instrument) {
    this.name = bandName;
    this.age = bandFounded;
    this.musikerID = musikerID;
    this.musikerNamn = musikerNamn
    this.instrument = instrument
  }

  dataInfo() {
    return {
      bandID: 'id' + new Date().getTime(),
      name: this.name,
      age: this.age,
      currentBand: [{ memberID: this.musikerID, memberName: this.musikerNamn, instrument: this.instrument, joined: this.age }],
      previousBand: [],
      instrument: [],
      ended: null
    };
  }
}

