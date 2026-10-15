# Tennis Guide

Das ist meine erste Webseite. Sie heißt **Tennis Guide** und ist für die Einsendeaufgabe ESA1.

## Was zeigt die Webseite?

Auf der Seite gibt es Infos über Tennis. Oben ist ein Menü mit Links zu den Bereichen:

- **Grundlagen:** wie Tennis gespielt und gezählt wird
- **Schläge:** Vorhand, Rückhand, Aufschlag, Lob und Volley
- **Training:** was man beim Training üben kann
- **Trainer buchen:** hier kann man einen Trainer buchen

Zum Buchen wählt man ein Datum und einen Trainer aus und klickt auf **Buchen**. Wenn alles passt, kommt eine grüne Meldung mit einem Häkchen. Wenn etwas fehlt oder das Datum schon vorbei ist, kommt eine rote Meldung mit einem X.

## Dateien

- `index.html`: der Inhalt der Seite
- `style.css`: das Aussehen (Farben, Abstände)
- `app.ts`: der TypeScript-Code für das Buchen
- `app.js`: der Code, der aus `app.ts` gemacht wird und im Browser läuft

## Was ich gemacht habe und warum

**HTML**
- Ich habe `header`, `nav`, `main`, `section`, `article` und `footer` benutzt statt `div`. So sieht man besser, welcher Teil was ist.
- Die Eingabefelder haben ein `label`, damit man weiß, was man eingeben soll.

**TypeScript**
- Ich habe ein **Interface** `Trainer` gemacht. Darin steht, dass jeder Trainer einen Namen, ein Fachgebiet und Jahre Erfahrung hat.
- Ich habe **zwei Funktionen** geschrieben:
  - `formatTrainer` macht aus einem Trainer den Text für die Auswahlliste.
  - `pruefeBuchung` prüft, ob alles richtig ausgefüllt ist, und gibt die passende Meldung zurück.
- Mit der **Array-Methode `find`** suche ich den Trainer, den man ausgewählt hat.
- Die Trainer stehen in einer Liste im Code. Die Auswahlliste auf der Seite wird daraus automatisch gefüllt.

**CSS**
- Das Design ist einfach gehalten.
- Die Meldung ist grün oder rot, damit man sofort sieht, ob es geklappt hat.

