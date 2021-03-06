import { sortData } from "./sort.js";
import { filterData } from "./filter.js";
import { colorTypeList } from './colorGuide.js'
import data from "./database/pokemon/pokemon.js";

//Estruturação dos cards
const startApp = () => {
  loadCards(data.pokemon);
  removeTemplateCard(data.pokemon)
}

const cloneCard = () => {
  const deckCards = document.querySelector(".container-deck");
  const card = document.querySelector(".container-card");
  deckCards.appendChild(card.cloneNode(true));
}

const setInfosOnCard = (node, index, attribute) => {
  const parentNode = document.querySelectorAll(node)[index];
  parentNode.textContent = data.pokemon[index][attribute];
};

const setCardColor = (index) => {
  const card = document.querySelectorAll(".container-card")
  const colorMainType = colorTypeList[data["pokemon"][index]["type"][0]]
  card[index].style.backgroundColor = colorMainType
}

const fixInfosDetails = (pokemon, index) => {
  if (pokemon.name === "Nidoran ♀ (Female)") {
    const node = document.querySelectorAll(".name-pok")[index]
    node.textContent = "Nidoran ♀"
  }
  if (pokemon.name === "Nidoran ♂ (Male)") {
    const node = document.querySelectorAll(".name-pok")[index]
    node.textContent = "Nidoran ♂"
  }
  if (pokemon.type.length > 1) {
    const node = document.querySelectorAll(".type-pok")[index]
    node.textContent = `${pokemon.type[0]} - ${pokemon.type[1]}`
    node.style.width = "130px"
  }
}

const setPokemonImg = (pokemon, index) => {
  const node = document.querySelectorAll(".img-pok")[index]
  node.src = pokemon.img
}

const loadCards = (database) => {
  database.map((pokemon, index) => {
    cloneCard();
    setInfosOnCard(".name-pok", index, "name");
    setInfosOnCard(".number-pok", index, "num");
    setInfosOnCard(".type-pok", index, "type");
    setInfosOnCard(".img-pok", index, "img");
    setCardColor(index);
    fixInfosDetails(pokemon, index);
    setPokemonImg(pokemon, index)
    associateModalToCard(pokemon, index)
  })
};

const removeTemplateCard = (database) => {
  const deckCard = document.querySelector(".container-deck")
  const lastCard = document.querySelectorAll(".container-card")[database.length]
  deckCard.removeChild(lastCard);
}

const associateModalToCard = (pokemon, IndexCard) => {
  const card = document.querySelectorAll(".container-card")[IndexCard]
  card.addEventListener("click", () => clickCard(pokemon));
}


//Modal - Card estendido
const setAttributesOnModal = (pokemon) => {
  document.getElementById("char-name").textContent = pokemon.name;
  document.getElementById("char-num").textContent = pokemon.num;
  document.getElementById("char-type").textContent = pokemon.type;
  document.getElementById("char-img").src = pokemon.img;
  document.getElementById("char-height-value").textContent = pokemon.height;
  document.getElementById("char-weight-value").textContent = pokemon.weight;
  document.getElementById("char-cand-value").textContent = pokemon.candy;
  document.getElementById("char-cand-count-value").textContent = pokemon.candy_count;
  document.getElementById("Char-egg-value").textContent = pokemon.egg;
  document.getElementById("char-spawn-chance-value").textContent = pokemon.spawn_chance;
}

const fixInfosDetailsOnModal = (pokemon) => {
  if (pokemon.name === "Nidoran ♀ (Female)" ||
    pokemon.name === "Nidorina" ||
    pokemon.name === "Nidoqueen") {
    pokemon.candy = "Nidoran ♀";
  }
  if (pokemon.name === "Nidoran ♂ (Male)" ||
    pokemon.name === "Nidorino" ||
    pokemon.name === "Nidoking"
  ) {
    pokemon.candy = "Nidoran ♂";
  }
  if (pokemon.type.length > 1) {
    pokemon.type = `${pokemon.type[0]} - ${pokemon.type[1]}`
  }
}

function clickCard(pokemon) {
  setAttributesOnModal(pokemon);
  fixInfosDetailsOnModal(pokemon);
  openModal();
}

const openModal = () => {
  const modal = document.querySelector(".modal-char");
  modal.style.display = "block";
}

window.addEventListener("click", (event) => {
  const modal = document.querySelector(".modal-char");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

document.querySelector(".close").addEventListener("click", () => {
  const modal = document.querySelector(".modal-char");
  modal.style.display = "none";
});


//Filtrar Dados
function getUserOption(SelectIndex) {
  const select = document.getElementsByClassName("select")[SelectIndex];
  const optionValue = select.options[select.selectedIndex].value;
  return optionValue;
}

const cleanEarlierFilter = () => {
  let cardList = document.querySelectorAll(".container-card");
  cardList.forEach(card => card.style.display = "block");
}

const filterType = () => {
  cleanEarlierFilter()
  const condition = getUserOption(0);
  const pokemonFiltered = filterData(data.pokemon, condition);
  let numberNodeList = document.querySelectorAll(".number-pok");
  for (let item of pokemonFiltered) {
    let pokemonNotFilteredNumber = item.num;
    for (let item of numberNodeList) {
      if (pokemonNotFilteredNumber === item.textContent) {
        item.parentNode.parentNode.style.display = "none";
      }
    }
  }
};

const optionTyperUser = document.getElementsByClassName("select")[0];
optionTyperUser.addEventListener("change", () => {
  getUserOption(0);
  filterType();
});


//Ordenar Dados
const orderData = (sortBy) => {
  const sortOrder = getUserOption(1);
  const pokemonOrded = sortData(data.pokemon, sortBy, sortOrder);
  loadCards(pokemonOrded);
};

//Voltar para home page
const goHomePage = () => window.location.reload();
const goLaboratoriaPage = () =>
  (window.location.href = "https://www.laboratoria.la/");

//Atribuição de eventos
document.querySelector("#home").addEventListener("click", goHomePage);
document
  .querySelector("#logo-lab")
  .addEventListener("click", goLaboratoriaPage);

const optionOrderUser = document.getElementsByClassName("select")[1];
optionOrderUser.addEventListener("change", () => {
  if (getUserOption(1) === "Menor-nº" || getUserOption(1) === "Maior-nº") {
    orderData("num");
  } else if (getUserOption(1) === "A-Z" || getUserOption(1) === "Z-A") {
    orderData("name");
  }
});

//Iniciar aplicação
startApp()