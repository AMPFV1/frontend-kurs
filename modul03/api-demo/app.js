"use strict";
////npx -p typescript tsc --target ES2020 app.ts
// Generischer fetchJSON-Wrapper — einmal schreiben, überall verwenden
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
const liste = document.getElementById('liste');
const fehlerAnzeige = document.getElementById('fehler');
async function ladeUndZeige() {
    // LOADING STATE — Spinner einblenden, alte Inhalte leeren
    ladeAnzeige.style.display = 'flex';
    liste.innerHTML = '';
    fehlerAnzeige.style.display = 'none';
    fehlerAnzeige.textContent = '';
    try {
        const posts = await fetchJSON('https://jsonplaceholder.typicode.com/posts');
        // SUCCESS STATE — Daten als Karten anzeigen
        posts.forEach(post => {
            const karte = document.createElement('article');
            karte.className = 'post-karte';
            karte.innerHTML = `
                <h2>${post.title}</h2>
                <p class="post-info">Post #${post.id} · User ${post.userId}</p>
                <p>${post.body}</p>
            `;
            liste.appendChild(karte);
        });
    }
    catch (fehler) {
        // ERROR STATE — benutzerfreundliche Fehlermeldung anzeigen
        fehlerAnzeige.textContent = fehler instanceof Error
            ? `Die Posts konnten nicht geladen werden. (${fehler.message})`
            : 'Ein unbekannter Fehler ist aufgetreten.';
        fehlerAnzeige.style.display = 'block';
    }
    finally {
        // IMMER — Spinner ausblenden
        ladeAnzeige.style.display = 'none';
    }
}
// Beim Laden der Seite ausführen
document.addEventListener('DOMContentLoaded', ladeUndZeige);
// Neu laden Button
document.getElementById('neu-laden')
    ?.addEventListener('click', ladeUndZeige);
