"use strict";
////npx -p typescript tsc --target ES2020 D:\_FrontendDev\frontend-kurs\ESA1\app.ts
const trainerListe = [
    { name: "Max Mustermann", fachgebiet: "Grundlagen", erfahrung: 5 },
    { name: "Erika Musterfrau", fachgebiet: "Schläge", erfahrung: 3 },
    { name: "John Doe", fachgebiet: "Training", erfahrung: 4 },
    { name: "Jane Smith", fachgebiet: "Fitness", erfahrung: 6 }
];
function formatTrainer(trainer) {
    return `${trainer.name} - ${trainer.fachgebiet} (${trainer.erfahrung} Jahre Erfahrung)`;
}
function pruefeBuchung(trainer, datum) {
    if (!trainer) {
        return "Bitte wählen Sie einen Trainer aus.";
    }
    else if (!datum) {
        return "Bitte wählen Sie ein Datum aus.";
    }
    else if (new Date(`${datum}`).getTime() < Date.now()) {
        return "Bitte wählen Sie ein zukünftiges Datum aus.";
    }
    else {
        return `Trainer ${trainer.name} wurde für ${datum} erfolgreich gebucht!`;
    }
}
const trainerSelect = document.getElementById("trainer");
trainerListe.forEach(trainer => {
    const option = document.createElement("option");
    option.value = trainer.name;
    option.textContent = formatTrainer(trainer);
    trainerSelect.appendChild(option);
});
const btnBuchen = document.getElementById("btnBuchen");
btnBuchen.addEventListener("click", () => {
    const selectedTrainerName = trainerSelect.value;
    const selectedTrainer = trainerListe.find(trainer => trainer.name === selectedTrainerName);
    const buchungsdatum = document.getElementById("date").value;
    const buchungsInfo = document.getElementById("buchungsInfo");
    buchungsInfo.textContent = pruefeBuchung(selectedTrainer, buchungsdatum);
});
