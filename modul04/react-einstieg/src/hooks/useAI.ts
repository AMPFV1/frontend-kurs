// src/hooks/useAI.ts
import { useState, useCallback } from 'react';
import type { Nachricht } from '../typen/ai';
import type { UseAIErgebnis, UseAIOptionen } from '../typen/hooks';
import { chatStream } from '../utils/aiStream';

function useAI(optionen: UseAIOptionen = {}): UseAIErgebnis {
  const { systemPrompt, maxNachrichten = 20 } = optionen;

  const [nachrichten, setNachrichten] = useState<Nachricht[]>([]);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [fehler, setFehler] = useState<string | null>(null);

  const sendeNachricht = useCallback(async (
    inhalt: string
  ): Promise<void> => {
    if (!inhalt.trim() || isStreaming) return;

    // Benutzernachricht zum Verlauf hinzufuegen
    const benutzerNachricht: Nachricht = {
      role: 'user',
      content: inhalt,
    };

    // Nur die letzten maxNachrichten an die API schicken (Kontext begrenzen).
    // Abweichung vom Skript: Dort wird die Benutzernachricht zweimal angehängt
    // und der sichtbare Verlauf mitgekürzt — hier bleibt der Verlauf vollständig.
    const kontext = [...nachrichten, benutzerNachricht].slice(-maxNachrichten);

    // Leere Assistenten-Nachricht vorbereiten — sie wird Token für Token gefüllt
    const assistentNachricht: Nachricht = {
      role: 'assistant',
      content: '',
    };

    setNachrichten(prev => [...prev, benutzerNachricht, assistentNachricht]);
    setFehler(null);
    setIsStreaming(true);

    // Nachrichten mit System-Prompt zusammenstellen
    const alleNachrichten: Nachricht[] = systemPrompt
      ? [{ role: 'system', content: systemPrompt }, ...kontext]
      : kontext;

    await chatStream(
      alleNachrichten,
      // onChunk: Token zur letzten Nachricht hinzufuegen
      (token) => {
        setNachrichten(prev => {
          const aktuell = [...prev];
          const letzte = aktuell[aktuell.length - 1];
          aktuell[aktuell.length - 1] = {
            ...letzte,
            content: letzte.content + token,
          };
          return aktuell;
        });
      },
      () => setIsStreaming(false),
      (err) => {
        setFehler(err.message);
        setIsStreaming(false);
        // Leere Assistenten-Nachricht wieder entfernen, wenn nichts angekommen ist
        setNachrichten(prev => {
          const letzte = prev[prev.length - 1];
          return letzte?.role === 'assistant' && letzte.content === ''
            ? prev.slice(0, -1)
            : prev;
        });
      }
    );
  }, [nachrichten, isStreaming, systemPrompt, maxNachrichten]);

  const zuruecksetzen = useCallback((): void => {
    setNachrichten([]);
    setFehler(null);
    setIsStreaming(false);
  }, []);

  return { nachrichten, isStreaming, fehler, sendeNachricht, zuruecksetzen };
}

export default useAI;
