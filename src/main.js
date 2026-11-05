import './style.css';
import { renderNavbar } from './components/navbar.js';
import { initRouter } from './router.js';

const navbar = document.querySelector('#navbar');
const app = document.querySelector('#app');

renderNavbar(navbar);
initRouter(app);
