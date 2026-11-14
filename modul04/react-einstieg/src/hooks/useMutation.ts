// src/hooks/useMutation.ts — Hook fuer schreibende Operationen
import { useState } from 'react';
import type { UseMutationErgebnis } from '../typen/hooks';

function useMutation<T, U>(
  url: string,
  methode: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST'
): UseMutationErgebnis<T, U> {
  const [isLaden, setIsLaden] = useState<boolean>(false);
  const [fehler, setFehler] = useState<string | null>(null);
  const [erfolg, setErfolg] = useState<boolean>(false);

  const ausfuehren = async (daten: T): Promise<U | null> => {
    setIsLaden(true);
    setFehler(null);
    setErfolg(false);

    try {
      const antwort = await fetch(url, {
        method: methode,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(daten),
      });

      if (!antwort.ok) {
        throw new Error(`HTTP Fehler: ${antwort.status}`);
      }

      const ergebnis: U = await antwort.json();
      setErfolg(true);
      return ergebnis;
    } catch (err) {
      setFehler(err instanceof Error ? err.message : 'Fehler');
      return null;
    } finally {
      setIsLaden(false);
    }
  };

  return { ausfuehren, isLaden, fehler, erfolg };
}

export default useMutation;
