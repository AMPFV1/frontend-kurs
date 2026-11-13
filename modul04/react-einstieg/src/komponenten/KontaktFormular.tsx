import { useState } from 'react';

interface FormDaten {
  name: string;
  email: string;
  betreff: string;
  nachricht: string;
  prioritaet: 'niedrig' | 'mittel' | 'hoch';
}

interface FormFehler {
  name?: string;
  email?: string;
  betreff?: string;
  nachricht?: string;
}

const leeresFormular: FormDaten = {
  name: '',
  email: '',
  betreff: '',
  nachricht: '',
  prioritaet: 'mittel',
};

const MIN_NACHRICHT = 20;

// Prüft ein einzelnes Feld und gibt die Fehlermeldung zurück (oder undefined)
function pruefeFeld(feld: keyof FormFehler, daten: FormDaten): string | undefined {
  switch (feld) {
    case 'name':
      return daten.name.trim().length < 2
        ? 'Name muss mindestens 2 Zeichen haben.'
        : undefined;
    case 'email': {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !emailRegex.test(daten.email)
        ? 'Bitte eine gueltige E-Mail-Adresse eingeben.'
        : undefined;
    }
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
function pruefeAlle(daten: FormDaten): FormFehler {
  const felder: (keyof FormFehler)[] = ['name', 'email', 'betreff', 'nachricht'];
  const neueFehler: FormFehler = {};
  felder.forEach(feld => {
    const meldung = pruefeFeld(feld, daten);
    if (meldung) {
      neueFehler[feld] = meldung;
    }
  });
  return neueFehler;
}

function KontaktFormular(): React.JSX.Element {
  const [daten, setDaten] = useState<FormDaten>(leeresFormular);
  const [fehler, setFehler] = useState<FormFehler>({});
  const [erfolg, setErfolg] = useState<boolean>(false);

  // Allgemeiner Change-Handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;

    setDaten(prev => ({ ...prev, [name]: value }));

    // Fehler beim Tippen zuruecksetzen, Erfolgsmeldung ausblenden
    setFehler(prev => ({ ...prev, [name]: undefined }));
    setErfolg(false);
  };

  // Echtzeit-Validierung: Feld wird geprüft, sobald es verlassen wird
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const feld = e.target.name as keyof FormFehler;
    setFehler(prev => ({ ...prev, [feld]: pruefeFeld(feld, daten) }));
  };

  // Senden-Button nur aktiv, wenn alle Felder gültig sind
  const formularGueltig = Object.keys(pruefeAlle(daten)).length === 0;

  // Submit-Handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const neueFehler = pruefeAlle(daten);
    setFehler(neueFehler);
    if (Object.keys(neueFehler).length > 0) return;

    console.log('Formular abgesendet:', daten);
    setErfolg(true);

    // Formular zurücksetzen
    setDaten(leeresFormular);
    setFehler({});
  };

  // Zeichenzählung für die Nachricht
  const anzahlZeichen = daten.nachricht.trim().length;
  const zeichenInfo = anzahlZeichen < MIN_NACHRICHT
    ? `Noch ${MIN_NACHRICHT - anzahlZeichen} Zeichen fehlen`
    : `${anzahlZeichen} Zeichen eingegeben`;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Kontaktformular</h2>

      {erfolg && <p className='erfolg'>Vielen Dank! Ihre Nachricht wurde gesendet.</p>}

      <div>
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          name='name'
          value={daten.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {fehler.name && <span className='fehler'>{fehler.name}</span>}
      </div>

      <div>
        <label htmlFor='email'>E-Mail</label>
        <input
          id='email'
          name='email'
          type='email'
          value={daten.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {fehler.email && <span className='fehler'>{fehler.email}</span>}
      </div>

      <div>
        <label htmlFor='betreff'>Betreff</label>
        <input
          id='betreff'
          name='betreff'
          value={daten.betreff}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {fehler.betreff && <span className='fehler'>{fehler.betreff}</span>}
      </div>

      <div>
        <label htmlFor='nachricht'>Nachricht</label>
        <textarea
          id='nachricht'
          name='nachricht'
          rows={5}
          value={daten.nachricht}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className='zeichen'>{zeichenInfo}</span>
        {fehler.nachricht && <span className='fehler'>{fehler.nachricht}</span>}
      </div>

      <div>
        <label htmlFor='prioritaet'>Priorität</label>
        <select
          id='prioritaet'
          name='prioritaet'
          value={daten.prioritaet}
          onChange={handleChange}
        >
          <option value='niedrig'>Niedrig</option>
          <option value='mittel'>Mittel</option>
          <option value='hoch'>Hoch</option>
        </select>
      </div>

      <button
        type='submit'
        disabled={!formularGueltig}
      >
        Senden
      </button>
    </form>
  );
}

export default KontaktFormular;
