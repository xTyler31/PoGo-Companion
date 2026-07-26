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

document.addEventListener("DOMContentLoaded", function() {

fetch("data/events.json")

.then(response => response.json())

.then(events => {

    let eventCard = document.getElementById("event-list");


    if (eventCard) {

        eventCard.innerHTML = `

        <h3>Current & Upcoming Events</h3>


        ${events.map(event => {

let startDate = new Date(event.start);

let endDate = new Date(event.end);


return `

<div class="event-card">

<h3>${event.name}</h3>

<p>
${event.type}
</p>

<p>
${startDate.toLocaleDateString("en-GB", {
weekday: "long",
day: "numeric",
month: "long",
year: "numeric"
})}
</p>

<p>
${startDate.toLocaleTimeString("en-GB", {
hour: "2-digit",
minute: "2-digit"
})}
-
${endDate.toLocaleTimeString("en-GB", {
hour: "2-digit",
minute: "2-digit"
})}
</p>

<p>
<strong>Bonus</strong>
</p>

<p>

${event.bonuses.map(bonus => `
• ${bonus}<br>
`).join("")}

</p>

</div>

`;

}).join("")}

        `;

    }

});

});
