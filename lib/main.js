// let url = `https://pokeapi.co/api/v2/pokemon/$`;
let fluidContainer = document.getElementsByClassName("container-fluid")[0];


function callPokemonAPI(name) {
    let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    fetch(url)
    .then((response) => response.json())
    .then(function(data) {
        console.log(data);
        let name = data.name;
        let number = data.id;
        let types = getTypes(data);
        let moves = getMoves(data);
        let abilities = getAbilities(data);
        let image = data.sprites.front_default;
        let pokemon = new Pokemon(name, number, types, moves, abilities, image);
        //console.log(chimchar);
        // createPokemonElement(chimchar);
        createCarouselItem(pokemon);
    })
    .catch(function(error){
        console.log(error);
    });

}

function getTypes(pokemonJSON) {
    let types = [];
    for(let type of pokemonJSON.types) {
        types.push(type.type.name)
    }
    return types;
}

function getMoves(pokemonJSON) {
    let moves = [];
    for(let move of pokemonJSON.moves) {
        moves.push(move.move.name);
    }
    return moves;
}

function getAbilities(pokemonJSON) {
    let abilities = [];
    for(let ability of pokemonJSON.abilities) {
        abilities.push(ability.ability.name);
    }
    return abilities;
}

function createCarouselItem(pokemon) {
    //div with class carousel-item
    //inside the div we have an image with class d-block and w-100
    let carouselItem = document.createElement("div");
    carouselItem.setAttribute("class", "carousel-item");

    let carouselImg = document.createElement("img");
    carouselImg.setAttribute("class", "d-block w-50");
    carouselImg.src = pokemon.image;

    carouselItem.appendChild(carouselImg);

    let carouselInner = document.getElementsByClassName("carousel-inner")[0];
    carouselInner.appendChild(carouselItem);

    for(let i = 1; i < carouselInner.childNodes.length; i++) {
        carouselInner.childNodes[i].classList.remove("active");
    }
    carouselInner.childNodes[1].classList.add("active");
}

function createPokemonElement(pokemon) {
    //h1 tag for name 
    let h1 = document.createElement("h1");
    h1.innerText = pokemon.name;
    //h2 tag for number
    let h2 = document.createElement("h2");
    h2.innerText = pokemon.number;
    //p tag for types
    let p = document.createElement("p");
    for(let type of pokemon.types) {
        p.innerText += `${type} `
    }
    //ul tag for moves
    let moveUL = document.createElement("ul");
    for(let move of pokemon.moves) {
        moveUL.innerHTML += `<li>${move}</li>`;
    }
    //ul tag for abilities
    let abilityUL = document.createElement("ul");
    for(let ability of pokemon.abilities) {
        abilityUL.innerHTML += `<li>${ability}</li>`;
    }
    //div container for our pokemon element
    let div = document.createElement("div");
    div.append(h1, h2, p, moveUL, abilityUL);
    fluidContainer.appendChild(div);
}



