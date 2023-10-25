import PromptSync from "prompt-sync";
const prompt = PromptSync({ sigint: true })
import MusikerLista from "./musicians.js";
import Band from "./bands.js";

const musiker = new MusikerLista();
const band = new bandLista();
console.log
  (`Meny:
  1. Skapa 
  3. skapa band
  4. Lägg till musiker till band`);
const choice = prompt();

switch (choice) {
  case "1":
    let name = prompt("Vad heter artistern?: ")
    let age = prompt("Hur gammal är artisten?: ")
    let info = prompt("Skriv in info?: ")
    musiker.MusikerLista(name, age, info);
    break;
  case "3":
    if (musiker.lista <= 0) {
      console.log("Du måste börja med att skapa en artist");
    } else {
      musiker.visaAllaMusiker();
      let choice = prompt("Vilken artist vill du välja");
      if (choice < 0 || choice > musiker.lista.length || isNaN(choice)) {
        console.log("Ogiltig input");
      } else {
        let instrument = prompt("Vilken instrument spelar artisten?: ")
        let bandName = prompt("Vilket band tillhör artisten?: ")
        let bandFounded = prompt("Vilket år skapades bandet?: ");
        musiker.skapaEttNyttBand(choice, instrument, bandName, bandFounded);
      }
    }
    break;
  case "4":
    if (musiker.musikerLista.length === 0) {
      console.log("Inga musiker hittades")
    } else if (band.bandLista.length === 0) {
      console.log("Inga band hittades")
    } else {
      musiker.visaAllaMusiker();
      choice = prompt("Vilken musiker vill du ha");
      let choice = prompt("Vilken artist vill du välja");
      if (choice < 0 || choice > musiker.lista.length || isNaN(choice)) {
        console.log("Ogiltig input");
      } else {
        const instrument = prompt("vad spelar musikern för instrument")
        const temp = band.isplayOngoingBand();
        if (temp.length === 0) {
          console.log("Hittade inga band");
        } else {
          const choice2 = prompt("vilken band vill du ha?: ")
          if (choice2 < 0 || choice2 > lista.length || isNaN(choice2)) {
            console.log("Ogiltig input");
          } else {
            musiker.addMTB(choice, instrument, temp[choice2].bandID)
          }

        }
      }
    }
    break;
}
