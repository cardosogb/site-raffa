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

  if ('IntersectionObserver' in window) {
    // Destaca no menu a seção que está na tela
    var links = Array.prototype.slice.call(menu.querySelectorAll('a'));
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    links.forEach(function (link) {
      var section = document.querySelector(link.getAttribute('href'));
      if (section) spy.observe(section);
    });

    // Esconde o botão flutuante quando a seção de contato está na tela
    var floatBtn = document.querySelector('.float');
    var contact = document.getElementById('contato');
    if (floatBtn && contact) {
      new IntersectionObserver(function (entries) {
        floatBtn.classList.toggle('is-hidden', entries[0].isIntersecting);
      }).observe(contact);
    }
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
