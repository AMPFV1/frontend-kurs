
////npx -p typescript tsc --target ES2020 suche.ts

// Datenstruktur eines Benutzers von jsonplaceholder.typicode.com/users
interface Benutzer {
    id: number;
    name: string;
    username: string;
    email: string;
}

// Generischer fetchJSON-Wrapper
async function fetchJSON<T>(
    url: string,
    optionen?: RequestInit
): Promise<T> {
    const antwort = await fetch(url, optionen);

    // fetch() wirft bei 404 oder 500 keinen Fehler, deshalb antwort.ok prüfen
    if (!antwort.ok) {
        throw new Error(
            `HTTP Fehler ${antwort.status}: ${antwort.statusText}`
        );
    }

    return antwort.json() as Promise<T>;
}

// Elemente aus dem DOM holen
const suchfeld =
    document.getElementById('suchfeld') as HTMLInputElement;
const ladeAnzeige =
    document.getElementById('loading') as HTMLParagraphElement;
const liste =
    document.getElementById('liste') as HTMLUListElement;
const hinweis =
    document.getElementById('hinweis') as HTMLParagraphElement;
const fehlerAnzeige =
    document.getElementById('fehler') as HTMLParagraphElement;

async function sucheBenutzer(suchbegriff: string): Promise<void> {
    // LOADING STATE — Ladeanzeige einblenden, alte Inhalte leeren
    ladeAnzeige.style.display = 'block';
    liste.innerHTML = '';
    hinweis.textContent = '';
    fehlerAnzeige.style.display = 'none';
    fehlerAnzeige.textContent = '';

    try {
        const benutzer = await fetchJSON<Benutzer[]>(
            `https://jsonplaceholder.typicode.com/users?username=${encodeURIComponent(suchbegriff)}`
        );

        // SUCCESS STATE — Ergebnisse oder Hinweis anzeigen
        if (benutzer.length === 0) {
            hinweis.textContent = 'Keine Ergebnisse gefunden';
        }

        benutzer.forEach(b => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${b.name}</strong>
                <span class="email">${b.email}</span>
            `;
            liste.appendChild(li);
        });

    } catch (fehler) {
        // ERROR STATE — Fehlermeldung anzeigen
        fehlerAnzeige.textContent = fehler instanceof Error
            ? `Die Suche ist fehlgeschlagen. (${fehler.message})`
            : 'Ein unbekannter Fehler ist aufgetreten.';
        fehlerAnzeige.style.display = 'block';

    } finally {
        // IMMER — Ladeanzeige ausblenden
        ladeAnzeige.style.display = 'none';
    }
}

// Debouncing: erst 500ms nach der letzten Eingabe wird gesucht
let timer: ReturnType<typeof setTimeout> | undefined;

suchfeld.addEventListener('input', () => {
    // Laufenden Timer abbrechen — der Benutzer tippt noch
    clearTimeout(timer);

    const suchbegriff = suchfeld.value.trim();

    // Leeres Suchfeld: keine Anfrage, Ergebnisse leeren
    if (suchbegriff === '') {
        liste.innerHTML = '';
        hinweis.textContent = '';
        fehlerAnzeige.style.display = 'none';
        return;
    }

    timer = setTimeout(() => {
        sucheBenutzer(suchbegriff);
    }, 500);
});
