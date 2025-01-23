import React from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { useIntl } from "react-intl"
import { useCart } from "../context/CartContext"


import { useCountry } from "../context/CountryContext"
import { ShoppingCart } from "lucide-react"




const Navbar = () => {
  const intl = useIntl()
  const { cart } = useCart()
 
  const { selectedOption, changeCountryOption, countryOptions } = useCountry()
  const location = useLocation();
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)


  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <motion.h1
          className="text-2xl font-bold text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {intl.formatMessage({ id: "app.title" })}
        </motion.h1>
        <div className="flex items-center space-x-4">
          <NavItem to="/">{intl.formatMessage({ id: "nav.services" })}</NavItem>
          <NavItem to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemsCount}
              </span>
            )}
          </NavItem>
          <NavItem to="/analytics">{intl.formatMessage({ id: "nav.analytics" })}</NavItem>
     
        { (location.pathname === "/" || location.pathname === "/receipt" ) &&  
       
        <select
            value={selectedOption.code}
            onChange={(e) => changeCountryOption(e.target.value)}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded px-2 py-1"
          >
            {countryOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.name}
              </option>
            ))}
        </select>
        }


         
        </div>
      </div>
    </nav>
  )
}


const NavItem = ({ to, children, className = "" }) => (
  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
    <Link
      to={to}
      className={`text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors ${className}`}
    >
      {children}
    </Link>
  </motion.div>
)


export default Navbar
