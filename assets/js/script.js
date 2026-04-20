console.log("Fichier script.js chargé correctement !");

function toggleMenu() {
    const menu = document.getElementById("side-menu");
    if (!menu) return;

    // Déterminer la largeur d'ouverture
    const openWidth = (window.innerWidth < 600) ? "100%" : "350px";

    if (menu.style.width === openWidth) {
        menu.style.width = "0px";
    } else {
        menu.style.width = openWidth;
    }
}

function showPage(pageId) {
    // 1. Cacher toutes les pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => {
        p.classList.remove('active');
    });
    
    // 2. Afficher la page sélectionnée
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active');
    }
    
    // 3. Fermer le menu
    document.getElementById("side-menu").style.width = "0px";
}
