// Rückgabewerte der Custom Hooks

export interface UseFetchErgebnis<T> {
  daten: T | null;
  isLaden: boolean;
  fehler: string | null;
  neuLaden: () => void;
  // Ergänzung zum Beispiel aus 8.1: erlaubt der Komponente, die geladenen Daten
  // lokal zu ändern (z. B. nach DELETE oder POST)
  setDaten: React.Dispatch<React.SetStateAction<T | null>>;
}

export interface UseMutationErgebnis<T, U> {
  ausfuehren: (daten: T) => Promise<U | null>;
  isLaden: boolean;
  fehler: string | null;
  erfolg: boolean;
}
