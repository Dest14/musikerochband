class Musiker {
  namn;
  födelseår;
  stad;

  constructor(namn, födelseår, stad) {
    this.namn = namn;
    this.födelseår = födelseår;
    this.stad = stad;
    console.log("Nu är en person skapad!")
  }
}

const aMusiker = new Musiker("Jobe", 1990, "Benin")
console.log(aMusiker.födelseår);