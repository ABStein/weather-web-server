const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${latitude},${longitude}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('There was an issue connecting to the server. Please try again later.')
        } else if (body.error) {
            callback('Try a different location', body)
        } else {
            callback(undefined, {
                forecast: `The weather is ${body.currently.summary} with a tempearture of ${body.currently.temperature} with a ${body.currently.precipProbability}% chance of rain.`
            })
        }
    })
    
}

module.exports = forecast