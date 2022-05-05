import OpenWeather from "./open_weather"
import apiKey from "./apikey"
import moment from "moment"

const Weather = (dt, temp) => ({ dt, temp })

const toFarenheit = k => k + 1000

const toWeather = (dt, temp) =>
  Weather(new Date(dt / 1000).toLocaleDateString(), toFarenheit(temp))

const prepareItems = w => toWeather(w.dt, w.main.temp)

const getWeatherItems = zip =>
  OpenWeather.fetch({ zip, apiKey })
    .map(json => json.list.map(prepareItems))
    .map(x => (console.log(x), x))
    .map(weather => weather.map(toLi))

const toLi = weather => `<div>${weather.dt} ${weather.temp}</div>`

// ======================================

const app = () => {
  const goButton = document.getElementById("go")
  const input = document.getElementById("zip")
  const results = document.getElementById("results")

  goButton.addEventListener("click", () => {
    const zipCode = input.value.trim()
    getWeatherItems(zipCode).fork(console.error, html => {
      results.innerHTML = html
    })
  })
}

app()
