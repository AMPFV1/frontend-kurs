// Props-Interfaces aller Komponenten
import type { Benutzer } from './benutzer';
import type { Produkt } from './produkt';
import type { Aufgabe, AufgabenFilter, Todo } from './todo';
import type { Nachricht } from './ai';

export interface AbzeichenProps {
  status: 'aktiv' | 'inaktiv' | 'gesperrt';
}

export interface AvatarProps {
  name: string;
  bildUrl: string;
}

export interface BenutzerInfoProps {
  name: string;
  email: string;
  berufsbezeichnung?: string;
}

export interface BenutzerKarteProps {
  benutzer: Benutzer;
}

export interface KarteProps {
  titel: string;
  children: React.ReactNode;
}

export interface PreisAnzeigeProps {
  preis: number;
}

export interface ProduktListeProps {
  produkte: Produkt[];
}

export interface AufgabeEintragProps {
  aufgabe: Aufgabe;
  onUmschalten: (id: number) => void;
  onLoeschen: (id: number) => void;
}

export interface AufgabenFilterLeisteProps {
  filter: AufgabenFilter;
  onFilterAendern: (filter: AufgabenFilter) => void;
}

export interface TodoEintragProps {
  todo: Todo;
  isLoeschen: boolean;
  onUmschalten: (id: number) => void;
  onLoeschen: (id: number) => void;
}

export interface TodoFormularProps {
  isLaden: boolean;
  // Gibt true zurück, wenn das Todo erstellt wurde (dann wird das Feld geleert)
  onErstellen: (titel: string) => Promise<boolean>;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export interface NachrichtBlaeschenProps {
  nachricht: Nachricht;
}
