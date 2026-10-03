function berechneFläche(breite: number, höhe: number): number {
    return breite * höhe;
}

const berechneFlächeFunction = function (breite: number, höhe: number): number {
    return breite * höhe;
}

const berechneFlächeArrow = (breite: number, höhe: number): number => {
    return breite * höhe;
}


function erstelleMultiplikator(faktor: number): (wert: number) => number {
    return function (wert: number): number {
        return wert * faktor;
    }
}
console.log(erstelleMultiplikator(2));
const verdoppler = erstelleMultiplikator(2);
console.log(verdoppler(5)); // Ausgabe: 10


//Scope demonstrieren
let globalVariable = "Ich bin global";

function zeigeScope() {
    let lokaleVariable = "Ich bin lokal";
    console.log(globalVariable);
    console.log(lokaleVariable);
}

console.log(globalVariable); // Ausgabe: Ich bin global
zeigeScope(); // Ausgabe: Ich bin global, Ich bin lokal
//console.log(lokaleVariable); // Fehler: lokaleVariable ist nicht definiert   


// Funktion mit optionalem Parameter und Default-Wert
function begruessung(name: string, begruessung?: string, frage:string="Wie geht es dir?"): string {
    if (begruessung === undefined) {
        begruessung = "Hallo";
    }
    return `${begruessung}, ${name}! ${frage}`;
}
console.log(begruessung("Max")); // Ausgabe: Hallo, Max! Wie geht es dir?