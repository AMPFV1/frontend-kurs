// src/utils/aiStream.ts — Streaming-Antwort von OpenRouter (Server-Sent Events)
import type { Nachricht } from '../typen/ai';
import { API_KEY, API_URL, STANDARD_MODELL } from './ai';

export async function chatStream(
  nachrichten: Nachricht[],
  onChunk: (text: string) => void,     // Callback für jeden Token
  onFertig: () => void,                // Callback wenn fertig
  onFehler: (fehler: Error) => void,   // Callback bei Fehler
  // Ergänzung zum Beispiel: gibt den Reader heraus, damit die Komponente
  // das Streaming mit reader.cancel() abbrechen kann
  onReader?: (reader: ReadableStreamDefaultReader<Uint8Array>) => void
): Promise<void> {
  try {
    if (!API_KEY) {
      throw new Error('VITE_OPENROUTER_API_KEY ist nicht gesetzt! Bitte in der .env eintragen.');
    }

    const antwort = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: STANDARD_MODELL,
        messages: nachrichten,
        stream: true,   // Streaming aktivieren!
      }),
    });

    if (!antwort.ok) {
      throw new Error(`API Fehler: ${antwort.status}`);
    }

    // Stream lesen
    const reader = antwort.body?.getReader();
    if (!reader) throw new Error('Kein Stream verfuegbar');
    onReader?.(reader);

    const decoder = new TextDecoder();
    // Ein Chunk kann mitten in einer Zeile enden — der Rest wird hier aufgehoben
    let puffer = '';

    while (true) {
      const { done, value } = await reader.read();

      // done ist auch true, wenn reader.cancel() aufgerufen wurde
      if (done) {
        onFertig();
        break;
      }

      // Chunk dekodieren und an den Rest vom letzten Chunk anhängen
      puffer += decoder.decode(value, { stream: true });
      const zeilen = puffer.split('\n');
      puffer = zeilen.pop() ?? '';   // letzte (evtl. unvollständige) Zeile aufheben

      for (const zeile of zeilen) {
        // Jede Datenzeile beginnt mit 'data: ' (OpenRouter schickt auch Kommentarzeilen)
        if (!zeile.startsWith('data: ')) continue;

        const daten = zeile.slice(6).trim();   // 'data: ' entfernen

        // [DONE] signalisiert das Ende
        if (daten === '[DONE]') {
          onFertig();
          return;
        }

        try {
          const parsed = JSON.parse(daten);
          const inhalt = parsed.choices?.[0]?.delta?.content;
          if (inhalt) {
            onChunk(inhalt);   // Token weitergeben!
          }
        } catch {
          // Unvollständige JSON-Pakete ignorieren
        }
      }
    }
  } catch (fehler) {
    onFehler(fehler instanceof Error ? fehler : new Error('Unbekannter Fehler'));
  }
}
