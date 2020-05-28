const request = require('request');
const dotenv = require('dotenv').config('.env');


const geocode =  (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAPBOX_API_KEY}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
             callback('There was an issue connecting to the server. Please try again later.')
        } else if (body.features.length === 0 || body.features === undefined) {
             callback('Unable to find location. Try another search!')
        } else {
             callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode