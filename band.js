export default class Bander {
  #bandname;
  #about;
  #funded;
  #concluded;
  #checkedIn;


  constructor(name, about, funded, concluded, checkedIn = false) {
    this.#bandname = name;
    this.#about = about;
    this.#funded = funded;
    this.#concluded = concluded;
    this.#checkedIn = checkedIn;
  }

  get name() {
    return this.#bandname;
  }

  get about() {
    return this.#about;
  }

  get funded() {
    return this.#funded;
  }

  get concluded() {
    return this.#concluded;
  }

  get checkedIn() {
    return this.#checkedIn;
  }



  set name(newBand) {
    this.#bandname = newBand;
  }

  set about(nyttInfo) {
    this.#about = nyttInfo;
  }

  set funded(year) {
    this.#funded = year;
  }

  set concluded(EndYear) {
    this.#concluded = EndYear;
  }

  checkInAndOut() {
    this.#checkedIn = !this.#checkedIn;
  }




  dataInfo() {
    return {
      "bandname": this.#bandname,
      "about": this.#about,
      "funded": this.#funded,
      "concluded": this.#concluded,
    };
  }
}

