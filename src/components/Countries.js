import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({countries, countryDetailHandler}) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />
  } else {
    return <CountryListings
              countries={countries}
              countryDetailHandler={countryDetailHandler}
            />
  }
}

const CountryDetails = ({country}) => {
  const [capitalLat, capitalLon] = country.capitalInfo.latlng
  const apiKey = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${capitalLat}&lon=${capitalLon}&units=metric&appid=${apiKey}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  const weatherInfo = Object.keys(weather).length === 0
    ? {temp: '', img: '', wind: ''}
    : {temp: weather.main.temp, img: `http://openweathermap.org/img/wn/${weather.weather[0]['icon']}@2x.png`, wind: weather.wind.speed}

  return (
    <div>
       <h2>{country.name.common}</h2>
       <p>capital {country.capital[0]}</p>
       <p>area {country.area}</p>
       <p><strong>languages:</strong></p>
       <ul>
         {Object.values(country.languages).map(language =>
            <li key={language}>{language}</li>
         )}
       </ul>
       <img src={country.flags.png} alt="Country flag"></img>
       <h3>Weather in {country.capital[0]}</h3>
       <p>temperature {weatherInfo.temp} Celsius</p>
       <img src={weatherInfo.img} alt="Weather icon"></img>
       <p>wind {weatherInfo.wind} m/s</p>
    </div>
  )
}

const CountryListings = ({countries, countryDetailHandler}) => {
  return (
    <div>
      {countries.map(country =>
        <CountryListing
          key={country.name.common}
          country={country}
          countryDetailHandler={countryDetailHandler}
        />
      )}
    </div>
  )
}

const CountryListing = ({country, countryDetailHandler}) => (
  <p>{country.name.common}<button onClick={() => countryDetailHandler(country)}>show</button></p>
)

export default Countries