# DevShelf

Biblioteca personal para guardar y organizar recursos de aprendizaje de programación.
Permite gestionar videos, artículos, documentación, cursos y herramientas en un solo lugar.

## Funcionalidades

- Página de bienvenida con estadísticas (total de recursos, favoritos y temas).
- Registro de recursos con validación de formulario.
- Listado de recursos en tarjetas con badges por tipo.
- Edición de recursos.
- Persistencia en localStorage.

## Tecnologías

- **Vite** (^8.3.5)
- **JavaScript vanilla** (módulos ES)
- **CSS** con variables
- **uuid** (^14.0.3)

## Requisitos

- Node.js
- pnpm

## Estructura del proyecto

```text
src/
├── components/         # Piezas reutilizables (navbar, toast)
├── data/
│   └── options.js      # Opciones de tipo, tema y nivel
├── services/
│   └── storage.js      # Acceso a localStorage
├── views/              # Una vista por página
├── main.js             # Punto de entrada
├── router.js           # Router por hash
└── style.css           # Solo importa los archivos de src/styles/
```

## Modelo de datos

Estructura del objeto recurso almacenado en `localStorage`:

```json
{
  "id": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
  "titulo": "Guía completa de CSS Grid",
  "url": "https://developer.mozilla.org/es/docs/Web/CSS/CSS_Grid_Layout",
  "tipo": "article",
  "tema": "css",
  "nivel": "intermedio",
  "favorito": true,
  "fechaCreacion": "2026-11-10T08:00:00.000Z"
}
```

## Autor

- [Tu nombre]
- Proyecto del bootcamp [Nombre del bootcamp]
