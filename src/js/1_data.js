'use strict';

//RECOJO DATOS DE LA API. Vuelvo a la primera versión de la función con fetch, porque del localStorage sólo quiero las favoritas, y había guardado todas
function getData() {
  fetch('https://breakingbadapi.com/api/characters')
    .then((response) => response.json())
    .then((data) => {
      charactersList = data;
      renderCharactersList();
    });
}

function getLocalFav() {
  const favoritesInLocalSt = JSON.parse(localStorage.getItem('favorites'));

  if (favouritesInLocalSt !== null) {
    favoriteCharacters = favoritesInLocalSt;
    renderFavCharacters();
  }
}

//Al abrir la página, quiero los datos de la API
getData();
//y mis favoritas guardadas en localStorage
getLocalFav();