import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'devshelf:recursos';

/** Devuelve la lista de recursos guardados en localStorage o [] si no hay o falla. */
export function getAll() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/** Genera un recurso con id y fechaCreacion, lo almacena y lo retorna. */
export function create(data) {
  const resources = getAll();
  const newResource = {
    ...data,
    id: uuidv4(),
    fechaCreacion: new Date().toISOString()
  };
  resources.push(newResource);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
  return newResource;
}

/** Retorna las métricas de total de recursos, favoritos y temas únicos. */
export function getStats() {
  const resources = getAll();
  const total = resources.length;
  const favoritos = resources.filter(resource => resource.favorito).length;
  const temas = new Set(resources.map(resource => resource.tema)).size;

  return { total, favoritos, temas };
}
