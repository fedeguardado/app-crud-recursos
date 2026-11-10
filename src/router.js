import { renderHome } from './views/home.js';
import { renderForm } from './views/form.js';
import { renderList } from './views/list.js';
import { setActiveLink } from './components/navbar.js';
import { getById } from './services/storage.js';
import { showToast } from './components/toast.js';

const routes = {
  '#/': renderHome,
  '#/recursos': renderList,
  '#/nuevo': renderForm
};

export function initRouter(app) {
  function handleRoute() {
    const rawHash = window.location.hash;

    const editMatch = rawHash.match(/^#\/editar\/(.+)$/);
    if (editMatch) {
      const id = editMatch[1];
      const recurso = getById(id);

      if (recurso) {
        renderForm(app, recurso);
        setActiveLink('#/recursos');
      } else {
        showToast('Recurso no encontrado', 'error');
        window.location.hash = '#/recursos';
      }
      return;
    }

    const hash = routes[rawHash] ? rawHash : '#/';
    const renderView = routes[hash];

    renderView(app);
    setActiveLink(hash);
  }

  window.addEventListener('hashchange', handleRoute);
  window.addEventListener('load', handleRoute);

  handleRoute();
}
