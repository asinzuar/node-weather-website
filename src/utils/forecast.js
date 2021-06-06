const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const WS_API_KEY = 'b1aeceefc0b1cf35e641a8bba514b314'
    const WS_URL = 'http://api.weatherstack.com/current'

    const url = WS_URL + '?access_key=' + WS_API_KEY + '&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            console.log('Unable to connect to weather service!')
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find weather data. Please check coordinates', undefined)
        } else {
            const current = body.current
            //const desc = current.weather_descriptions[0]
            const temperature = current.temperature
            const feelslike = current.feelslike
            const humidity = current.humidity

            // console.log(desc + '. It is currently ' + temp + ' degrees out. It feels like '
            //     + feelslike + ' degrees.')
            data = {
                temperature,
                feelslike,
                humidity
            }
            callback(undefined, data)
        }        
    })
}

module.exports = forecast
