// Lokale Produktliste — wird von Produkte.tsx und ProduktDetail.tsx verwendet
import type { ProduktDetails } from '../typen/produkt';

export const produkte: ProduktDetails[] = [
  {
    id: 1,
    name: 'Tennisschläger Pro',
    preis: 149.99,
    kategorie: 'Schläger',
    beschreibung: 'Leichter Schläger aus Graphit für kontrollierte und kraftvolle Schläge.',
  },
  {
    id: 2,
    name: 'Tennisbälle (4er-Dose)',
    preis: 7.99,
    kategorie: 'Bälle',
    beschreibung: 'Druckbälle für Sand- und Hartplatz, ideal für Training und Match.',
  },
  {
    id: 3,
    name: 'Tennisschuhe Allcourt',
    preis: 89.9,
    kategorie: 'Schuhe',
    beschreibung: 'Stabile Schuhe mit gutem Halt für schnelle Richtungswechsel.',
  },
  {
    id: 4,
    name: 'Schlägertasche',
    preis: 59.0,
    kategorie: 'Zubehör',
    beschreibung: 'Tasche für bis zu drei Schläger mit separatem Schuhfach.',
  },
  {
    id: 5,
    name: 'Griffband (3 Stück)',
    preis: 9.5,
    kategorie: 'Zubehör',
    beschreibung: 'Rutschfestes Overgrip-Band, nimmt Schweiß gut auf.',
  },
  {
    id: 6,
    name: 'Ballmaschine',
    preis: 499.0,
    kategorie: 'Training',
    beschreibung: 'Spielt Bälle mit einstellbarer Geschwindigkeit und Richtung zu.',
  },
];
