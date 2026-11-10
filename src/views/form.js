import { TIPOS, TEMAS, NIVELES } from '../data/options.js';
import { create, update } from '../services/storage.js';
import { showToast } from '../components/toast.js';

function escapeAttr(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function renderForm(app, recurso = null) {
  const isEdit = Boolean(recurso);
  const selectedNivel = recurso ? (recurso.nivel || 'basico') : 'basico';

  app.innerHTML = `
    <div class="form-container">
      <h1>${isEdit ? 'Editar recurso' : 'Nuevo recurso'}</h1>
      <form id="resource-form" class="card" novalidate>
        <div class="form-group">
          <label for="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            class="input"
            placeholder="Ej. Guía definitiva de CSS Grid"
            value="${recurso ? escapeAttr(recurso.titulo) : ''}"
          />
        </div>

        <div class="form-group">
          <label for="url">URL</label>
          <input
            type="url"
            id="url"
            name="url"
            class="input"
            placeholder="https://ejemplo.com"
            value="${recurso ? escapeAttr(recurso.url) : ''}"
          />
        </div>

        <div class="form-group--row">
          <div class="form-group">
            <label for="tipo">Tipo</label>
            <select id="tipo" name="tipo" class="select">
              <option value="">Selecciona...</option>
              ${TIPOS.map(t => `<option value="${t.value}" ${recurso && recurso.tipo === t.value ? 'selected' : ''}>${t.label}</option>`).join('')}
            </select>
          </div>

          <div class="form-group">
            <label for="tema">Tema</label>
            <select id="tema" name="tema" class="select">
              <option value="">Selecciona...</option>
              ${TEMAS.map(t => `<option value="${t.value}" ${recurso && recurso.tema === t.value ? 'selected' : ''}>${t.label}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Nivel</label>
          <div class="radio-group">
            ${NIVELES.map(n => `
              <label class="radio-option">
                <input
                  type="radio"
                  name="nivel"
                  value="${n.value}"
                  ${n.value === selectedNivel ? 'checked' : ''}
                />
                ${n.label}
              </label>
            `).join('')}
          </div>
        </div>

        <div class="form-group">
          <label class="checkbox-option">
            <input type="checkbox" name="favorito" id="favorito" ${recurso && recurso.favorito ? 'checked' : ''} />
            Favorito
          </label>
        </div>

        <div class="form-actions">
          <a href="#/recursos" class="btn btn-secondary">Cancelar</a>
          <button type="submit" class="btn btn-primary">${isEdit ? 'Actualizar' : 'Guardar'}</button>
        </div>
      </form>
    </div>
  `;

  const form = app.querySelector('#resource-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Limpiar errores previos
    form.querySelectorAll('.is-error').forEach(el => {
      el.classList.remove('is-error');
      el.removeAttribute('aria-invalid');
    });
    form.querySelectorAll('.field-error').forEach(el => el.remove());

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    data.favorito = Boolean(data.favorito);

    const tituloInput = form.querySelector('#titulo');
    const urlInput = form.querySelector('#url');
    const tipoSelect = form.querySelector('#tipo');
    const temaSelect = form.querySelector('#tema');

    const titulo = (data.titulo || '').trim();
    const url = (data.url || '').trim();
    const tipo = data.tipo || '';
    const tema = data.tema || '';

    let hasErrors = false;

    function addError(element, message) {
      element.classList.add('is-error');
      element.setAttribute('aria-invalid', 'true');
      const errorMsg = document.createElement('span');
      errorMsg.className = 'field-error';
      errorMsg.textContent = message;
      element.parentNode.appendChild(errorMsg);
      hasErrors = true;
    }

    if (!titulo || titulo.length < 3) {
      addError(tituloInput, 'El título es obligatorio y debe tener al menos 3 caracteres.');
    }

    let isValidUrl = false;
    try {
      new URL(url);
      isValidUrl = true;
    } catch {
      isValidUrl = false;
    }

    if (!isValidUrl) {
      addError(urlInput, 'Ingresa una URL válida (ej. https://ejemplo.com).');
    }

    if (!tipo) {
      addError(tipoSelect, 'El tipo es obligatorio.');
    }

    if (!tema) {
      addError(temaSelect, 'El tema es obligatorio.');
    }

    if (hasErrors) {
      return;
    }

    const payload = {
      titulo,
      url,
      tipo,
      tema,
      nivel: data.nivel || 'basico',
      favorito: data.favorito
    };

    if (recurso) {
      update(recurso.id, payload);
      showToast('Recurso actualizado');
    } else {
      create(payload);
      showToast('Recurso guardado');
    }

    form.reset();
    window.location.hash = '#/recursos';
  });
}
