const API_KEY = "a2c376ee76512dc298558fb2" // Replace with your actual API key

export async function getExchangeRate(from, to) {
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`)
    const data = await response.json()
    return data.conversion_rates[to]
  } catch (error) {
    console.error("Error fetching exchange rate:", error)
    return null
  }
}

export function formatCurrency(amount, currency, locale) {
  return new Intl.NumberFormat(locale, { style: "currency", currency: currency }).format(amount)
}

