// src/hooks/useFetch.ts — wiederverwendbarer Fetch-Hook
import { useState, useEffect } from 'react';
import type { UseFetchErgebnis } from '../typen/hooks';

// url = null: es wird (noch) nichts geladen, z. B. solange keine Auswahl getroffen ist
function useFetch<T>(url: string | null): UseFetchErgebnis<T> {
  const [daten, setDaten] = useState<T | null>(null);
  const [isLaden, setIsLaden] = useState<boolean>(url !== null);
  const [fehler, setFehler] = useState<string | null>(null);
  const [zaehler, setZaehler] = useState<number>(0);

  useEffect(() => {
    if (url === null) {
      return;
    }

    let abgebrochen = false;  // Verhindert State-Update nach Unmount

    const laden = async (): Promise<void> => {
      setIsLaden(true);
      setFehler(null);

      try {
        const antwort = await fetch(url);
        if (!antwort.ok) {
          throw new Error(`HTTP Fehler: ${antwort.status}`);
        }
        const ergebnis: T = await antwort.json();

        if (!abgebrochen) {
          setDaten(ergebnis);
        }
      } catch (err) {
        if (!abgebrochen) {
          setFehler(err instanceof Error ? err.message : 'Fehler');
        }
      } finally {
        if (!abgebrochen) {
          setIsLaden(false);
        }
      }
    };

    laden();

    return () => {
      abgebrochen = true;  // Cleanup bei Unmount
    };
  }, [url, zaehler]);

  const neuLaden = (): void => setZaehler(z => z + 1);

  return { daten, isLaden, fehler, neuLaden, setDaten };
}

export default useFetch;
