const request = require('postman-request')

const geocode = (city, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(city) + '.json?access_token=pk.eyJ1IjoicmFodWxjaGhpYmVyIiwiYSI6ImNrbm5sbzR6YjBzNDQydmt4M2tpdzZhdmoifQ.3mC-i8P2rE5eVbzw9V7Mtw&limit=1'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to geocoding service!', undefined)
        } else if (!body.features || body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            const info = body.features[0]
            //console.log('Place - ' + info.place_name)
            data = {
                location: info.place_name,
                latitude: info.center[1],
                longitude: info.center[0]
            }

            callback(undefined, data)
        }
    })
}

module.exports = geocode