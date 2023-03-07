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