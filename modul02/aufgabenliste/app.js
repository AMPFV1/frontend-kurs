"use strict";
// Aufgabenliste: hinzufügen (Button oder Enter), als erledigt markieren (Klick auf Aufgabe),
// löschen (Klick auf Lösch-Button). Die Liste wird bei jeder Änderung aus dem Array neu gerendert.
let aufgaben = [];
let naechsteId = 1;
const aufgabeInput = document.getElementById("aufgabeInput");
const hinzufuegenButton = document.getElementById("hinzufuegenButton");
const aufgabenListe = document.getElementById("aufgabenListe");
function render() {
    aufgabenListe.innerHTML = "";
    for (const aufgabe of aufgaben) {
        const li = document.createElement("li");
        li.dataset.id = String(aufgabe.id);
        if (aufgabe.erledigt) {
            li.classList.add("erledigt");
        }
        const text = document.createElement("span");
        text.className = "aufgabe-text";
        text.textContent = aufgabe.text; // textContent statt innerHTML: kein HTML aus Benutzereingaben
        const loeschButton = document.createElement("button");
        loeschButton.className = "loeschen";
        loeschButton.textContent = "Löschen";
        li.append(text, loeschButton);
        aufgabenListe.appendChild(li);
    }
}
function aufgabeHinzufuegen() {
    const text = aufgabeInput.value.trim();
    if (!text)
        return;
    aufgaben.push({ id: naechsteId++, text, erledigt: false });
    aufgabeInput.value = "";
    aufgabeInput.focus();
    render();
}
function erledigtUmschalten(id) {
    aufgaben = aufgaben.map((a) => (a.id === id ? { ...a, erledigt: !a.erledigt } : a));
    render();
}
function aufgabeLoeschen(id) {
    aufgaben = aufgaben.filter((a) => a.id !== id);
    render();
}
hinzufuegenButton.addEventListener("click", aufgabeHinzufuegen);
aufgabeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        aufgabeHinzufuegen();
    }
});
// Event Delegation: ein einziger Listener auf der ul für alle Aufgaben
aufgabenListe.addEventListener("click", (event) => {
    const ziel = event.target;
    const li = ziel.closest("li");
    if (!li || !li.dataset.id)
        return;
    const id = Number(li.dataset.id);
    if (ziel.closest(".loeschen")) {
        aufgabeLoeschen(id);
    }
    else {
        erledigtUmschalten(id);
    }
});
render();
