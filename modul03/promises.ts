
function warteAuf(ms: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Aufruf 1: Fertig nach ${ms}ms`);
        }, ms);
    }   
);
}


warteAuf(2000)
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.error('Fehler:', error);
    });

function zufaelligerErfolg(): Promise<number> {
    return new Promise((resolve, reject) => {
        const zufallszahl = Math.random();
        if (zufallszahl < 0.5) {
            resolve(Math.floor(Math.random() * 100));
        } else {
            reject(new Error('Zufälliger Fehler'));
        }
    });
}


for (let i = 0; i < 5; i++) {
    zufaelligerErfolg()
        .then((zahl) => {
            console.log(`Erfolg: ${zahl}`);
        })
        .catch((error) => {
            console.error('Fehler:', error);
        });
}


const promise1 = warteAuf(300);
const promise2 = warteAuf(600);
const promise3 = warteAuf(900);

Promise.all([promise1, promise2, promise3])
    .then((messages) => {
        console.log('Alle Promises abgeschlossen:');
        messages.forEach((message) => console.log(message));
    })
    .catch((error) => {
        console.error('Fehler:', error);
    }); 

