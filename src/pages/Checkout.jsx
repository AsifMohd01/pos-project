import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const Checkout = () => {
  const navigate = useNavigate()
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCustomerInfo({ ...customerInfo, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically process the payment
    // For this example, we'll just navigate to the receipt page
    navigate("/receipt", { state: { customerInfo } })
  }

  return (
    <motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-3xl font-bold mb-4 dark:text-white not-dark:text-black">Checkout</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto dark:text-white">
        <div className="mb-4 dark:text-white">
          <label htmlFor="name" className="block text-gray-400 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            name="name"
            value={customerInfo.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-400 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Add your Email"
            id="email"
            name="email"
            value={customerInfo.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-400 font-bold mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter your mobile no."
            name="phone"
            value={customerInfo.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <motion.button
          type="submit"
          className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Complete Purchase
        </motion.button>
      </form>
    </motion.div>
  )
}

export default Checkout

