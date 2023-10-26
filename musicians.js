import fs from 'fs'
import Band from './bands.js'

export default class Musiker {
  musikerLista = []
  constructor() {
    this.fetchData()
    this.band = new Band();
  }

  fetchData() {
    const jsonString = fs.readFileSync("musiker.json");
    const data = JSON.parse(jsonString);

    for (let i = 0; i < data.length; i++) {
      this.musikerLista.push(data[i]);
    }
  }

  skapaMusiker(name, age, info) {
    const newMusiker = new NewMusiker(name, age, info);
    this.musikerLista.push(newMusiker.dataInfo())
    this.skrivTillJson();
  }

  skrivTillJson() {
    fs.writeFileSync('./musiker.json', JSON.stringify(this.musikerLista, null, 2), (err) => {
      if (err) throw err;
      console.log('Artist data writen to file')
    })
  }

  visaAllaMusiker() {
    for (let i = 0; i < this.musikerLista.length; i++) {
      console.log(`${i}. ${this.musikerLista[i].name}`)
    }
  }

  removeMusiker(index) {
    if (index >= 0 && index < this.musikerLista.length) {
      const removedArtist = this.musikerLista.splice(index, 1)[0];
      console.log(`Removed artist: ${removedArtist.musikerNamn}`);
      this.skrivTillJson();
    } else {
      console.log("Invalid index. Artist not found.");
    }
  }



  visaEnMusiker(val) {
    console.log(this.musikerLista[val])
  }
  skapaEttBand(val, instrument, bandNamn, bandAge) {
    const tempID = this.band.skapaEttBand(bandNamn, bandAge, this.musikerLista[val].musikerID, this.musikerLista[val].name, instrument);
    this.editMusikerLista(val, instrument, tempID, bandNamn, bandAge);
    this.band.skrivTillJson();
    this.skrivTillJson();
  }

  editMusikerLista(index, instrument, bandID, bandNamn, yearCreated) {
    if (!this.musikerLista[index].instrument.includes(instrument)) {
      this.musikerLista[index].instrument.push(instrument);
    }
    this.musikerLista[index].currentBand.push({ bandID: bandID, bandName: bandNamn, yearCreated: yearCreated });
  }

  addMTB(musikerIndex, instrument, bandID, bandName) {
    let date = new Date().toLocaleString();
    this.editMusikerLista(musikerIndex, instrument, bandID, bandName, date);
    this.band.editBand(this.band.bandLista.findIndex(x => x.bandID === bandID), this.musikerLista[musikerIndex].musikerID, this.musikerLista[musikerIndex].name, instrument, date)
    this.band.skrivTillJson();
    this.skrivTillJson();
  }

  removeOneMusician(bandID, bandIndex, musikerID) {
    const date = new Date().toLocaleString();
    this.band.currentToPrevious(bandIndex, musikerID, date);
    this.currentToPrevious(this.musikerLista.findIndex(x => x.musikerID === musikerID), bandID, date);
    this.band.skrivTillJson();
    this.skrivTillJson()
  }

  currentToPrevious(musikerID, bandID, date) {
    const music = this.musikerLista[musikerID];
    const band = music.currentBand.find(x => x.bandID === bandID);
    band["timeLeft"] = date;

    music.previusBand.push(band);
    music.currentBand.splice(music.currentBand.findIndex(x => x.bandID === bandID), 1)
  }

  visaDetaljeradInfo(musikerIndex) {
    const musiker = this.musikerLista[musikerIndex];

    console.log('Musiker Detaljer:');
    console.log('------------------');
    console.log('Namn:', musiker.name);
    console.log('Ålder:', musiker.age);
    console.log('Info:', musiker.info);
    console.log('Instrument:', musiker.instrument.join(', '));

    console.log('\nAktuella Band:');
    musiker.currentBand.forEach(band => {
      const bandDetaljer = this.band.bandLista.find(b => b.bandID === band.bandID);
      console.log('Band Namn:', bandDetaljer.name);
      console.log('Ålder:', bandDetaljer.age);
      console.log('Medlemmar:');
      bandDetaljer.currentBand.forEach(medlem => {
        console.log(`- ${medlem.memberName} (${medlem.instrument})`);
      });
      console.log('------------------');
    });

    console.log('\nTidigare Band:');
    musiker.previusBand.forEach(prevBand => {
      const bandDetaljer = this.band.bandLista.find(b => b.bandID === prevBand.bandID);
      if (bandDetaljer) {
        console.log('Band Namn:', bandDetaljer.name);
        console.log('Ålder:', bandDetaljer.age);
        console.log('Medlemmar:');
        bandDetaljer.previusBand.forEach(medlem => {
          if (medlem.memberID === musiker.musikerID) {
            console.log(`- ${medlem.memberName} (${medlem.instrument})`);
          }
        });
        console.log('------------------');
      }
    });
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
      previusBand: [],
      instrument: []
    };
  }
}