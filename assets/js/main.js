(function () {
  var toast = document.getElementById('toast');
  var toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 1800);
  }

  // Menu do celular
  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');

  function setMenu(open) {
    menu.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  menuBtn.addEventListener('click', function () {
    setMenu(!menu.classList.contains('open'));
  });
  menu.addEventListener('click', function (event) {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu.classList.contains('open')) {
      setMenu(false);
      menuBtn.focus();
    }
  });

  // Destaca no menu a seção que está na tela
  var links = Array.prototype.slice.call(menu.querySelectorAll('a'));
  var sections = links.map(function (link) { return document.querySelector(link.getAttribute('href')); });
  var nav = document.querySelector('.nav');

  function setActive(index) {
    links.forEach(function (link, i) { link.classList.toggle('is-active', i === index); });
  }

  // Depois de um clique no menu, o item clicado fica destacado até a pessoa rolar por conta própria.
  // Sem isso, em telas altas as últimas seções cabem juntas e o destaque pularia para "Contato".
  var clicked = -1;
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

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; updateActive(); });
  }, { passive: true });
  window.addEventListener('resize', updateActive);
  updateActive();

  // Esconde o botão flutuante quando a seção de contato está na tela
  var floatBtn = document.querySelector('.float');
  var contact = document.getElementById('contato');
  if (floatBtn && contact && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      floatBtn.classList.toggle('is-hidden', entries[0].isIntersecting);
    }).observe(contact);
  }

  // Abas das áreas de atuação
  var tabList = document.querySelector('.tabs');
  if (tabList) {
    var tabs = Array.prototype.slice.call(tabList.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (tab) { return document.getElementById(tab.getAttribute('aria-controls')); });

    var selectTab = function (index, focus) {
      tabs.forEach(function (tab, i) {
        var on = i === index;
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
        tab.tabIndex = on ? 0 : -1;
        panels[i].hidden = !on;
      });
      if (focus) tabs[index].focus();
    };

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { selectTab(i, false); });
    });
    tabList.addEventListener('keydown', function (event) {
      var current = tabs.indexOf(document.activeElement);
      if (current === -1) return;
      var next = null;
      if (event.key === 'ArrowRight') next = (current + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== null) { event.preventDefault(); selectTab(next, true); }
    });
    selectTab(0, false);
  }

  // Copiar e-mail
  document.querySelectorAll('[data-copy]').forEach(function (button) {
    button.addEventListener('click', function () {
      var text = button.getAttribute('data-copy');
      if (!navigator.clipboard) {
        showToast('Copie manualmente: ' + text);
        return;
      }
      navigator.clipboard.writeText(text).then(
        function () { showToast('E-mail copiado'); },
        function () { showToast('Copie manualmente: ' + text); }
      );
    });
  });
})();
