'use strict';

// ------- Config -------
let limit = 10;
let offset = 200;

// ------- DOM -------
const statusEl = document.getElementById('status');
const listEl = document.getElementById('pokemon-list');

const limitSelect = document.getElementById('limitSelect');
const reloadBtn = document.getElementById('reloadBtn');

const collapseBtn = document.getElementById('collapseBtn');
const collapsePanel = document.getElementById('collapsePanel');
const collapseIcon = document.getElementById('collapseIcon');

// ------- Helpers -------
function buildApiUrl() {
  return `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
}

function getIdFromUrl(url) {
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1];
}

const buildSpriteUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

function capitalize(word) {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function setStatus(text) {
  statusEl.textContent = text;
}

// ------- Data -------
async function fetchPokemonList() {
  try {
    setStatus('Cargando...');

    const res = await fetch(buildApiUrl());
    if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);

    const data = await res.json();
    renderList(data.results);
    setStatus(`Mostrando ${data.results.length} Pokémon`);
  } catch (err) {
    console.error(err);
    setStatus(`Error al cargar: ${err.message}`);
  }
}

// ------- UI Render -------
function renderList(pokemonArray) {
  listEl.innerHTML = '';
  const fragment = document.createDocumentFragment();

  pokemonArray.forEach((p) => {
    const id = getIdFromUrl(p.url);

    const li = document.createElement('li');
    li.className = 'px-4 py-3';

    // fila tipo "tabla" (4 columnas)
    const row = document.createElement('div');
    row.className = 'grid grid-cols-[80px_80px_1fr_1fr] items-center gap-2';

    // Nº nacional (aquí de momento usamos id)
    const colId = document.createElement('div');
    colId.className = 'text-sm text-gray-200 font-semibold tabular-nums';
    colId.textContent = `#${id}`;

    // Imagen
    const colImg = document.createElement('div');
    const img = document.createElement('img');
    img.src = buildSpriteUrl(id);
    img.alt = p.name;
    img.className = 'w-12 h-12 image-rendering-pixelated';
    colImg.appendChild(img);

    // Nombre
    const colName = document.createElement('div');
    colName.className = 'text-sm font-medium';
    colName.textContent = capitalize(p.name);

    // Comentario (placeholder)
    const colComment = document.createElement('div');
    colComment.className = 'text-xs text-gray-400';
    colComment.textContent = 'Aún por confirmar';

    row.appendChild(colId);
    row.appendChild(colImg);
    row.appendChild(colName);
    row.appendChild(colComment);

    li.appendChild(row);
    fragment.appendChild(li);
  });

  listEl.appendChild(fragment);
}

// ------- Interactions -------
collapseBtn.addEventListener('click', () => {
  const isHidden = collapsePanel.classList.contains('hidden');
  collapsePanel.classList.toggle('hidden');
  collapseIcon.textContent = isHidden ? '▴' : '▾';
});

limitSelect.addEventListener('change', () => {
  limit = Number(limitSelect.value);
});

reloadBtn.addEventListener('click', () => {
  fetchPokemonList();
});

// ------- Start -------
fetchPokemonList();
