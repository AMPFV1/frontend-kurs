// Grunddaten eines Produkts (z. B. für ProduktListe)
export interface Produkt {
  id: number;
  name: string;
  preis: number;
}

// Vollständiges Produkt für Produktseite und Detailansicht
export interface ProduktDetails extends Produkt {
  kategorie: string;
  beschreibung: string;
}
