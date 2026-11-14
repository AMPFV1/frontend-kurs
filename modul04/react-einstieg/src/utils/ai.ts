// src/utils/ai.ts — einfacher API-Call zu OpenRouter (ohne Streaming)
import type { Nachricht, ChatRequest, ChatResponse } from '../typen/ai';

const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined;
// Kostenloses Modell auf OpenRouter
//const STANDARD_MODELL = 'google/gemma-4-31b-it:free';
const STANDARD_MODELL = 'nvidia/nemotron-3.5-super-vl:free'; // Alternative

export async function chatKompletierung(
  nachrichten: Nachricht[],
  modell: string = STANDARD_MODELL
): Promise<string> {
  // Ohne Schlüssel gar nicht erst anfragen — verständliche Meldung statt 401
  if (!API_KEY) {
    throw new Error('VITE_OPENROUTER_API_KEY ist nicht gesetzt! Bitte in der .env eintragen.');
  }

  const requestBody: ChatRequest = {
    model: modell,
    messages: nachrichten,
    max_tokens: 1000,
    temperature: 0.7,
  };

  const antwort = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!antwort.ok) {
    const fehlerText = await antwort.text();
    throw new Error(`API Fehler ${antwort.status}: ${fehlerText}`);
  }

  const daten: ChatResponse = await antwort.json();

  // Bei leerer Antwort (z. B. Modell überlastet) klare Meldung statt Absturz
  const inhalt = daten.choices?.[0]?.message?.content;
  if (!inhalt) {
    throw new Error('Das Modell hat keine Antwort geliefert.');
  }
  return inhalt;
}
