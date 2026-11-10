(function () {
  var root = document.documentElement;
  // O site roda sempre com todas as animações, mesmo com "reduzir movimento" ativado no aparelho
  // (decisão do cliente).
  var reduceMotion = false;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var hasIO = 'IntersectionObserver' in window;

  // ---------- Aviso rápido (copiar) ----------
  var toast = document.getElementById('toast');
  var toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 1900);
  }
  document.querySelectorAll('[data-copy]').forEach(function (button) {
    button.addEventListener('click', function () {
      var text = button.getAttribute('data-copy');
      var done = button.getAttribute('data-copied') || 'Copiado';
      if (!navigator.clipboard) { showToast('Copie manualmente: ' + text); return; }
      navigator.clipboard.writeText(text).then(
        function () { showToast(done); },
        function () { showToast('Copie manualmente: ' + text); }
      );
    });
  });

  // ---------- Topo: fundo sólido depois da abertura, barra de leitura e menu do celular ----------
  var nav = document.querySelector('.nav');
  var hero = document.getElementById('inicio');
  var progress = document.querySelector('.progress');
  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');

  function setMenu(open) {
    menu.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    updateNav();
  }
  menuBtn.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  menu.addEventListener('click', function (event) { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); menuBtn.focus(); }
  });

  function updateNav() {
    var heroEnd = hero.offsetTop + hero.offsetHeight - nav.offsetHeight - 10;
    nav.classList.toggle('is-solid', window.scrollY > heroEnd || menu.classList.contains('open'));
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ')';
  }

  // ---------- Menu: destaca a seção que está na tela ----------
  var links = Array.prototype.slice.call(menu.querySelectorAll('a'));
  var sections = links.map(function (link) { return document.querySelector(link.getAttribute('href')); });
  var clicked = -1;
  function setActive(index) {
    links.forEach(function (link, i) { link.classList.toggle('is-active', i === index); });
  }
  links.forEach(function (link, i) {
    link.addEventListener('click', function () { clicked = i; setActive(i); });
  });
  ['wheel', 'touchstart', 'keydown'].forEach(function (type) {
    window.addEventListener(type, function () { clicked = -1; }, { passive: true });
  });
  function updateActive() {
    if (clicked !== -1) { setActive(clicked); return; }
    var line = nav.offsetHeight + window.innerHeight * 0.3;
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    var current = -1;
    if (atBottom) {
      current = sections.length - 1;
    } else {
      sections.forEach(function (section, i) {
        if (section && section.getBoundingClientRect().top <= line) current = i;
      });
    }
    setActive(current);
  }

  // ---------- Abertura: textura, movimento com o mouse e com a rolagem ----------
  var grain = document.querySelector('.hero-grain');
  if (grain) {
    try {
      var canvas = document.createElement('canvas');
      canvas.width = canvas.height = 180;
      var ctx = canvas.getContext('2d');
      var img = ctx.createImageData(180, 180);
      for (var i = 0; i < img.data.length; i += 4) {
        var v = Math.random() * 255;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      grain.style.backgroundImage = 'url(' + canvas.toDataURL('image/png') + ')';
    } catch (e) { /* sem textura, sem problema */ }
  }

  {
    // Quebra os títulos em palavras para elas aparecerem uma a uma
    // (com "reduzir movimento" elas só esmaecem, sem subir)
    document.querySelectorAll('.split').forEach(function (title) {
      var words = title.textContent.trim().split(/\s+/);
      title.setAttribute('aria-label', title.textContent.trim());
      title.textContent = '';
      words.forEach(function (word, i) {
        var span = document.createElement('span');
        span.className = 'w';
        span.setAttribute('aria-hidden', 'true');
        span.textContent = word + (i < words.length - 1 ? ' ' : '');
        span.style.animationDelay = (0.08 + i * 0.055) + 's';
        title.appendChild(span);
      });
    });
    var contactTitle = document.querySelector('.contact .split');
    if (contactTitle && hasIO) {
      var words = contactTitle.querySelectorAll('.w');
      words.forEach(function (w) { w.style.animationPlayState = 'paused'; });
      new IntersectionObserver(function (entries, obs) {
        if (!entries[0].isIntersecting) return;
        words.forEach(function (w) { w.style.animationPlayState = 'running'; });
        obs.disconnect();
      }, { threshold: 0.4 }).observe(contactTitle);
    }

  }

  if (!reduceMotion) {
    if (finePointer) {
      var mx = 0, my = 0, tx = 0, ty = 0, raf = 0;
      var loop = function () {
        mx += (tx - mx) * 0.08;
        my += (ty - my) * 0.08;
        hero.style.setProperty('--mx', mx.toFixed(3));
        hero.style.setProperty('--my', my.toFixed(3));
        raf = Math.abs(tx - mx) + Math.abs(ty - my) > 0.002 ? requestAnimationFrame(loop) : 0;
      };
      hero.addEventListener('pointermove', function (event) {
        var r = hero.getBoundingClientRect();
        tx = (event.clientX - r.left) / r.width * 2 - 1;
        ty = (event.clientY - r.top) / r.height * 2 - 1;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      hero.addEventListener('pointerleave', function () { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(loop); });

      // Botões principais acompanham levemente o mouse
      document.querySelectorAll('.magnetic').forEach(function (button) {
        button.addEventListener('pointermove', function (event) {
          var r = button.getBoundingClientRect();
          var x = (event.clientX - r.left - r.width / 2) * 0.18;
          var y = (event.clientY - r.top - r.height / 2) * 0.3;
          button.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
        });
        button.addEventListener('pointerleave', function () { button.style.transform = ''; });
      });
    }
  }

  // ---------- Revelação ao rolar ----------
  if (hasIO) {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    document.querySelectorAll('[data-reveal]').forEach(function (el, i) {
      var below = el.getBoundingClientRect().top > window.innerHeight * 0.92;
      if (el.classList.contains('dial')) el.classList.add('is-armed');
      if (below) {
        el.classList.add(el.getAttribute('data-reveal') === 'clip' ? 'pre-clip' : 'pre');
        if (el.classList.contains('contact-card')) el.style.transitionDelay = (i % 3) * 0.08 + 's';
      }
      revealer.observe(el);
    });
  }

  // ---------- Botão flutuante: some na abertura e no contato ----------
  var floatBtn = document.querySelector('.float');
  var contact = document.getElementById('contato');
  if (floatBtn && hasIO) {
    var seen = { hero: true, contact: false };
    var updateFloat = function () { floatBtn.classList.toggle('is-hidden', seen.hero || seen.contact); };
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.target === hero) seen.hero = entry.isIntersecting;
        if (entry.target === contact) seen.contact = entry.isIntersecting;
      });
      updateFloat();
    }, { rootMargin: '-35% 0px 0px 0px' }).observe(hero);
    new IntersectionObserver(function (entries) {
      seen.contact = entries[0].isIntersecting;
      updateFloat();
    }).observe(contact);
    updateFloat();
  }

  // ---------- Abas das áreas de atuação ----------
  var tabList = document.querySelector('.tabs');
  var selectTabById = function () {};
  if (tabList) {
    var tabs = Array.prototype.slice.call(tabList.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (tab) { return document.getElementById(tab.getAttribute('aria-controls')); });
    var indicator = tabList.querySelector('.tab-indicator');
    var current = 0;

    var placeIndicator = function () {
      if (!indicator) return;
      var tab = tabs[current];
      indicator.style.width = tab.offsetWidth + 'px';
      var y = tab.offsetTop + tab.offsetHeight - tabList.clientHeight;
      indicator.style.transform = 'translate(' + tab.offsetLeft + 'px,' + y + 'px)';
    };
    var selectTab = function (index, focus) {
      current = index;
      tabs.forEach(function (tab, i) {
        var on = i === index;
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
        tab.tabIndex = on ? 0 : -1;
        panels[i].hidden = !on;
      });
      placeIndicator();
      if (focus) tabs[index].focus();
    };
    selectTabById = function (id) {
      var index = tabs.findIndex(function (tab) { return tab.id === 'tab-' + id; });
      if (index !== -1) selectTab(index, false);
    };
    tabs.forEach(function (tab, i) { tab.addEventListener('click', function () { selectTab(i, false); }); });
    tabList.addEventListener('keydown', function (event) {
      var at = tabs.indexOf(document.activeElement);
      if (at === -1) return;
      var next = null;
      if (event.key === 'ArrowRight') next = (at + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (at - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== null) { event.preventDefault(); selectTab(next, true); }
    });
    window.addEventListener('resize', placeIndicator);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeIndicator);
    selectTab(0, false);
  }
  // Links da faixa de crimes e do caminho do processo abrem a aba certa
  document.querySelectorAll('[data-tab]').forEach(function (link) {
    link.addEventListener('click', function () { selectTabById(link.getAttribute('data-tab')); });
  });

  // ---------- Como funciona o atendimento: linha que se preenche ----------
  var stepsWrap = document.querySelector('.steps-wrap');
  var stepItems = stepsWrap ? Array.prototype.slice.call(stepsWrap.querySelectorAll('.step')) : [];
  function updateSteps() {
    if (!stepsWrap) return;
    var r = stepsWrap.getBoundingClientRect();
    var p = (window.innerHeight * 0.78 - r.top) / (r.height + window.innerHeight * 0.25);
    p = Math.max(0, Math.min(1, p));
    stepsWrap.style.setProperty('--p', p.toFixed(3));
    stepItems.forEach(function (step, i) {
      step.classList.toggle('is-on', p >= i / Math.max(1, stepItems.length - 1) - 0.02);
    });
  }

  // ---------- Dúvidas: abre e fecha com animação ----------
  document.querySelectorAll('.faq details').forEach(function (details) {
    var summary = details.querySelector('summary');
    var body = details.querySelector('.faq-body');
    var anim = null;
    summary.addEventListener('click', function (event) {
      if (!body.animate) return;
      event.preventDefault();
      if (anim) anim.cancel();
      if (details.open) {
        anim = body.animate({ height: [body.offsetHeight + 'px', '0px'], opacity: [1, 0] }, { duration: 320, easing: 'cubic-bezier(.2,.7,.2,1)' });
        anim.onfinish = function () { details.open = false; anim = null; };
      } else {
        details.open = true;
        var h = body.offsetHeight;
        anim = body.animate({ height: ['0px', h + 'px'], opacity: [0, 1] }, { duration: 380, easing: 'cubic-bezier(.2,.7,.2,1)' });
        anim.onfinish = function () { anim = null; };
      }
    });
  });

  // ---------- Rolagem: um único laço para tudo que depende dela ----------
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      updateNav();
      updateActive();
      updateSteps();
      if (!reduceMotion) {
        var sy = Math.min(1, window.scrollY / Math.max(1, hero.offsetHeight));
        hero.style.setProperty('--sy', sy.toFixed(3));
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateNav();
  updateActive();
  updateSteps();
  root.classList.add('ready');
})();
