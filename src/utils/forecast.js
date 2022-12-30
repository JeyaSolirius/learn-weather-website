const request = require('request')

const forecast = (longitude, latitude, callback)=>{
const urlWeather= 'http://api.weatherstack.com/current?access_key=479ff30b437eb9258e3741c6794adc34&query=' + encodeURIComponent(longitude, latitude) + ''
request({url: urlWeather, json: true}, (error, {body})=>{
    if(error){
        callback('Unable to connect to the weather service', undefined)
    } else if(body.error){
        callback('Unable to find the location', undefined)
    } else{
        callback(undefined,  body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + 'degrees out there. It feels like ' + body.current.feelslike + 'degrees out.')
    }
})

}
module.exports = forecast