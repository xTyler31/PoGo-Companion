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
function showEvents(category) {

    let eventCard = document.getElementById("event-list");


    fetch("data/events.json")

    .then(response => response.json())

    .then(events => {


        let now = new Date();


        if (category === "live") {

            events = events.filter(event => {

                let start = new Date(event.start);
                let end = new Date(event.end);

                return now >= start && now <= end;

            });


        } else {

            events = events.filter(event =>
                event.category === category
            );

        }


        if (events.length === 0) {

            eventCard.innerHTML = `

            <h3>No Events Found</h3>

            <p>
            No events currently match this category.
            </p>

            `;

            return;

        }


        eventCard.innerHTML = `

        <h3>Events</h3>


        ${events.map(event => `

        <div class="event-card">

            <h3>${event.name}</h3>

            <p>
            ${event.type}
            </p>

            <p>
            Start:
            ${new Date(event.start).toLocaleString("en-GB")}
            </p>

            <p>
            End:
            ${new Date(event.end).toLocaleString("en-GB")}
            </p>

        </div>

        `).join("")}

        `;


    });

}

events.sort((a, b) => {

    let now = new Date();

    let aStart = new Date(a.start);

    let bStart = new Date(b.start);


    let aLive = now >= aStart && now <= new Date(a.end);

    let bLive = now >= bStart && now <= new Date(b.end);


    if (aLive && !bLive) return -1;

    if (!aLive && bLive) return 1;


    return aStart - bStart;

});


    let eventCard = document.getElementById("event-list");


    if (eventCard) {

        eventCard.innerHTML = `

        <h3>Current & Upcoming Events</h3>


        ${events.map(event => {

let startDate = new Date(event.start);

let endDate = new Date(event.end);


return `

<div class="event-card">

${(() => {

let now = new Date();

let start = new Date(event.start);

let end = new Date(event.end);

if (now >= start && now <= end) {

return `<span class="event-live">LIVE</span>`;

}

return "";

})()}

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
