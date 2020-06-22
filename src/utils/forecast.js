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
            callback(undefined, body.current)
        }
    })
}

module.exports = forecast