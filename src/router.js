import { renderHome } from './views/home.js';
import { renderForm } from './views/form.js';
import { renderList } from './views/list.js';
import { setActiveLink } from './components/navbar.js';

const routes = {
  '#/': renderHome,
  '#/recursos': renderList,
  '#/nuevo': renderForm
};

export function initRouter(app) {
  function handleRoute() {
    const rawHash = window.location.hash;
    const hash = routes[rawHash] ? rawHash : '#/';
    const renderView = routes[hash];

    renderView(app);
    setActiveLink(hash);
  }

  window.addEventListener('hashchange', handleRoute);
  window.addEventListener('load', handleRoute);

  handleRoute();
}
