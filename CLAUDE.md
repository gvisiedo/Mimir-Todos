# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vanilla JavaScript todo list app — no build tools, no dependencies, no package manager. Runs directly in the browser.

## Running the App

Open `index.html` directly in a browser, or serve it with a local HTTP server:

```bash
python3 -m http.server
```

## Architecture

Three files make up the entire app:

- [index.html](index.html) — HTML structure with Spanish IDs (`#input-tarea`, `#btn-añadir`, `#lista-tareas`)
- [js/scripts.js](js/scripts.js) — All application logic
- [css/style.css](css/style.css) — Styling

**Data flow in [js/scripts.js](js/scripts.js):**

1. `añadirTarea()` — creates a `<li>` DOM element with a delete button, attaches click handlers for toggle/delete, appends to `#lista-tareas`
2. `guardarEnStorage()` — serializes all tasks to `localStorage` as `{texto: string, completada: boolean}[]`
3. `cargarDeStorage()` — runs on page load; reads from `localStorage` and calls `añadirTarea()` for each saved task

Task state (completed/not) lives on the DOM element as the CSS class `completada`, and is read back into the storage object on each save.
