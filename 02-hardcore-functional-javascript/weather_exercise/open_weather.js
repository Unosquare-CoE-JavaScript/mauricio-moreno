import { compose, map } from "ramda"
import { Task } from "./Types"
import apiKey from "./apikey"

const makeWeatherUrl = ({ zip, apiKey }) =>
  `http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&appid=${apiKey}`

const fetchIt = url =>
  Task((reject, response) =>
    fetch(url)
      .then(data => data.json())
      .then(response)
      .catch(reject)
  )

const toJson = x => x.json()

const OpenWeather = {
  fetch: compose(fetchIt, makeWeatherUrl),
}

export default OpenWeather
