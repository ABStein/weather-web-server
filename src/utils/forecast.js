const request = require('request');
const dotenv = require('dotenv').config('.env');

const forecast = (city, callback) => {
    const url = `http://api.weatherstack.com/forecast?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${city}`;
    console.log('forecast url:' , url)
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('There was an issue connecting to the server. Please try again later.')
        } else if (body.error) {
            callback('Try a different location', body)
        } else {
            callback(undefined, `It is ${body.current.weather_descriptions[0]} in ${body.location.name} today.`)
        }
    })
    
}

module.exports = forecast