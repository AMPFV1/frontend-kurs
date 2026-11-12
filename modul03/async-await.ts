
// Wartet die angegebene Zeit und löst dann ohne Wert auf
function verzoegerung(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

// Nacheinander: jede Wartezeit beginnt erst, wenn die vorherige fertig ist
async function ablauf(): Promise<void> {
    console.time("ablauf (nacheinander)");

    await verzoegerung(1000);
    console.log("Schritt 1 fertig");

    await verzoegerung(1000);
    console.log("Schritt 2 fertig");

    await verzoegerung(1000);
    console.log("Schritt 3 fertig");

    console.timeEnd("ablauf (nacheinander)"); // ca. 3000ms
}

// Parallel: alle drei Wartezeiten starten gleichzeitig
async function ablaufParallel(): Promise<void> {
    console.time("ablauf (parallel)");

    await Promise.all([
        verzoegerung(1000).then(() => console.log("Schritt 1 fertig")),
        verzoegerung(1000).then(() => console.log("Schritt 2 fertig")),
        verzoegerung(1000).then(() => console.log("Schritt 3 fertig"))
    ]);

    console.timeEnd("ablauf (parallel)"); // ca. 1000ms
}

// Parst einen JSON-String; bei ungültigem JSON wird ein beschreibender Fehler geworfen
async function parseJSON<T>(text: string): Promise<T> {
    try {
        return JSON.parse(text) as T;
    } catch (error) {
        const grund = error instanceof Error ? error.message : String(error);
        throw new Error(`Ungültiges JSON: "${text}" konnte nicht geparst werden (${grund})`);
    }
}



interface Person {
    name: string;
    alter: number;
}

async function testen(): Promise<void> {
    // Nacheinander ausführen, damit sich die Zeitmessungen nicht überschneiden
    await ablauf();
    await ablaufParallel();

    const person = await parseJSON<Person>('{"name": "Anna", "alter": 30}');
    console.log(`Gültiges JSON: ${person.name} ist ${person.alter} Jahre alt`);

    try {
        await parseJSON<Person>('{name: Anna}');
    } catch (error) {
        console.error("Fehler abgefangen:", error instanceof Error ? error.message : error);
    }
}

testen();
