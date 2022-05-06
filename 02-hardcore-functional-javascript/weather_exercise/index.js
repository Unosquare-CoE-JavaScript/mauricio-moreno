import OpenWeather from "./open_weather"
import apiKey from "./apikey"
import moment from "moment"

const Weather = (dt, temp) => ({ dt, temp })

const toFarenheit = k => k + 1000

// this formats the data
const toWeather = (dt, temp) =>
  Weather(new Date(dt / 1000).toLocaleDateString(), toFarenheit(temp))

// PRivate function used in a map function and formats the data using toWeather function
const prepareItems = w => toWeather(w.dt, w.main.temp)

const getWeatherItems = zip =>
  OpenWeather.fetch({ zip, apiKey })
    .map(json => json.list.map(prepareItems))
    .map(x => (console.log(x), x))// logs the data and continues the flow
    .map(weather => weather.map(toLi)) // Converts each element of the data in a string

const toLi = weather => `<div>${weather.dt} ${weather.temp}</div>`

// ======================================

const app = () => {
  const goButton = document.getElementById("go") // this button when clicked will start the call to the api
  const input = document.getElementById("zip") // this will be an input, but we only use its data-set
  const results = document.getElementById("results") // here we will put the results of the fetch

  goButton.addEventListener("click", () => {
    const zipCode = input.value.trim() // get the ziPcode from the input
    getWeatherItems(zipCode).fork(console.error, html => {
      results.innerHTML = html // here we put the data
    })
  })
}

app()
