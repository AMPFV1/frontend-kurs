interface Kurs {
    id: number,
    titel: string,
    dozentin: string,
    ects: number,
    online: boolean,
    bewertung?: number
}

interface Studierender {
     matrikelnummer: string,
     name: string,
     kurse: Kurs[]
}

const grundlagenTypescript: Kurs = {
    id: 1,
    titel: "TypeScript Grundlagen",
    dozentin: "Frau Müller",
    ects: 5,
    online: true
};
const grundlagenJavaScript: Kurs = {
    id: 2,
    titel: "JavaScript Grundlagen",
    dozentin: "Herr Schmidt",
    ects: 5,
    online: false
};
const fortgeschritteneWebentwicklung: Kurs = {
    id: 3,
    titel: "Fortgeschrittene Webentwicklung",
    dozentin: "Frau Meier",
    ects: 10,
    online: true
};

const studierender1: Studierender = {
    matrikelnummer: "123456",
    name: "Max Mustermann",
    kurse: [grundlagenTypescript, fortgeschritteneWebentwicklung]
};
const studierender2: Studierender = {
    matrikelnummer: "789012",
    name: "Anna Beispiel",
    kurse: [grundlagenJavaScript]
};

// Funktion gebeKurse(studierender: Studierender): string, die alle Kurstitel als kommagetrennten String zurueckgibt
function gebeKurse(studierender: Studierender): string {
    return studierender.kurse.map(kurs => kurs.titel).join(", ");
}
console.log(gebeKurse(studierender1)); 
console.log(gebeKurse(studierender2));

//Funktion berechneEcts(studierender: Studierender): number, die die Gesamtzahl der ECTS berechnet
function berechneEcts(studierender: Studierender): number {
    return studierender.kurse.reduce((total, kurs) => total + kurs.ects, 0);
}
console.log(berechneEcts(studierender1)); 
console.log(berechneEcts(studierender2));

//Studierenden bei einem Kurs bewerten
studierender1.kurse[0].bewertung = 5; // Max bewertet TypeScript Grundlagen mit 5


//funktion, die die Bewertung der Kurse von einem Studierenden zurückgibt, falls vorhanden, sonst "Keine Bewertung"
//wichtig ist optional chaining und nullish coalescing operator
function gebeBewertungen(studierender: Studierender): string {
    return studierender.kurse.map(kurs => `${kurs.titel}: ${kurs.bewertung ?? "Keine Bewertung"}`).join(", ");  
}
console.log(gebeBewertungen(studierender1)); 
console.log(gebeBewertungen(studierender2));