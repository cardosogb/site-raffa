// Marca que o JavaScript está ativo antes de a página aparecer, para as abas não piscarem.
document.documentElement.classList.add('js');

// Ao atualizar a página, volta sempre ao topo: o navegador não restaura a posição antiga
// e o final do endereço (#contato, #atuacao...) deixado pelo menu é removido.
// Um link compartilhado para uma seção continua abrindo nela, porque não é uma atualização.
(function () {
  var isReload = false;
  try {
    var nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
    isReload = nav ? nav.type === 'reload' : !!(performance.navigation && performance.navigation.type === 1);
  } catch (e) { /* navegador antigo: segue o padrão */ }
  if (!isReload) return;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  // O navegador pode tentar restaurar a posição em momentos diferentes do carregamento,
  // então a página volta ao topo agora, quando o HTML termina e quando tudo carrega.
  var toTop = function () { window.scrollTo(0, 0); };
  toTop();
  document.addEventListener('DOMContentLoaded', toTop);
  window.addEventListener('load', function () { toTop(); requestAnimationFrame(toTop); });
})();
