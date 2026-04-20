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
    
    // On vérifie si l'élément existe bien
    if (!menu) {
        console.error("L'élément 'side-menu' n'a pas été trouvé !");
        return;
    }

    // On bascule entre 0 et 350px
    if (menu.style.width === "350px") {
        menu.style.width = "0";
    } else {
        menu.style.width = "350px";
    }
    
    console.log("Largeur du menu après clic :", menu.style.width);
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
