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



        ${events.map(event => {


            let startDate = new Date(event.start);

            let endDate = new Date(event.end);



            let liveBadge = "";



            if (now >= startDate && now <= endDate) {


                liveBadge = `

                <span class="event-live">
                LIVE
                </span>

                `;

            }




            return `


            <div class="event-card">


                ${liveBadge}


                <h3>
                ${event.name}
                </h3>



                <p>
                ${event.type}
                </p>



                <p>

                Start:
                ${startDate.toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                })}

                </p>



                <p>

                Time:
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

                ${
                    event.bonuses && event.bonuses.length > 0

                    ?

                    event.bonuses.map(bonus =>

                    `• ${bonus}<br>`

                    ).join("")

                    :

                    "No bonuses listed"

                }

                </p>



            </div>


            `;


        }).join("")}



        `;


    });


}
