import { getAll } from '../services/storage.js';
import { TIPOS, TEMAS, NIVELES } from '../data/options.js';

function getLabel(lista, value) {
  const item = lista.find(element => element.value === value);
  return item ? item.label : value;
}

export function renderList(app) {
  const resources = getAll();
  const sortedResources = [...resources].sort(
    (a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion)
  );

  if (sortedResources.length === 0) {
    app.innerHTML = `
      <div class="list-header">
        <h1>Mis recursos</h1>
        <a href="#/nuevo" class="btn btn-primary">+ Nuevo recurso</a>
      </div>
      <div class="card empty-state">
        <p class="empty-state__message">Aún no tienes recursos</p>
        <a href="#/nuevo" class="btn btn-primary">Agregar el primero</a>
      </div>
    `;
    return;
  }

  app.innerHTML = `
    <div class="list-header">
      <h1>Mis recursos</h1>
      <a href="#/nuevo" class="btn btn-primary">+ Nuevo recurso</a>
    </div>

    <div class="resource-grid">
      ${sortedResources.map(resource => {
        let domain = '';
        try {
          domain = new URL(resource.url).hostname;
        } catch {
          domain = resource.url;
        }

        const formattedDate = new Date(resource.fechaCreacion).toLocaleDateString('es-SV');
        const tipoLabel = getLabel(TIPOS, resource.tipo);
        const temaLabel = getLabel(TEMAS, resource.tema);
        const nivelLabel = getLabel(NIVELES, resource.nivel);

        return `
          <div class="card resource-card">
            <div class="resource-card__header">
              <span class="badge badge--${resource.tipo}">${tipoLabel}</span>
              ${resource.favorito ? '<span class="resource-card__star">★</span>' : ''}
            </div>

            <div class="resource-card__body">
              <a href="${resource.url}" target="_blank" rel="noopener" class="resource-card__title">
                ${resource.titulo}
              </a>
              <span class="resource-card__domain">${domain}</span>
              <div class="resource-card__meta">
                <span>Tema: <strong>${temaLabel}</strong></span>
                <span>•</span>
                <span>Nivel: <strong>${nivelLabel}</strong></span>
              </div>
            </div>

            <div class="resource-card__footer">
              <span>${formattedDate}</span>
              <a href="#/editar/${resource.id}" class="btn btn-secondary">Editar</a>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}
