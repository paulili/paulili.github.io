console.log("Portfolio chargé avec succès !");

// Petit message de bienvenue personnalisé selon l'heure
const date = new Date();
const hour = date.getHours();
let greeting = "";

if (hour < 12) {
    greeting = "Bonjour";
} else if (hour < 18) {
    greeting = "Bon après-midi";
} else {
    greeting = "Bonsoir";
}

console.log(`${greeting}, bienvenue sur le portfolio de Paula.`);
