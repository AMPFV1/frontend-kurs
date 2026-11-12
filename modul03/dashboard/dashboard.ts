
////npx -p typescript tsc --target ES2020 dashboard.ts

const API_BASIS = 'https://jsonplaceholder.typicode.com';

// Datenstrukturen der drei Endpunkte
interface Benutzer {
    id: number;
    name: string;
    username: string;
    email: string;
}

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
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
const ladeAnzeige =
    document.getElementById('loading') as HTMLParagraphElement;
const anzahlBenutzer =
    document.getElementById('anzahl-benutzer') as HTMLElement;
const anzahlPosts =
    document.getElementById('anzahl-posts') as HTMLElement;
const anzahlTodos =
    document.getElementById('anzahl-todos') as HTMLElement;
const postListe =
    document.getElementById('neueste-posts') as HTMLUListElement;
const fehlerListe =
    document.getElementById('fehler') as HTMLUListElement;

// Fehlermeldung für eine einzelne Datenquelle anzeigen
function zeigeFehler(quelle: string, grund: unknown): void {
    const li = document.createElement('li');
    li.textContent = grund instanceof Error
        ? `${quelle} konnten nicht geladen werden (${grund.message}).`
        : `${quelle} konnten nicht geladen werden.`;
    fehlerListe.appendChild(li);
    fehlerListe.style.display = 'block';
}

// Autor-Name zu einer userId suchen
function autorName(benutzer: Benutzer[], userId: number): string {
    const autor = benutzer.find(b => b.id === userId);
    return autor ? autor.name : 'Unbekannter Autor';
}

async function ladeDashboard(): Promise<void> {
    // LOADING STATE
    ladeAnzeige.style.display = 'block';
    fehlerListe.innerHTML = '';
    fehlerListe.style.display = 'none';
    postListe.innerHTML = '';

    try {
        // Alle drei Requests laufen PARALLEL.
        // Promise.allSettled() statt Promise.all(): wenn eine Quelle fehlschlägt,
        // werden die anderen trotzdem angezeigt.
        const [benutzerErgebnis, postsErgebnis, todosErgebnis] = await Promise.allSettled([
            fetchJSON<Benutzer[]>(`${API_BASIS}/users`),
            fetchJSON<Post[]>(`${API_BASIS}/posts`),
            fetchJSON<Todo[]>(`${API_BASIS}/todos`),
        ]);

        // Benutzer
        let benutzer: Benutzer[] = [];
        if (benutzerErgebnis.status === 'fulfilled') {
            benutzer = benutzerErgebnis.value;
            anzahlBenutzer.textContent = String(benutzer.length);
        } else {
            anzahlBenutzer.textContent = '–';
            zeigeFehler('Benutzer', benutzerErgebnis.reason);
        }

        // Posts
        if (postsErgebnis.status === 'fulfilled') {
            const posts = postsErgebnis.value;
            anzahlPosts.textContent = String(posts.length);

            // Die fünf neuesten Posts (höchste id zuerst)
            const neueste = [...posts]
                .sort((a, b) => b.id - a.id)
                .slice(0, 5);

            neueste.forEach(post => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${post.title}</strong>
                    <span class="autor">von ${autorName(benutzer, post.userId)}</span>
                `;
                postListe.appendChild(li);
            });
        } else {
            anzahlPosts.textContent = '–';
            zeigeFehler('Posts', postsErgebnis.reason);
        }

        // Todos — nur die erledigten zählen
        if (todosErgebnis.status === 'fulfilled') {
            const erledigt = todosErgebnis.value.filter(todo => todo.completed);
            anzahlTodos.textContent = String(erledigt.length);
        } else {
            anzahlTodos.textContent = '–';
            zeigeFehler('Todos', todosErgebnis.reason);
        }

    } finally {
        // IMMER — Ladeanzeige ausblenden
        ladeAnzeige.style.display = 'none';
    }
}

// Beim Laden der Seite ausführen
document.addEventListener('DOMContentLoaded', ladeDashboard);
