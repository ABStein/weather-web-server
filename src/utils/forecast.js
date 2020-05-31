const request = require('request');
const dotenv = require('dotenv').config('.env');

const forecast = (city, callback) => {
    const url = `http://api.weatherstack.com/forecast?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${city}`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('There was an issue connecting to the server. Please try again later.')
        } else if (body.error) {
            callback('Try a different location', body)
        } else {
            const fahrenheit = 1.8 * body.current.temperature + 32
            callback(undefined, `It is ${fahrenheit} degrees fahrenheit and ${body.current.weather_descriptions[0]} in ${body.location.name} today.`)
        }
    })
}

module.exports = forecast