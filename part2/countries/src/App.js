import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({ countries, filter, weather, handleShowButtonClick, setCurrentCountry }) => {

    const CountryList = ({ countries }) => {
        const CountryListEntry = ({ country }) => {
            return (
                <li key={country.name}>
                    {country.name}
                    <button value={country.name} onClick={handleShowButtonClick}>Show</button>
                </li>
            )
        }

        return (
            <ul>
                {filteredList.map(
                    c => <CountryListEntry key={c.name} country={c} handleShowButtonClick={handleShowButtonClick} />)}
            </ul>
        )
    }

    const filteredList = countries
        .filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))

    if (filteredList.length === 0) {
        setCurrentCountry('')
        return 'No matching countries found.'
    } else if (filteredList.length === 1) {
        setCurrentCountry(filteredList[0].name)
        return <Country country={filteredList[0]} weather={weather}/>
    } else if (filteredList.length < 10) {
        setCurrentCountry('')
        return <CountryList countries={filteredList} />
    } else {
        setCurrentCountry('')
        return 'Too many matches, please specify another filter'
    }
}

const Country = ({ country, weather }) => {

    const Flag = ({ country }) => {
        return <img src={country.flag} width='240' height='120' alt='Country flag' />
    }

    const Languages = ({ country }) => {
        return (
            <ul>
                {country.languages.map(l => <li key={l.name}>{l.name}</li>)}
            </ul>
        )
    }

    const Capital = ({ country }) => {
        return <p>capital {country.capital}</p>
    }

    const Population = ({ country }) => {
        return <p>population {country.population}</p>
    }

    const Weather = () => {
        if (weather.current) {
            return (
                <>
                    <p>temperature {weather.current.temp_c}</p>
                    <img src={weather.current.condition.icon} alt="Weather" />
                    <p>wind {weather.current.wind_kph} direction {weather.current.wind_dir}</p>
                </>
            )
        } else {
            return ''
        }
    }

    return (
        <>
        <h1>{country.name}</h1>
        <Capital country={country} />
        <Population country={country} />
        <Languages country={country} />
        <Flag country={country} />
        <Weather country={country} />
        </>
    )
}

const Filter = ({ filter, handleFilterChange }) => {
    return (
        <>
            Find countries
            <input value={filter} onChange={handleFilterChange} />
        </>
    )
}

const App = () => {
    const countriesURL = 'https://restcountries.eu/rest/v2/all'

    const [ countries, setCountries ] = useState([])
    const [ filter, setFilter ] = useState('')
    const [ currentCountry, setCurrentCountry ] = useState('')
    const [ weather, setWeather ] = useState({})

    useEffect(() => {
        const eventHandler = (response) => {
            setCountries(response.data)
        }
        axios.get(countriesURL).then(eventHandler)
    }, [])

    useEffect(() => {
        const apiURL = `http://api.apixu.com/v1/current.json?key=3b66643e0b454bf09de154136191006&q=${currentCountry}`
        if (currentCountry) {
            axios.get(apiURL).then((response) => {
                setWeather(response.data)
            })
        }
    }, [currentCountry])

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const handleShowButtonClick = (event) => {
        const country = event.target.value
        setCurrentCountry(country)
        setFilter(country)
    }

    return (
        <div>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <br />
            <Countries
                countries={countries}
                filter={filter}
                handleShowButtonClick={handleShowButtonClick}
                setCurrentCountry={setCurrentCountry}
                weather={weather}
            />
        </div>
    )
}

export default App
