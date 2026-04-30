/* ══════════════════════════════════════════════
   SCRIPT GLOBAL — Portfolio Paula Ciacan
   À inclure sur toutes les pages
══════════════════════════════════════════════ */

/* ── ÉTOILES (canvas, uniquement sur index.html) ── */
function initStars() {
  const canvas = document.getElementById('stars-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function buildStars(n) {
    stars = [];
    for (let i = 0; i < n; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + .2,
        a: Math.random(),
        speed: Math.random() * .004 + .001,
        phase: Math.random() * Math.PI * 2
      });
    }
  }
  buildStars(180);

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const t = Date.now() * .001;
    stars.forEach(s => {
      const alpha = s.a * (.5 + .5 * Math.sin(t * s.speed * 60 + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180,210,255,${alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ── PARTICULES FLOTTANTES ── */
function initParticles() {
  function spawn() {
    const p  = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}vw;
      bottom:-10px;
      background:rgba(74,127,212,${Math.random() * .4 + .1});
      animation-duration:${Math.random() * 12 + 8}s;
      animation-delay:${Math.random() * 4}s;
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 20000);
  }
  setInterval(spawn, 2200);
}

/* ── NAVBAR : marquer le lien actif ── */
function setActiveNav() {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.topnav-links a, .topnav-links button[data-href]').forEach(el => {
    const href = el.getAttribute('href') || el.dataset.href || '';
    if (href && href !== '#' && current.includes(href.replace('.html',''))) {
      el.classList.add('active-link');
    }
  });
}

/* ── NAVIGATION SPA (index.html uniquement) ── */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(id + '-page');
  if (target) target.classList.add('active');

  // Mettre à jour boutons actifs
  document.querySelectorAll('.topnav-links button[data-page]').forEach(b => {
    b.classList.toggle('active-link', b.dataset.page === id);
  });

  // Animer les barres de compétences si besoin
  if (id === 'bio') {
    setTimeout(animateSkillBars, 300);
  }
}

/* ── BARRES DE COMPÉTENCES ── */
function animateSkillBars() {
  document.querySelectorAll('.skill-fill').forEach(el => {
    el.style.width = (el.dataset.w || '0') + '%';
  });
}

/* ── MENU MOBILE (sidebar legacy — peut être retiré si plus utilisé) ── */
function toggleMenu() {
  const menu = document.getElementById('side-menu');
  if (menu) menu.classList.toggle('open');
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  initStars();
  initParticles();
  setActiveNav();

  // Animer les skill bars si elles sont présentes au chargement
  setTimeout(animateSkillBars, 400);
});
