interface Produkt {
    id: number;
    name: string;
    preis: number;
    kategorie?: string;
}

let produktliste: Produkt[] = [
    { id: 1, name: "Laptop", preis: 999.99, kategorie: "Elektronik" },
    { id: 2, name: "Smartphone", preis: 699.99 },
    { id: 3, name: "Kaffeemaschine", preis: 49.99, kategorie: "Haushalt" },
    { id: 4, name: "Buch", preis: 19.99, kategorie: "Bücher" },
    { id: 5, name: "Kopfhörer", preis: 149.99, kategorie: "Elektronik"}
];

const {name, preis} = produktliste[0];
console.log(name);

let neueProduktliste = [...produktliste,
    {id: 6, name: "Tablet", preis: 299.99, kategorie: "Elektronik"},
    {id: 7, name: "Monitor", preis: 199.99, kategorie: "Elektronik"}];
console.log(neueProduktliste);

function gibGünstigeProdukte(produkte: Produkt[], maxPreis: number): Produkt[] {
    return produkte.filter(produkt => produkt.preis <= maxPreis);
}
console.log(gibGünstigeProdukte(produktliste, 100));


function zeigeAlleKategorien(produkte: Produkt[]): string[] {
    return produkte.map(produkt => produkt.kategorie ?? "Keine Kategorie");
}

console.log(zeigeAlleKategorien(produktliste));