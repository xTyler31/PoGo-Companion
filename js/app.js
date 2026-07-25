let pokemonData = [];


fetch("data/pokemon.json")

.then(response => response.json())

.then(data => {

    pokemonData = data;

});



function showType(type) {


    let results = document.getElementById("results");


    let matches = pokemonData.filter(pokemon =>
        pokemon.raidType === type
    );


    results.innerHTML = `

    <h2>${type} Attackers</h2>


    ${matches.map(pokemon => `

        <div class="card">

            <h3>${pokemon.name}</h3>

            <p>
            Tier: ${pokemon.tier}
            </p>


            <p>
            Best Moveset:
            <br>
            ${pokemon.moveset.fast}
            +
            ${pokemon.moveset.charged}
            </p>

        </div>


    `).join("")}

    `;


}
