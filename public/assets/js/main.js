'use strict';

//CONSTANTES GLOBALES

//Traigo los elementos de html y los guardo en variables
const searchInput = document.querySelector('.js-input');
const searchBtn = document.querySelector('.js-btn');
const cardsList = document.querySelector('.js-list');
const favCardsList = document.querySelector('.js-fav-list');
const resetButton = document.querySelector('.js-reset-btn');
const favsSection = document.querySelector('.js-fav-cards');

// Declaro un array vacío donde luego irán los datos de la API
let charactersList = [];

//Array de favoritos (también vacío) a partir de las tarjetas seleccionadas
let favoriteCharacters = [];
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
//# sourceMappingURL=main.js.map
