//npx -p typescript tsc D:\_FrontendDev\frontend-kurs\modul02\suche\suche.ts

//Array mit 10 Länder
const laender: string[] = [
    "Deutschland",
    "Frankreich",
    "Spanien",
    "Italien",
    "Portugal",
    "Niederlande",
    "Belgien",
    "Österreich",
    "Schweiz",
    "Dänemark"
];

let eingabeFeld: HTMLInputElement | null = document.querySelector("#sucheInput");
let ergebnisseListe: HTMLUListElement | null = document.querySelector("#ergebnisse");
let ergebnisseAnzahl: HTMLParagraphElement | null = document.querySelector("#ergebnisAnzahl");

sucheLaender();


if (eingabeFeld && ergebnisseListe) {
    eingabeFeld.addEventListener("input", function () {
        sucheLaender();
    });
}

function sucheLaender(): void {
    let eingabe: string = eingabeFeld.value.toLowerCase();
        ergebnisseListe.innerHTML = "";
        ergebnisseAnzahl.textContent = "Keine Ergebnisse gefunden.";
    for (const land of laender) {
        if (land.toLowerCase().includes(eingabe)) {
            const li = document.createElement("li");
            li.textContent = land;
            ergebnisseListe.appendChild(li);
            ergebnisseAnzahl.textContent = `${ergebnisseListe.childElementCount} von ${laender.length} Ergebnissen`;
        }
    }
}
