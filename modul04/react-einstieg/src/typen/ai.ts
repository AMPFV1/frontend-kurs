// src/typen/ai.ts

// Rollen in einer Konversation
export type Rolle = 'system' | 'user' | 'assistant';

// Eine einzelne Nachricht
export interface Nachricht {
  role: Rolle;
  content: string;
}

// Request-Body für OpenRouter-kompatible
export interface ChatRequest {
  model: string;
  messages: Nachricht[];
  max_tokens?: number;
  temperature?: number; // 0 = deterministisch, 2 = sehr kreativ
  stream?: boolean;
}

// Response-Body (vereinfacht)
export interface ChatResponse {
  id: string;
  choices: Array<{
    message: {
      role: 'assistant';
      content: string;
    };
    finish_reason: 'stop' | 'length' | 'content_filter';
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Charakter für das Tennis-Orakel (AITest.tsx)
export interface Persona {
  id: string;
  name: string;
  emoji: string;
  beschreibung: string;
  systemPrompt: string;
}
