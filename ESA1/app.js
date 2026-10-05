"use strict";
////npx -p typescript tsc D:\_FrontendDev\frontend-kurs\ESA1\app.ts
const trainerListe = [
    { name: "Max Mustermann", fachgebiet: "Grundlagen", erfahrung: 5 },
    { name: "Erika Musterfrau", fachgebiet: "Schläge", erfahrung: 3 },
    { name: "John Doe", fachgebiet: "Training", erfahrung: 4 },
    { name: "Jane Smith", fachgebiet: "Fitness", erfahrung: 6 }
];
const trainerSelect = document.getElementById("trainer");
trainerListe.forEach(trainer => {
    const option = document.createElement("option");
    option.value = trainer.name;
    option.textContent = `${trainer.name} - ${trainer.fachgebiet} (${trainer.erfahrung} Jahre Erfahrung)`;
    trainerSelect.appendChild(option);
});
const btnBuchen = document.getElementById("btnBuchen");
btnBuchen.addEventListener("click", () => {
    const selectedTrainerName = trainerSelect.value;
    const selectedTrainer = trainerListe.find(trainer => trainer.name === selectedTrainerName);
    if (selectedTrainer) {
        alert(`Trainer ${selectedTrainer.name} wurde erfolgreich gebucht!`);
    }
    else {
        alert("Bitte wählen Sie einen Trainer aus.");
    }
});
