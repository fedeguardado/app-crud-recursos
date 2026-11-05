import { getStats } from '../services/storage.js';

export function renderHome(app) {
  const stats = getStats();

  app.innerHTML = `
    <section class="hero">
      <h1 class="hero__title">Tu biblioteca de recursos para aprender a programar</h1>
      <p class="hero__subtitle">Guarda, organiza y accede a tus tutoriales, artículos, cursos y herramientas favoritas.</p>
      <a href="#/recursos" class="btn btn-primary">Empezar</a>
    </section>

    <section class="home-section">
      <div class="stats-grid">
        <div class="card stat-card">
          <span class="stat-card__value">${stats.total}</span>
          <span class="stat-card__label">Recursos guardados</span>
        </div>
        <div class="card stat-card">
          <span class="stat-card__value">${stats.favoritos}</span>
          <span class="stat-card__label">Favoritos</span>
        </div>
        <div class="card stat-card">
          <span class="stat-card__value">${stats.temas}</span>
          <span class="stat-card__label">Temas</span>
        </div>
      </div>
    </section>

    <section class="home-section">
      <div class="features-grid">
        <div class="card">
          <h3 class="feature-card__title">Guardar</h3>
          <p class="feature-card__text">Guarda enlaces a videos, artículos, documentación y cursos útiles.</p>
        </div>
        <div class="card">
          <h3 class="feature-card__title">Organizar</h3>
          <p class="feature-card__text">Clasifica tus recursos por tipo, tema y nivel para tener todo ordenado.</p>
        </div>
        <div class="card">
          <h3 class="feature-card__title">Encontrar</h3>
          <p class="feature-card__text">Accede fácilmente al material que necesitas en cada etapa de aprendizaje.</p>
        </div>
      </div>
    </section>
  `;
}
