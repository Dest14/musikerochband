import PromptSync from "prompt-sync";
const prompt = PromptSync({ sigint: true })
import Musiker from "./musicians.js";
import Band from "./bands.js";

const musiker = new Musiker();
const band = new Band();
console.log
  (`Meny:
  1. Lägg till en ny artist: 
  2. Skriv ut info om en artist: 
  3. Skapa ett nytt band
  4. Lägg till artist i ett band
  5. Skriv ut info om ett band
  6. Ta bort artist från band
  7. Ta bort en artist 
  `);

const alternativ = prompt();
switch (alternativ) {
  case "1":
    let musikerNamn = prompt("Vad heter musikern?: ");
    let birthDate = prompt("Ange födelsedatumet på formatet ÅÅÅÅ-MM-DD: ");
    let dateofbirth = new Date(birthDate);
    let now = new Date();
    let currentYear = now.getFullYear();
    let age = currentYear - dateofbirth.getFullYear();
    if (
      now.getMonth() < dateofbirth.getMonth() ||
      (now.getMonth() === dateofbirth.getMonth() && now.getDate() < dateofbirth.getDate())
    ) {
      age--;
    }

    if (age < 0 || dateofbirth.getFullYear() > 2023) {
      console.log("Ogiltigt födelsedatum.");
    } else {
      let info = prompt("Information om musiker: ");
      console.log(`Artistens ålder är ${age} år.`);
      musiker.skapaMusiker(musikerNamn, age, info);
    }
    break;
  case "2":
    if (musiker.musikerLista.length <= 0) {
      console.log("Musiker finns inte!")
    }
    else {
      musiker.visaAllaMusiker();
      let val = prompt("Skriv siffran på personen du vill se: ")

      if (val < 0 || val > musiker.musikerLista.length || isNaN(val)) {
        console.log("Valet finns inte")
      } else {
        musiker.visaEnMusiker(val);
      }
    }
    break;
  case "3":
    if (musiker.musikerLista.length <= 0) {
      console.log("Finns ingen musiker, skapa en musiker: ")
    } else {
      musiker.visaAllaMusiker();
      let val = prompt("Välj bandmedlem: ");
      if (val < 0 || val > musiker.musikerLista.length || isNaN(val)) {
        console.log("Valet finns inte!");
      } else {
        let instrument = prompt("Vad för instrument spelar musikern?: ");
        let bandNamn = prompt("Vad heter bandet?: ");
        let bandAge = prompt("När skapades bandet?: ");
        musiker.skapaEttBand(val, instrument, bandNamn, bandAge);
      }
    }
    break;
  case '4':
    if (musiker.musikerLista.length === 0) {
      console.log("Det finns inga musiker!")
    } else if (band.bandLista.length === 0) {
      console.log("Det finns inga band!")
    } else {
      musiker.visaAllaMusiker();
      const val = prompt("Vilken musiker du vill ha: ");
      if (val < 0 || val > musiker.musikerLista.length || isNaN(val)) {
        console.log("Valet finns inte!");
      } else {
        const instrument = prompt("Vad för instrument spelar musikern: ");
        const temp = band.displayOngoingBand();
        if (temp.length === 0) {
          console.log("Finns inga tillgängliga band")
        } else {
          const val2 = prompt("Vilket band vill du ha?: ")
          if (val2 < 0 || val2 > temp.length || isNaN(val2)) {
            console.log("Valet finns inte!");
          } else {
            if (!band.bandLista[temp[val2].index].currentBand.some(x => x.memberID === musiker.musikerLista[val].musikerID)) {
              musiker.addMTB(val, instrument, temp[val2].bandID, temp[val2].bandNamn)
            } else {
              console.log("Musikern finns redan i bandet")
            }
          }
        }
      }
    }
    break;

  case '5':
    const bandVal = band.displayOngoingBand();
    if (bandVal.length === 0) {
      console.log("Det finns inga aktiva band just nu.");
      break;
    }
    const bandIndex = prompt("Välj band genom att ange siffran: ");
    if (bandIndex < 0 || bandIndex >= bandVal.length || isNaN(bandIndex)) {
      console.log("Ogiltigt val!");
      break;
    }
    musiker.visaDetaljeradInfo(bandVal[bandIndex].index);
    break;

  case '6':
    if (musiker.musikerLista.length === 0) {
      console.log("Det finns inga musiker!")
    } else if (band.bandLista.length === 0) {
      console.log("Det finns inga band!")
    } else {
      const tempBand = band.displayOngoingBand();
      if (tempBand.length === 0) {
        console.log("Det finns inga tillgängliga band")
      } else {
        const val1 = prompt("Bandet du vill ha: ")
        if (val1 < 0 || val1 > tempBand.length || isNaN(val1)) {
          console.log("Valet finns inte!");
        } else {
          const tempMusiker = band.displayCurrentMember(tempBand[val1].index)
          const val2 = prompt("Vilken musiker vill ta bort:  ")
          if (val2 < 0 || val2 > tempMusiker.length || isNaN(val2)) {
            console.log("Valet finns inte!");
          } else {
            musiker.removeOneMusician(tempBand[val1].bandID, tempBand[val1].index, tempMusiker[val2]);
          }
        }
      }
    }
    break;
  case "7":
    if (musiker.musikerLista.length === 0) {
      console.log("Det finns inga artister att ta bort!");
    } else {
      musiker.visaAllaMusiker();
      let val = prompt("Välj numret för artisten du vill ta bort: ");
      if (val < 0 || val >= musiker.musikerLista.length || isNaN(val)) {
        console.log("Ogiltigt val!");
      } else {
        musiker.removeMusiker(val);
        console.log("Artist borttagen!");
      }
    }
    break;
  default:
    console.log("Valet finns ej");
}

