const namen: string[] = ["Christian", "Barbara", "Matthias", "Klaus", "Jürgen"];

for (const name of namen) {
    console.log(name);
}

const zahlen: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const gerade = zahlen.filter((zahl) => zahl % 2 === 0);
console.log("Gerade Zahlen:", gerade);

const summe = zahlen.reduce((acc, zahl) => acc + zahl, 0);
console.log("Summe der Zahlen:", summe);

