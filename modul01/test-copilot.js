// Funktion, die prüft ob eine Zahl eine Primzahl ist
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Testfälle für die Funktion isPrime
console.log(isPrime(2)); // true
console.log(isPrime(7)); // true
console.log(isPrime(15)); // false

 // Funktion, die immer true zurückgibt
function alwaysTrue() {
    return true;
}
console.log(alwaysTrue()); // true