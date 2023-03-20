"use strict";


//---------------------------------------QUERYS SELECTOR ---------------------------------------

const characterList = document.querySelector(".js-list");
const btn = document.querySelector(".js-btn");
const input = document.querySelector(".js-input");
const favouritesList = document.querySelector("js-fav-cards");
const resetBtn = document.querySelector(".js-reset-btn");

// -----------------------------VARIABLES GLOBALES--------------

let allCharacters = [];
let favouritesCharacters = [];

//--------------------------------------------- FUNCIONES-------------------------------------------------------------------

function renderOneCharacter(character) {


  const characterInFavouritesIndex = favouritesCharacters.findIndex(
    (eachCharacterObj) =>
      eachCharacterObj.char_id === parseInt(character.char_id)
  );
  let classFavourite = "";
  if (characterInFavouritesIndex === -1) {
    classFavourite = "";
  } else {
    classFavourite = "selected";
  }
  return `
  <li class="js-character characters___Articles ${classFavourite}"id="${character.char_id}">
  <article class="characters___Articles___Item">
      <img src="${character.img}" alt="" class="characters___Articles___Item--img">
      <h3 class="characters___Articles___Item--h3">${character.name}</h3>
      <p class="characters___Articles___Item--p">${character.status}</p>
  </article>
  </li>`;
}



function renderCharacters(allCharacters) {
  characterList.innerHTML = "";
  for (let i = 0; i < allCharacters.length; i++) {
    characterList.innerHTML += renderOneCharacter(allCharacters[i]);
  }
  addCharacterListener();
}


function addCharacterListener() {
  const allCharactersArticles = document.querySelectorAll(".js-character");
  for (const character of allCharactersArticles) {
    character.addEventListener("click", handleCharacters);
  }
}


function handleCharacters(event) {
  event.currentTarget.classList.toggle("selected");


  const SelectedCharacters = allCharacters.find(
    (eachCharacterObj) =>
      eachCharacterObj.char_id === parseInt(event.currentTarget.id)
  );


  const characterInFavouritesIndex = favouritesCharacters.findIndex(
    (eachCharacterObj) =>
      eachCharacterObj.char_id === parseInt(event.currentTarget.id)
  );

  if (characterInFavouritesIndex === -1) {
    favouritesCharacters.push(SelectedCharacters);
    localStorage.setItem("characterFav", JSON.stringify(favouritesCharacters));
  }

  else {
    favouritesCharacters.splice(characterInFavouritesIndex, 1);
    localStorage.setItem("characterFav", JSON.stringify(favouritesCharacters));
  }
  renderFavCharacters();
}



function renderFavCharacters() {
  let html = "";
  for (const character of favouritesCharacters) {
    html += renderOneCharacter(character);
  }
  favouritesList.innerHTML = html;
}



function searchCharacters(event) {
  event.preventDefault();
  const inputValue = input.value.toLowerCase();
  const filteredCharacters = allCharacters.filter((character) =>
    character.name.toLowerCase().includes(inputValue)
  );
  renderCharacters(filteredCharacters);
}

function resetFav(ev) {
  ev.preventDefault();
  localStorage.removeItem("characterFav");
  favouritesCharacters.length = [];
  renderCharacters(allCharacters);
  favouritesList.innerHTML = "";
  resetBtn.classList.remove("hidden");
}

//--------------------------------------------------------- EVENTOS------------------------------------------------

btn.addEventListener("click", searchCharacters);
resetBtn.addEventListener("click", resetFav);

// -----------------------------------------FETCH-------------------------------

fetch("./assets/data/characters.json")
  .then((response) => response.json())
  .then((data) => {
    allCharacters = data;
    renderCharacters(allCharacters);
  });

// ----------------------LOCAL STORAGE --------------

const savedLocalFAvs = JSON.parse(localStorage.getItem("characterFav"));

if (savedLocalFAvs !== null) {
  favouritesCharacters = savedLocalFAvs;
  renderFavCharacters();
}