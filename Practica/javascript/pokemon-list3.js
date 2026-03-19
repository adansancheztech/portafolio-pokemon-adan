'use strict';

//------- PokeApi: Lista pokemon -------
let limit = 60;
let offset = 210;

const statusEL = document.getElementById('status');
const listEL = document.getElementById('pokemon-list');

function buildApiUrl() {
  return `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
}

async function fetchPokemonList() {
  try {
    setStatus('Cargando...');

    const res = await fetch(buildApiUrl());

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    renderList(data.results);
    setStatus(`Mostrando ${data.results.length} Pokémon`);

    //--- el try esa expecion por si falla en el proceso, captura el error
    // Puede fallar fetch (sin internet) --- Puede fallar el status HTTP (404, 500)
    // Puede fallar res.json() ---- Puede fallar renderList
    //------   Si cualquiera de esas cosas lanza error → se salta al catch.
  } catch (err) {
    console.error(err);
    setStatus(`error al cargar: ${err.message}`);
  }
}

function renderList(pokemonArray) {
  listEL.innerHTML = '';

  const fragment = document.createDocumentFragment();

  pokemonArray.forEach((p) => {
    const li = document.createElement('li');

    const id = getPokemonIdFromUrl(p.url);
    const img = document.createElement('img');
    img.src = buildSpriteUrl(id);
    img.alt = p.name;
    img.width = 48; //tamaño
    img.height = 48;

    const text = document.createTextNode(`   ${capitalize(p.name)}`);
    li.appendChild(img);
    li.appendChild(text);
    fragment.appendChild(li);
  });

  listEL.appendChild(fragment);
}
// ------- innerHTML empieza paginacion , evita duplicados
//-------- construimos una lista o una pieza y la ponemos en el html de golpe , mejora rendimiento
// -------- fragment.appendChild(li)
//----------   Lo metes en el fragmento (memoria)--- Aquí no lo estás metiendo aún en el <ul> real.
function getPokemonIdFromUrl(url) {
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1];
}

const buildSpriteUrl = (id) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};
// sacamos id de los imagen sprites usan id para identificacion

function setStatus(text) {
  statusEL.textContent = text;
}

//----- buenas practicas de estatus

function capitalize(word) {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
}

//---- Protección defensiva. Si por error llega: undefined null string vacío
//----- No rompe la app.
//------ Eso es programación defensiva profesional.

// ------------------
// ----- Inicio -----
// ------------------
fetchPokemonList();
