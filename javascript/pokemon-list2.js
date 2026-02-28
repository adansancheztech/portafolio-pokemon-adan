'use strict';

const listEL = document.getElementById('pokemon-list');
let limit = 20;
let offset = 0;

function buildApiUrl() {
  //return `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  return 'https://pokeapi.co/api/v2/pokemon/15';
}

async function main() {
  const res = await fetch(buildApiUrl());
  const data = await res.json();

  listEL.innerText = JSON.stringify(data, null, 2);
}

main();

//------| ---------- | ----------------------------------------------- |
//------| fetch()    | Trae respuesta HTTP (objeto Response)           |
//------| res.json() | Convierte body JSON a objeto JavaScript         |
//------| await      | Espera a que termine una promesa                |
//------| try/catch  | Captura y gestiona errores                      |
//------| throw      | Lanza un error manualmente                      |
//------| res.ok     | Indica si status HTTP es 200–299                |
//------| results    | Array devuelto en endpoints tipo lista          |
//------| map()      | Transforma cada elemento del array              |
//------| join()     | Une array en un solo string                     |
//------| innerHTML  | Inserta HTML interpretado en el DOM             |
//------| innerText  | Inserta texto plano (no interpreta HTML)        |
//------| textContent| Inserta texto plano (más seguro y rápido)       |
//------| DocumentFragment | Construye DOM en memoria (mejor rendimiento) |
//------| createElement()  | Crea nodos reales del DOM                  |
//------| appendChild()    | Inserta nodo en el DOM                     |
//------| JSON.stringify() | Convierte objeto a texto visible (debug)   |
//------| offset     | Desplazamiento en paginación                    |
//------| limit      | Cantidad de resultados por página               |
