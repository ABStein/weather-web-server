const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)

searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    // if no place exists, return and break out
    if (place == null) return
    
    fetch(`/weather?address=${place.name}`)
        .then((response) => {
            response.json().then((data) => {
                setWeatherData(data, place.formatted_address)    
        })
        .catch((err) => console.log(err))
    })
})

const locationElement = document.querySelector('[data-location]');
const statusElement = document.querySelector('[data-status]');
const temperatureElement = document.querySelector('[data-temperature]');
const precipitationElement = document.querySelector('[data-precipitation]');
const windElement = document.querySelector('[data-wind]');

const setWeatherData = (data, place) => {
    console.log(data.forecast)
    statusElement.textContent = data.forecast.weather_descriptions[0]
    locationElement.textContent = place
    temperatureElement.textContent = data.forecast.temperature + '° Celcius'
    precipitationElement.textContent = data.forecast.humidity + '%'
    windElement.textContent = data.forecast.wind_speed + ' mph'
}
