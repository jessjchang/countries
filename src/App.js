import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    filterCountries()
  }, [search])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const filterCountries = () => {
    if (search) {
      axios
      .get(`https://restcountries.com/v3.1/name/${search}`)
      .then(response => {
        setCountries(response.data)
      }).catch(error => {
        alert('No such country exists')
      })
    }
  }

  const showCountryDetails = (country) => {
    setCountries([country])
  }

  return (
    <div>
      <Search search={search} handleSearchChange={handleSearchChange} />
      <Countries countries={countries} countryDetailHandler={showCountryDetails} />
    </div>
  )
}

export default App