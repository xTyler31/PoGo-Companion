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

fetch("data/events.json")

.then(response => response.json())

.then(events => {

    let eventCard = document.querySelector(".event-menu .card");


    eventCard.innerHTML = `

    <h3>Current & Upcoming Events</h3>


    ${events.map(event => `

        <div class="event-card">

            <h3>${event.name}</h3>

            <p>
            Type:
            ${event.type}
            </p>


            <p>
            Start:
            ${event.start}
            </p>


            <p>
            End:
            ${event.end}
            </p>


            <p>
            Bonus:
            ${event.bonus}
            </p>

        </div>


    `).join("")}

    `;

});
