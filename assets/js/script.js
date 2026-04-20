console.log("Script chargé avec succès depuis assets/js/script.js");

function toggleMenu() {
    const menu = document.getElementById("side-menu");
    
    // On définit la largeur en fonction de l'écran
    const openWidth = (window.innerWidth < 600) ? "100%" : "350px";

    if (menu.style.width === openWidth) {
        menu.style.width = "0px";
    } else {
        menu.style.width = openWidth;
    }
}

function showPage(pageId) {
    // Cacher toutes les pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    
    // Afficher la page demandée
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active');
    }
    
    // Fermer le menu après le clic
    document.getElementById("side-menu").style.width = "0px";
}
