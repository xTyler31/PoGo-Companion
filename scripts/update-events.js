const fs = require("fs");
const https = require("https");

const sourceURL = "https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.min.json";


function fetchEvents() {

    return new Promise((resolve, reject) => {

        https.get(sourceURL, response => {

            let data = "";

            response.on("data", chunk => {
                data += chunk;
            });


            response.on("end", () => {

                try {

                    resolve(JSON.parse(data));

                } catch(error) {

                    reject(error);

                }

            });


        }).on("error", error => {

            reject(error);

        });

    });

}



function cleanEvents(events) {

    const now = new Date();


    return events
        .filter(event => {

            let end = new Date(event.end);

            return end >= now;

        })


        .map(event => {

            return {

                name: event.name,

                type: event.heading || event.eventType,

                start: event.start,

                end: event.end,

                bonuses: []

            };

        });

}



async function updateEvents() {

    try {

        const rawEvents = await fetchEvents();


        const cleanData = cleanEvents(rawEvents);


        fs.writeFileSync(
            "data/events.json",
            JSON.stringify(cleanData, null, 2)
        );


        console.log("Events updated successfully");


    } catch(error) {

        console.error(error);

        process.exit(1);

    }

}


updateEvents();
