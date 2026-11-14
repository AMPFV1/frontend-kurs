import type { KontaktFormDaten, KontaktFormFehler } from '../typen/formular';

export const MIN_NACHRICHT = 20;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Prüft ein einzelnes Feld des Kontaktformulars und gibt die Fehlermeldung zurück (oder undefined)
export function pruefeFeld(
  feld: keyof KontaktFormFehler,
  daten: KontaktFormDaten
): string | undefined {
  switch (feld) {
    case 'name':
      return daten.name.trim().length < 2
        ? 'Name muss mindestens 2 Zeichen haben.'
        : undefined;
    case 'email':
      return !EMAIL_REGEX.test(daten.email)
        ? 'Bitte eine gueltige E-Mail-Adresse eingeben.'
        : undefined;
    case 'betreff':
      return daten.betreff.trim().length < 5
        ? 'Betreff muss mindestens 5 Zeichen haben.'
        : undefined;
    case 'nachricht':
      return daten.nachricht.trim().length < MIN_NACHRICHT
        ? `Nachricht muss mindestens ${MIN_NACHRICHT} Zeichen haben.`
        : undefined;
  }
}

// Prüft alle Felder auf einmal
export function pruefeAlle(daten: KontaktFormDaten): KontaktFormFehler {
  const felder: (keyof KontaktFormFehler)[] = ['name', 'email', 'betreff', 'nachricht'];
  const neueFehler: KontaktFormFehler = {};
  felder.forEach(feld => {
    const meldung = pruefeFeld(feld, daten);
    if (meldung) {
      neueFehler[feld] = meldung;
    }
  });
  return neueFehler;
}
