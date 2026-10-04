// Aufgabenliste: hinzufügen (Button oder Enter), als erledigt markieren (Klick auf Aufgabe),
// löschen (Klick auf Lösch-Button). Die Liste wird bei jeder Änderung aus dem Array neu gerendert.

//npx -p typescript tsc D:\_FrontendDev\frontend-kurs\modul02\aufgabenliste\app.ts
interface Aufgabe {
    id: number;
    text: string;
    erledigt: boolean;
}

let aufgaben: Aufgabe[] = [];
let naechsteId = 1;

const aufgabeInput = document.getElementById("aufgabeInput") as HTMLInputElement;
const hinzufuegenButton = document.getElementById("hinzufuegenButton") as HTMLButtonElement;
const aufgabenListe = document.getElementById("aufgabenListe") as HTMLUListElement;

function render(): void {
    aufgabenListe.innerHTML = "";

    for (const aufgabe of aufgaben) {
        const li = document.createElement("li");
        li.dataset.id = String(aufgabe.id);
        if (aufgabe.erledigt) {
            li.classList.add("erledigt");
        }

        const text = document.createElement("span");
        text.className = "aufgabe-text";
        text.textContent = aufgabe.text;

        const loeschButton = document.createElement("button");
        loeschButton.className = "loeschen";
        loeschButton.textContent = "Löschen";

        li.append(text, loeschButton);
        aufgabenListe.appendChild(li);
    }
}

function aufgabeHinzufuegen(): void {
    const text = aufgabeInput.value.trim();
    if (!text) return;

    aufgaben.push({ id: naechsteId++, text, erledigt: false });
    aufgabeInput.value = "";
    aufgabeInput.focus();
    render();
}

function erledigtUmschalten(id: number): void {
    aufgaben = aufgaben.map((a) => (a.id === id ? { ...a, erledigt: !a.erledigt } : a));
    render();
}

function aufgabeLoeschen(id: number): void {
    aufgaben = aufgaben.filter((a) => a.id !== id);
    render();
}

hinzufuegenButton.addEventListener("click", aufgabeHinzufuegen);

aufgabeInput.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        aufgabeHinzufuegen();
    }
});

// Event Delegation: ein einziger Listener auf der ul für alle Aufgaben
aufgabenListe.addEventListener("click", (event: MouseEvent) => {
    const ziel = event.target as HTMLElement;
    const li = ziel.closest("li");
    if (!li || !li.dataset.id) return;

    const id = Number(li.dataset.id);

    if (ziel.closest(".loeschen")) {
        aufgabeLoeschen(id);
    } else {
        erledigtUmschalten(id);
    }
});

render();
