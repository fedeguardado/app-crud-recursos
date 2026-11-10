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

/** Devuelve el recurso con ese id usando find, o null si no existe. */
export function getById(id) {
  const resources = getAll();
  return resources.find(resource => resource.id === id) || null;
}

/** Reemplaza el recurso combinando { ...recursoActual, ...data } conservando id y fechaCreacion. */
export function update(id, data) {
  const resources = getAll();
  const index = resources.findIndex(resource => resource.id === id);
  if (index === -1) {
    return null;
  }

  const recursoActual = resources[index];
  const recursoActualizado = {
    ...recursoActual,
    ...data,
    id: recursoActual.id,
    fechaCreacion: recursoActual.fechaCreacion
  };

  resources[index] = recursoActualizado;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
  return recursoActualizado;
}

/** Elimina un recurso por id usando filter; devuelve true si se eliminó o false si no existía. */
export function remove(id) {
  const resources = getAll();
  const filtered = resources.filter(resource => resource.id !== id);
  if (filtered.length === resources.length) {
    return false;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

/** Retorna las métricas de total de recursos, favoritos y temas únicos. */
export function getStats() {
  const resources = getAll();
  const total = resources.length;
  const favoritos = resources.filter(resource => resource.favorito).length;
  const temas = new Set(resources.map(resource => resource.tema)).size;

  return { total, favoritos, temas };
}
