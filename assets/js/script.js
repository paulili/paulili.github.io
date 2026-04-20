/* --- LOGICIEL DE BIENVENUE --- */
console.log("Portfolio chargé avec succès !");

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

/* --- GESTION DU MENU LATÉRAL --- */
function toggleMenu() {
    const menu = document.getElementById("side-menu");
    
    // Si le menu est fermé (largeur 0 ou vide), on l'ouvre
    if (menu.style.width === "350px") {
        menu.style.width = "0";
    } else {
        // On adapte la largeur si on est sur mobile
        if (window.innerWidth < 600) {
            menu.style.width = "100%";
        } else {
            menu.style.width = "350px";
        }
    }
}

/* --- NAVIGATION INTERNE (Pour index.html) --- */
function showPage(pageId) {
    // Cache toutes les sections
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Affiche la section cible
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active');
    }
    
    // Ferme le menu après le clic
    const menu = document.getElementById("side-menu");
    if (menu) menu.style.width = "0";
}
