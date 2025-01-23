import React, { createContext, useState, useContext, useEffect } from "react"

const CountryContext = createContext()

export const useCountry = () => useContext(CountryContext)

const countryOptions = [
  { code: "US-en", name: "United States (English)", currency: "USD", symbol: "$", locale: "en-US" },
  { code: "IN-hi", name: "India (Hindi)", currency: "INR", symbol: "₹", locale: "hi-IN" },
  { code: "IN-kn", name: "India (Kannada)", currency: "INR", symbol: "₹", locale: "kn-IN" },
  { code: "DE-de", name: "Germany (Deutsch)", currency: "EUR", symbol: "€", locale: "de-DE" },
  { code: "FR-fr", name: "France (Français)", currency: "EUR", symbol: "€", locale: "fr-FR" },
  { code: "RU-ru", name: "Russia (Русский)", currency: "RUB", symbol: "₽", locale: "ru-RU" },
]

export const CountryProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState(countryOptions[0])

  useEffect(() => {
    const savedOption = localStorage.getItem("countryOption")
    if (savedOption) {
      setSelectedOption(JSON.parse(savedOption))
    }
  }, [])

  const changeCountryOption = (optionCode) => {
    const newOption = countryOptions.find((c) => c.code === optionCode)
    if (newOption) {
      setSelectedOption(newOption)
      localStorage.setItem("countryOption", JSON.stringify(newOption))
    }
  }

  return (
    <CountryContext.Provider value={{ selectedOption, changeCountryOption, countryOptions }}>
      {children}
    </CountryContext.Provider>
  )
}

