export default class Musiker {
  #firstName;
  #lastName;
  #instrument;
  #födelseår;
  #nuverandeband;
  #gammalband;
  #info;
  #checkedIn;

  constructor(name, lastname, instrument, födelseår, nuverandeband, gammalband, info, checkedIn = false) {
    this.#firstName = name;
    this.#lastName = lastname;
    this.#instrument = instrument;
    this.#födelseår = födelseår;
    this.#nuverandeband = nuverandeband;
    this.#gammalband = gammalband;
    this.#info = info;
    this.#checkedIn = checkedIn;
  }

  get name() {
    return this.#firstName;
  }

  get lastname() {
    return this.#lastName;
  }

  get instrument() {
    return this.#instrument;
  }

  get födelseår() {
    return this.#födelseår;
  }


  get nuverandeband() {
    return this.#nuverandeband;
  }

  get gammalband() {
    return this.#gammalband;
  }

  get info() {
    return this.#info;
  }

  get checkedIn() {
    return this.#checkedIn;
  }

  set name(newName) {
    this.#firstName = newName;
  }

  set lastname(newName) {
    this.#lastName = newName;
  }

  set instrument(NewInst) {
    this.#instrument = NewInst;
  }

  set födelseår(NewAge) {
    this.#födelseår = NewAge;
  }

  set nuverandeband(NewBand) {
    this.#nuverandeband = NewBand;
  }

  set gammalband(OldBand) {
    this.#gammalband = OldBand;
  }

  set info(Information) {
    this.#info = Information;
  }




  checkInAndOut() {
    this.#checkedIn = !this.#checkedIn;
  }

  dataInfo() {
    return {
      "name": this.#firstName,
      "lastname": this.#lastName,
      "instrument": this.#instrument,
      "födelseår": this.#födelseår,
      "newband": this.#nuverandeband,
      "oldband": this.#gammalband,
      "information": this.info,
      "checkedIn": this.#checkedIn
    };
  }
}

