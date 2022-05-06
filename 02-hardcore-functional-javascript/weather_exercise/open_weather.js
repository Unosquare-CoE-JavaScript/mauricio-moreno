import { compose, map } from "ramda"
import { Task } from "./Types"
import apiKey from "./apikey"

// this creates the url of the function
const makeWeatherUrl = ({ zip, apiKey }) =>
  `http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&appid=${apiKey}`

// A fetch implementation that returns a Functor
const fetchIt = url =>
  Task((reject, response) =>
    fetch(url)
      .then(data => data.json())
      .then(response)
      .catch(reject)
  )

const toJson = x => x.json()

const OpenWeather = {
  fetch: compose(fetchIt, makeWeatherUrl), // this receives the data zip and api key then pass the info to the fetch function and return the functor
}

export default OpenWeather
