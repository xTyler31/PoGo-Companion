let pokemonData = [];


fetch("data/pokemon.json")
.then(response => response.json())
.then(data => {

    pokemonData = data;

    console.log("Pokémon loaded:", pokemonData);

});
