export type Prioritaet = 'niedrig' | 'mittel' | 'hoch';

export interface KontaktFormDaten {
  name: string;
  email: string;
  betreff: string;
  nachricht: string;
  prioritaet: Prioritaet;
}

export interface KontaktFormFehler {
  name?: string;
  email?: string;
  betreff?: string;
  nachricht?: string;
}
