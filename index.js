import PromptSync from "prompt-sync";
import MusikerLista from "./musicians.js";
import BanderLista from "./bands.js";

const prompt = PromptSync({ sigint: true });
const musikerLista = new MusikerLista();
const banderLista = new BanderLista();


let run = true;
while (run) {
  console.log(`
Meny:
1. Skapa ny artist
2. Skapa nytt band
3. Skriv ut artister
4. Ta bort artist
5. Skriv ut artist 
A. Avsluta programmet

Skriv här: `);

  const val = prompt();

  switch (val.trim().toUpperCase()) {
    case "1":
      const firstName = prompt(`Skriv in artistens förnamn: `)
      const lastName = prompt(`Skriv in artistens efternamn: `)
      const instrument = prompt(`Skriv in artistens instrument: `)
      const födelseår = prompt(`Skriv in artistens födelseår: `)
      const nuverandeband = prompt(`Skriv in artistens nuverande band: `)
      const gammalband = prompt(`Skriv in artistens tidigare band: `)
      const info = prompt(`Skriv in info: `)
      musikerLista.addMusikerToList(firstName, lastName, instrument, födelseår, nuverandeband, gammalband, info)
      break;
    case "2":
      const bandname = prompt(`Skriv in bandes namn: `)
      const about = prompt(`Skriv info: `)
      const funded = prompt(`När var den grundad: `)
      const concluded = prompt(`Skriv in slutdaum: `)
      banderLista.addBanderToList(bandname, about, funded, concluded)
      break;
    case "3":
      checkMeny();
      break;
    case "4":
      removeMusiker();
      break;
    case "5":
      musikerLista.skrivUtMusiker();
      break;
    case "A":
      console.log("Programmet avslutas!");
      run = false;
      break;
    default:
      console.log("Du måste välja mellan 1 - 4 eller A!");
  }
}

function removeMusiker() {
  musikerLista.skrivUtMusiker();
  const val = prompt("Vilken artist vill du ta bort från listan välj ett nummer:");

  if (Number(val).toString() === "NaN") {
    console.log("Måste skriva in ett tal!");
  }
  if (val <= musikerLista.getLength() && val >= 1) {
    musikerLista.removeMusikerFromList(Number(val) - 1);
  } else {
    console.log(`Talet måste vara mellan 1 och ${musikerLista.getLength()}`);
  }
}

function checkMeny() {
  let run = true;
  while (run) {
    musikerLista.skrivUtMusikerMedCheckIn();
    console.log("Skriv in R för att återgå till menyn: ");
    const val = prompt("Vilken artist vill du kolla in på: ");

    if (val.trim().toUpperCase() === "R") {
      run = false;
    } else if (Number(val).toString() === "NaN") {
      console.log("Måste skriva in ett tal!");
    }
    if (val <= musikerLista.getLength() && val >= 1) {
      musikerLista.checkInMusiker(Number(val) - 1);
    } else {
      console.log(`Talet måste vara mellan 1 och ${musikerLista.getLength()}`);
    }
  }
}


