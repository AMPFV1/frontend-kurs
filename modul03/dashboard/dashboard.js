"use strict";
////npx -p typescript tsc --target ES2020 dashboard.ts
const API_BASIS = 'https://jsonplaceholder.typicode.com';
// Generischer fetchJSON-Wrapper
async function fetchJSON(url, optionen) {
    const antwort = await fetch(url, optionen);
    // fetch() wirft bei 404 oder 500 keinen Fehler, deshalb antwort.ok prüfen
    if (!antwort.ok) {
        throw new Error(`HTTP Fehler ${antwort.status}: ${antwort.statusText}`);
    }
    return antwort.json();
}
// Elemente aus dem DOM holen
const ladeAnzeige = document.getElementById('loading');
const anzahlBenutzer = document.getElementById('anzahl-benutzer');
const anzahlPosts = document.getElementById('anzahl-posts');
const anzahlTodos = document.getElementById('anzahl-todos');
const postListe = document.getElementById('neueste-posts');
const fehlerListe = document.getElementById('fehler');
// Fehlermeldung für eine einzelne Datenquelle anzeigen
function zeigeFehler(quelle, grund) {
    const li = document.createElement('li');
    li.textContent = grund instanceof Error
        ? `${quelle} konnten nicht geladen werden (${grund.message}).`
        : `${quelle} konnten nicht geladen werden.`;
    fehlerListe.appendChild(li);
    fehlerListe.style.display = 'block';
}
// Autor-Name zu einer userId suchen
function autorName(benutzer, userId) {
    const autor = benutzer.find(b => b.id === userId);
    return autor ? autor.name : 'Unbekannter Autor';
}
async function ladeDashboard() {
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
            fetchJSON(`${API_BASIS}/users`),
            fetchJSON(`${API_BASIS}/posts`),
            fetchJSON(`${API_BASIS}/todos`),
        ]);
        // Benutzer
        let benutzer = [];
        if (benutzerErgebnis.status === 'fulfilled') {
            benutzer = benutzerErgebnis.value;
            anzahlBenutzer.textContent = String(benutzer.length);
        }
        else {
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
        }
        else {
            anzahlPosts.textContent = '–';
            zeigeFehler('Posts', postsErgebnis.reason);
        }
        // Todos — nur die erledigten zählen
        if (todosErgebnis.status === 'fulfilled') {
            const erledigt = todosErgebnis.value.filter(todo => todo.completed);
            anzahlTodos.textContent = String(erledigt.length);
        }
        else {
            anzahlTodos.textContent = '–';
            zeigeFehler('Todos', todosErgebnis.reason);
        }
    }
    finally {
        // IMMER — Ladeanzeige ausblenden
        ladeAnzeige.style.display = 'none';
    }
}
// Beim Laden der Seite ausführen
document.addEventListener('DOMContentLoaded', ladeDashboard);
