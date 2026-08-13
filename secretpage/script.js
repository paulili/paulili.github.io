/* ==================================================================
   script.js — LE MOTEUR

   Ne modifie pas ce fichier : tout se règle dans config.js.

   Outils de test (à taper dans la barre d'adresse) :
     ?reset      remet la progression à zéro
     ?unlockall  débloque tout, pour vérifier le rendu
   ================================================================== */

(function () {
  'use strict';

  /* ============================ Utilitaires ============================ */

  var $ = function (sel) { return document.querySelector(sel); };

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* ====================== Comparaison des saisies ======================
     Applique les tolérances définies dans GAME.matching.            */

  function normalize(value) {
    var m = GAME.matching || {};
    var out = String(value == null ? '' : value).trim();

    if (m.ignoreCase !== false) out = out.toLowerCase();

    if (m.ignoreAccents !== false) {
      out = out.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    if (m.ignorePunctuation) {
      out = out.replace(/[.,;:!?'’"«»\-–—_/\\()]/g, '');
    }
    if (m.ignoreSpaces !== false) {
      out = out.replace(/\s+/g, '');
    } else {
      out = out.replace(/\s+/g, ' ');
    }
    return out;
  }

  function matches(input, expected) {
    if (expected == null) return true;
    return normalize(input) === normalize(expected);
  }


  /* ========================== Progression ==========================
     Sauvegardée dans localStorage. Structure :
       { intro: true, days: { "1": { open: true, fragment: true } } } */

  var STORE = 'archives.progress.v1';

  var progress = { intro: false, days: {} };

  function load() {
    try {
      var raw = localStorage.getItem(STORE);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          progress.intro = !!parsed.intro;
          progress.days = parsed.days && typeof parsed.days === 'object' ? parsed.days : {};
        }
      }
    } catch (e) {
      /* navigation privée ou stockage refusé : la partie reste jouable,
         simplement sans mémoire entre deux visites. */
    }
  }

  function save() {
    try { localStorage.setItem(STORE, JSON.stringify(progress)); } catch (e) {}
  }

  function dayState(id) {
    if (!progress.days[id]) progress.days[id] = { open: false, fragment: false };
    return progress.days[id];
  }

  function isDayOpen(day) {
    if (!day.entryPassword) return true;          // jour sans verrou
    return dayState(day.id).open === true;
  }

  function isFragmentOpen(day) {
    return dayState(day.id).fragment === true;
  }

  function fragmentCount() {
    return GAME.days.filter(isFragmentOpen).length;
  }

  function allFragmentsOpen() {
    return GAME.days.length > 0 && fragmentCount() === GAME.days.length;
  }

  /* Le mot de passe révélé à la fin d'un fragment est celui du jour
     suivant. Un seul endroit à renseigner dans config.js. */
  function nextKeyFor(day) {
    if (day.nextDayPassword) return day.nextDayPassword;   // surcharge possible
    var i = GAME.days.indexOf(day);
    var next = GAME.days[i + 1];
    return next ? next.entryPassword : null;
  }

  function findDay(folderName) {
    for (var i = 0; i < GAME.days.length; i++) {
      if (GAME.days[i].folderName === folderName) return GAME.days[i];
    }
    return null;
  }


  /* ======================= Rendu des blocs =======================
     Types acceptés : text, letter, quote, code, image, gallery,
     video, audio, divider, signature.                            */

  function renderBlock(block) {
    if (!block || !block.type) return null;

    switch (block.type) {

      case 'text':
        return el('p', 'b-text', block.value);

      case 'letter':
        return el('div', 'b-letter', block.value);

      case 'quote':
        return el('blockquote', 'b-quote', block.value);

      case 'code':
        return el('p', 'b-code', block.value);

      case 'image': {
        var fig = el('figure', 'b-figure');
        var img = el('img');
        img.src = block.source;
        img.alt = block.alt || '';
        img.loading = 'lazy';
        fig.appendChild(img);
        if (block.caption) fig.appendChild(el('figcaption', 'b-caption', block.caption));
        return fig;
      }

      case 'gallery': {
        var wrap = el('div', 'b-gallery');
        (block.sources || []).forEach(function (src) {
          var g = el('img');
          g.src = src;
          g.alt = '';
          g.loading = 'lazy';
          wrap.appendChild(g);
        });
        return wrap;
      }

      case 'video': {
        var vfig = el('figure', 'b-figure');
        var video = el('video');
        video.src = block.source;
        video.controls = true;
        video.playsInline = true;             // indispensable sur iPhone
        video.setAttribute('playsinline', '');
        video.preload = 'metadata';
        if (block.poster) video.poster = block.poster;
        vfig.appendChild(video);
        if (block.caption) vfig.appendChild(el('figcaption', 'b-caption', block.caption));
        return vfig;
      }

      case 'audio': {
        var abox = el('div', 'b-audio');
        abox.appendChild(el('span', 'b-audio__label', block.label || 'Écoute'));
        var audio = el('audio');
        audio.src = block.source;
        audio.controls = true;
        audio.preload = 'metadata';
        abox.appendChild(audio);
        return abox;
      }

      case 'divider':
        return el('hr', 'b-divider');

      case 'signature':
        return el('p', 'b-signature', block.value);

      default:
        return el('p', 'b-text', block.value || '');
    }
  }

  function renderBlocks(blocks) {
    var wrap = el('div', 'blocks');
    (blocks || []).forEach(function (b) {
      var node = renderBlock(b);
      if (node) wrap.appendChild(node);
    });
    return wrap;
  }


  /* =========================== Icônes =========================== */

  function svg(paths, size) {
    var ns = 'http://www.w3.org/2000/svg';
    var s = document.createElementNS(ns, 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('fill', 'none');
    s.setAttribute('stroke', 'currentColor');
    s.setAttribute('stroke-width', '1.3');
    s.setAttribute('stroke-linecap', 'round');
    s.setAttribute('stroke-linejoin', 'round');
    s.setAttribute('aria-hidden', 'true');
    if (size) { s.setAttribute('width', size); s.setAttribute('height', size); }
    paths.forEach(function (d) {
      var p = document.createElementNS(ns, 'path');
      p.setAttribute('d', d);
      s.appendChild(p);
    });
    return s;
  }

  var ICON = {
    folder: ['M3 7.5A1.5 1.5 0 0 1 4.5 6h4l2 2.5h7A1.5 1.5 0 0 1 19 10v7.5A1.5 1.5 0 0 1 17.5 19h-13A1.5 1.5 0 0 1 3 17.5z'],
    locked: ['M7 10.5V8a5 5 0 0 1 10 0v2.5', 'M5.5 10.5h13v9h-13z', 'M12 14v2.5'],
    open:   ['M7 10.5V8a5 5 0 0 1 9.6-1.9', 'M5.5 10.5h13v9h-13z', 'M12 14v2.5'],
    star:   ['M12 3.6l2.1 5.1 5.5.4-4.2 3.6 1.3 5.4L12 15.2l-4.7 2.9 1.3-5.4-4.2-3.6 5.5-.4z']
  };


  /* ====================== Écrans ====================== */

  var view = $('#view');

  function mount(node) {
    view.innerHTML = '';
    view.appendChild(node);
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    updateProgressLine();
  }

  function transition(fn) {
    if (reducedMotion) { fn(); return; }
    var veil = $('#veil');
    veil.classList.add('is-on');
    setTimeout(function () {
      fn();
      veil.classList.remove('is-on');
    }, 280);
  }

  function burst() {
    if (reducedMotion) return;
    var b = el('div', 'burst');
    document.body.appendChild(b);
    setTimeout(function () { b.remove(); }, 1100);
  }


  /* ---------------- Fil d'Ariane ---------------- */

  function setPath(parts) {
    var list = $('#path');
    list.innerHTML = '';

    var full = [{ label: GAME.rootName || 'archives', route: '#/' }].concat(parts || []);

    full.forEach(function (part, i) {
      var li = el('li');
      var last = i === full.length - 1;
      if (last) {
        li.appendChild(el('span', 'path__here', part.label));
      } else {
        var b = el('button', 'path__link', part.label);
        b.type = 'button';
        b.addEventListener('click', function () { go(part.route); });
        li.appendChild(b);
      }
      list.appendChild(li);
    });
  }

  function updateProgressLine() {
    var total = GAME.days.length;
    var done = fragmentCount();
    $('#progress').textContent = done + ' / ' + total +
      (total > 1 ? ' fragments réunis' : ' fragment réuni');
  }


  /* ---------------- Introduction ---------------- */

  function screenIntro() {
    setPath([{ label: 'introduction' }]);

    var s = el('section', 'screen');
    s.appendChild(el('p', 'screen__eyebrow', 'Introduction'));
    s.appendChild(el('h1', 'screen__title', GAME.intro.title || 'Avant de commencer'));
    s.appendChild(renderBlocks(GAME.intro.blocks));

    var btn = el('button', 'btn btn--block', GAME.intro.startLabel || 'Commencer');
    btn.type = 'button';
    btn.addEventListener('click', function () {
      progress.intro = true;
      save();
      go('#/');
    });
    s.appendChild(btn);

    mount(s);
  }


  /* ---------------- Liste des archives ---------------- */

  function screenArchives() {
    setPath([]);

    var s = el('section', 'screen');
    s.appendChild(el('p', 'screen__eyebrow', GAME.subtitle || ''));
    s.appendChild(el('h1', 'screen__title', GAME.title || 'Archives'));

    var lede = el('p', 'screen__lede',
      'Une archive par nuit. Chacune garde son fragment.');
    s.appendChild(lede);

    var list = el('ul', 'archives');

    GAME.days.forEach(function (day) {
      var open = isDayOpen(day);
      var done = isFragmentOpen(day);

      var li = el('li');
      if (open) li.classList.add('is-open');
      if (done) li.classList.add('is-done');

      var btn = el('button', 'entry');
      btn.type = 'button';
      if (open) btn.classList.add('is-unlocked');

      var top = el('div', 'entry__top');
      var glyph = svg(open ? ICON.folder : ICON.locked);
      glyph.setAttribute('class', 'entry__glyph');
      top.appendChild(glyph);
      top.appendChild(el('span', 'entry__name', day.folderName));
      btn.appendChild(top);

      btn.appendChild(el('span', 'entry__date', day.date));

      var note = done ? 'Fragment réuni'
               : open ? 'Une énigme t\'attend'
               : 'Verrouillé';
      btn.appendChild(el('span', 'entry__note', note));

      btn.setAttribute('aria-label', day.folderName + ', ' + day.date + '. ' + note);
      btn.addEventListener('click', function () { go('#/' + day.folderName); });

      li.appendChild(btn);
      list.appendChild(li);
    });

    /* La page finale n'apparaît qu'une fois tous les fragments réunis. */
    if (allFragmentsOpen() && GAME.finale) {
      var fli = el('li', 'is-done');
      var fbtn = el('button', 'entry entry--finale is-unlocked');
      fbtn.type = 'button';

      var ftop = el('div', 'entry__top');
      var fglyph = svg(ICON.star);
      fglyph.setAttribute('class', 'entry__glyph');
      ftop.appendChild(fglyph);
      ftop.appendChild(el('span', 'entry__name', GAME.finale.folderName || 'FINAL'));
      fbtn.appendChild(ftop);
      fbtn.appendChild(el('span', 'entry__note', GAME.finale.teaser || 'Tout est réuni.'));
      fbtn.addEventListener('click', function () { go('#/final'); });

      fli.appendChild(fbtn);
      list.appendChild(fli);
    }

    s.appendChild(list);
    mount(s);
  }


  /* ---------------- Écran de verrou ----------------
     kind vaut 'day' (ouvrir le dossier) ou 'fragment'. */

  function screenLock(opts) {
    var s = el('section', 'screen');
    var lock = el('div', 'lock');

    var glyph = svg(ICON.locked);
    glyph.setAttribute('class', 'lock__glyph');
    glyph.setAttribute('width', '54');
    glyph.setAttribute('height', '54');
    lock.appendChild(glyph);

    lock.appendChild(el('p', 'screen__eyebrow', opts.eyebrow || 'Verrouillé'));
    lock.appendChild(el('h1', 'lock__title', opts.title));
    if (opts.hint) lock.appendChild(el('p', 'lock__hint', opts.hint));

    var field = el('div', 'field');
    field.appendChild(el('span', 'field__caret', '✦'));

    var label = el('label', null, 'Mot de passe');
    label.setAttribute('for', 'lock-input');
    label.hidden = true;
    field.appendChild(label);

    var input = el('input', 'field__input');
    input.id = 'lock-input';
    input.type = 'text';
    input.placeholder = 'mot de passe';
    input.autocomplete = 'off';
    input.setAttribute('autocapitalize', 'off');
    input.setAttribute('autocorrect', 'off');
    input.setAttribute('spellcheck', 'false');
    input.setAttribute('enterkeyhint', 'go');
    field.appendChild(input);

    lock.appendChild(field);

    var error = el('p', 'lock__error', 'Ce n\'est pas la bonne clé.');
    error.setAttribute('role', 'alert');
    lock.appendChild(error);

    var btn = el('button', 'btn btn--block', opts.action || 'Déverrouiller');
    btn.type = 'button';
    lock.appendChild(btn);

    function attempt() {
      if (!input.value.trim()) return;

      if (matches(input.value, opts.password)) {
        burst();
        opts.onSuccess();
        return;
      }
      error.classList.add('is-on');
      lock.classList.remove('lock--wrong');
      void lock.offsetWidth;                 // relance l'animation
      lock.classList.add('lock--wrong');
      input.value = '';
      input.focus();
    }

    input.addEventListener('input', function () { error.classList.remove('is-on'); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); attempt(); }
    });
    btn.addEventListener('click', attempt);

    s.appendChild(lock);

    if (opts.back) {
      var back = el('button', 'btn btn--quiet', '← Retour');
      back.type = 'button';
      back.style.marginTop = '28px';
      back.addEventListener('click', function () { go(opts.back); });
      var wrap = el('div');
      wrap.style.textAlign = 'center';
      wrap.appendChild(back);
      s.appendChild(wrap);
    }

    mount(s);
  }


  /* ---------------- Dossier d'un jour ---------------- */

  function screenDay(day) {
    setPath([{ label: day.folderName }]);

    /* Verrou d'entrée du jour */
    if (!isDayOpen(day)) {
      screenLock({
        eyebrow: day.date,
        title: day.folderName,
        hint: 'La clé se trouvait dans le fragment de la nuit précédente.',
        password: day.entryPassword,
        action: 'Ouvrir l\'archive',
        back: '#/',
        onSuccess: function () {
          dayState(day.id).open = true;
          save();
          transition(function () { screenDay(day); });
        }
      });
      return;
    }

    var solved = isFragmentOpen(day);
    var p = day.puzzle || {};
    var s = el('section', 'screen');

    s.appendChild(el('p', 'screen__eyebrow', day.date));
    s.appendChild(el('h1', 'screen__title', p.title || 'Une énigme t\'attend'));
    if (day.subtitle) s.appendChild(el('p', 'screen__sub', day.subtitle));
    if (p.intro) s.appendChild(el('p', 'screen__lede', p.intro));

    s.appendChild(renderBlocks(p.blocks));

    /* Indices, révélés un par un — inutiles si l'énigme est résolue */
    if (!solved && p.hints && p.hints.length) {
      var hbox = el('div', 'hints');
      var hlist = el('ul', 'hints__list');
      hbox.appendChild(hlist);

      var shown = 0;
      var hbtn = el('button', 'btn btn--quiet', 'Révéler un indice');
      hbtn.type = 'button';
      hbtn.addEventListener('click', function () {
        if (shown >= p.hints.length) return;
        var item = el('li', 'hints__item');
        item.appendChild(el('strong', null, 'Indice ' + (shown + 1)));
        item.appendChild(document.createTextNode(p.hints[shown]));
        hlist.appendChild(item);
        shown++;
        if (shown >= p.hints.length) hbtn.remove();
      });
      hbox.appendChild(hbtn);
      s.appendChild(hbox);
    }

    /* Accès au fragment */
    var sep = el('hr', 'b-divider');
    s.appendChild(sep);

    var lockBtn = el('button', 'btn btn--block');
    lockBtn.type = 'button';
    lockBtn.appendChild(svg(solved ? ICON.open : ICON.locked, 15));
    lockBtn.appendChild(el('span', null,
      (solved ? 'Revoir ' : 'Ouvrir ') + day.fragment.name));
    lockBtn.addEventListener('click', function () {
      go('#/' + day.folderName + '/' + day.fragment.name);
    });
    s.appendChild(lockBtn);

    if (!solved && p.promptLabel) {
      var note = el('p', 'key__aside', p.promptLabel);
      note.style.textAlign = 'center';
      s.appendChild(note);
    }

    var back = el('button', 'btn btn--quiet', '← Toutes les archives');
    back.type = 'button';
    back.style.marginTop = '34px';
    back.addEventListener('click', function () { go('#/'); });
    s.appendChild(back);

    mount(s);
  }


  /* ---------------- Fragment ---------------- */

  function screenFragment(day) {
    setPath([
      { label: day.folderName, route: '#/' + day.folderName },
      { label: day.fragment.name }
    ]);

    /* Le dossier du jour doit être ouvert avant son fragment */
    if (!isDayOpen(day)) { go('#/' + day.folderName); return; }

    /* Verrou du fragment : la réponse à l'énigme */
    if (!isFragmentOpen(day)) {
      screenLock({
        eyebrow: day.fragment.name,
        title: 'La réponse',
        hint: (day.puzzle && day.puzzle.promptLabel) || 'Ce que l\'énigme t\'a donné.',
        password: day.fragment.password,
        action: 'Ouvrir le fragment',
        back: '#/' + day.folderName,
        onSuccess: function () {
          dayState(day.id).fragment = true;
          save();
          transition(function () { screenFragment(day); });
        }
      });
      return;
    }

    var f = day.fragment;
    var s = el('section', 'screen fragment');

    s.appendChild(el('p', 'fragment__seal', '✦ Déverrouillé ✦'));
    s.appendChild(el('h1', 'fragment__title', f.label || f.name));

    var body = el('div', 'fragment__body');
    body.appendChild(renderBlocks(f.blocks));
    s.appendChild(body);

    /* Clé du jour suivant, ou renvoi vers la page finale */
    var key = nextKeyFor(day);
    var next = el('div', 'fragment__next');

    if (key) {
      next.appendChild(el('p', 'fragment__next-label', 'Clé de la nuit suivante'));

      var chip = el('button', 'key', key);
      chip.type = 'button';
      chip.setAttribute('aria-label', 'Révéler la clé de la nuit suivante');
      var aside = el('p', 'key__aside', 'Touche pour révéler.');

      chip.addEventListener('click', function () {
        chip.classList.add('is-shown');
        chip.setAttribute('aria-label', 'Clé : ' + key);
        aside.textContent = 'Note-la bien : elle ouvre l\'archive de demain.';
      });

      next.appendChild(chip);
      next.appendChild(aside);

    } else if (allFragmentsOpen() && GAME.finale) {
      next.appendChild(el('p', 'fragment__next-label', 'C\'était le dernier'));
      var fin = el('button', 'btn btn--block', GAME.finale.teaser || 'Lire le message');
      fin.type = 'button';
      fin.addEventListener('click', function () { go('#/final'); });
      next.appendChild(fin);

    } else {
      next.appendChild(el('p', 'fragment__next-label', 'La suite viendra'));
    }

    s.appendChild(next);

    var back = el('button', 'btn btn--quiet', '← Toutes les archives');
    back.type = 'button';
    back.style.marginTop = '34px';
    back.addEventListener('click', function () { go('#/'); });
    s.appendChild(back);

    mount(s);
  }


  /* ---------------- Page finale ---------------- */

  function screenFinale() {
    if (!allFragmentsOpen() || !GAME.finale) { go('#/'); return; }

    setPath([{ label: GAME.finale.folderName || 'final' }]);

    var s = el('section', 'screen fragment');
    s.appendChild(el('p', 'fragment__seal', '✦ ' + (GAME.finale.label || 'Le message') + ' ✦'));
    s.appendChild(el('h1', 'fragment__title', GAME.finale.title || ''));

    var body = el('div', 'fragment__body');
    body.appendChild(renderBlocks(GAME.finale.blocks));
    s.appendChild(body);

    var back = el('button', 'btn btn--quiet', '← Toutes les archives');
    back.type = 'button';
    back.style.marginTop = '40px';
    back.addEventListener('click', function () { go('#/'); });
    s.appendChild(back);

    mount(s);
  }


  /* ========================== Routage ==========================
     Les URL reprennent la forme de vrais chemins :
       #/                       la liste
       #/introduction           l'accueil du jeu
       #/2008                   un jour
       #/2008/FRAGMENT1         son fragment
       #/final                  la page finale                     */

  function go(route) {
    if (window.location.hash === route) { render(); return; }
    transition(function () { window.location.hash = route; });
  }

  function render() {
    var hash = window.location.hash.replace(/^#\/?/, '');
    var parts = hash.split('/').filter(Boolean).map(decodeURIComponent);

    if (!progress.intro && parts[0] !== 'introduction') {
      screenIntro();
      return;
    }
    if (parts.length === 0)                { screenArchives(); return; }
    if (parts[0] === 'introduction')       { screenIntro();    return; }
    if (parts[0] === 'final')              { screenFinale();   return; }

    var day = findDay(parts[0]);
    if (!day) { screenArchives(); return; }

    if (parts[1] && parts[1].toUpperCase() === day.fragment.name.toUpperCase()) {
      screenFragment(day);
    } else {
      screenDay(day);
    }
  }


  /* ====================== Ciel étoilé ======================
     Canvas léger : étoiles fixes qui scintillent, dérive très lente. */

  function startSky() {
    var canvas = $('#sky');
    var ctx = canvas.getContext('2d');
    var stars = [];
    var w = 0, h = 0, dpr = 1;

    function build() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      /* Densité modérée : lisible sur mobile sans épuiser la batterie. */
      var count = Math.min(190, Math.round((w * h) / 7200));
      stars = [];
      for (var i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.15 + 0.28,
          base: Math.random() * 0.5 + 0.28,
          speed: Math.random() * 0.0016 + 0.0004,
          phase: Math.random() * Math.PI * 2,
          drift: Math.random() * 0.014 + 0.003,
          warm: Math.random() > 0.82
        });
      }
    }

    function frame(time) {
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var twinkle = s.base + Math.sin(time * s.speed + s.phase) * 0.24;
        if (twinkle < 0.05) twinkle = 0.05;

        s.y -= s.drift;
        if (s.y < -2) { s.y = h + 2; s.x = Math.random() * w; }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.warm
          ? 'rgba(240, 214, 168, ' + twinkle + ')'
          : 'rgba(226, 234, 255, ' + twinkle + ')';
        ctx.fill();

        /* Halo discret sur les plus grosses seulement */
        if (s.r > 1.05) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3.4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(200, 214, 255, ' + (twinkle * 0.08) + ')';
          ctx.fill();
        }
      }
      requestAnimationFrame(frame);
    }

    function still() {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(function (s) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(226, 234, 255, ' + s.base + ')';
        ctx.fill();
      });
    }

    build();

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        build();
        if (reducedMotion) still();
      }, 180);
    });

    if (reducedMotion) still();
    else requestAnimationFrame(frame);
  }


  /* ========================== Démarrage ========================== */

  function boot() {
    var params = new URLSearchParams(window.location.search);

    if (params.has('reset')) {
      try { localStorage.removeItem(STORE); } catch (e) {}
    }

    load();

    if (params.has('unlockall')) {
      progress.intro = true;
      GAME.days.forEach(function (d) {
        progress.days[d.id] = { open: true, fragment: true };
      });
      save();
    }

    startSky();
    window.addEventListener('hashchange', render);
    render();
  }

  /* Aide de test depuis la console du navigateur */
  window.resetProgress = function () {
    try { localStorage.removeItem(STORE); } catch (e) {}
    progress = { intro: false, days: {} };
    window.location.hash = '#/';
    render();
    return 'Progression remise à zéro.';
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
