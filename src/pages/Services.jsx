import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useIntl } from "react-intl"
import { useCart } from "../context/CartContext"
import { useCountry } from "../context/CountryContext"
import { getExchangeRate, formatCurrency } from "../utils/currencyUtils"
import servicesData from "../data/services.json"
import { Search } from "lucide-react"
import { toast } from "react-toastify"

const Services = () => {
  const intl = useIntl()
  const { addToCart } = useCart()
  const { selectedOption } = useCountry()
  const [services, setServices] = useState([])
  const [filteredServices, setFilteredServices] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [exchangeRate, setExchangeRate] = useState(1)

  useEffect(() => {
    setServices(servicesData)
    setFilteredServices(servicesData)
  }, [])

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const rate = await getExchangeRate("USD", selectedOption.currency)
      setExchangeRate(rate || 1)
    }
    fetchExchangeRate()
  }, [selectedOption])

  useEffect(() => {
    const results = services.filter(
      (service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "All" || service.category === selectedCategory),
    )
    setFilteredServices(results)
  }, [searchTerm, selectedCategory, services])

  const categories = ["All", ...new Set(services.map((service) => service.category))]

  const convertPrice = (price) => {
    return price * exchangeRate
  }

  return (
    <motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        {intl.formatMessage({ id: "services.title" })}
      </h2>
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder={intl.formatMessage({ id: "services.search" })}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service) => (
          <motion.div
            key={service.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={service.image || "/placeholder.svg"} alt={service.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{service.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {formatCurrency(convertPrice(service.price), selectedOption.currency, selectedOption.locale)}
              </p>
              <button
                onClick={() => {
                    addToCart({ ...service, price: convertPrice(service.price) })
                    toast.success(service.name + " added to Cart!!")
                }}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                {intl.formatMessage({ id: "services.addToCart" })}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Services

