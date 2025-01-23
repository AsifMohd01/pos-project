import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useIntl } from "react-intl"
import { useCart } from "../context/CartContext"
import { Plus, Minus, Trash2 } from "lucide-react"
import { formatCurrency } from "../utils/currencyUtils"
import { useCountry } from "../context/CountryContext"

const Cart = () => {
  const intl = useIntl()
  const { cart, removeFromCart, updateQuantity } = useCart()
  const { selectedOption } = useCountry()
  
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        {intl.formatMessage({ id: "cart.title" })}
      </h2>
      {cart.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">{intl.formatMessage({ id: "cart.empty" })}</p>
      ) : (
        <>
          {cart.map((item) => (
            <motion.div
              key={item.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4 flex justify-between items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {/* {intl.formatMessage({ id: "cart.price" }, { price: item.price })} */}
                      {formatCurrency(item.price, selectedOption.currency, selectedOption.locale)}
                   
                      
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="mx-2 text-gray-800 dark:text-white">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <Plus className="w-5 h-5" />
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
          <div className="mt-4 text-xl font-bold text-gray-800 dark:text-white">
           
            {formatCurrency(total.toFixed(2), selectedOption.currency, selectedOption.locale)}
          </div>
          <Link to="/checkout">
            <motion.button
              className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {intl.formatMessage({ id: "cart.checkout" })}
            </motion.button>
          </Link>
        </>
      )}
    </motion.div>
  )
}

export default Cart

