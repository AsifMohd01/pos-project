import React from "react"
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { useIntl } from "react-intl"
import { useCart } from "../context/CartContext"
import { useCountry } from "../context/CountryContext"
import { formatCurrency } from "../utils/currencyUtils"
import { Download } from "lucide-react"

const Receipt = () => {
  const location = useLocation()
  const { customerInfo } = location.state || {}
  const intl = useIntl()
  const { cart } = useCart()
  const { selectedOption } = useCountry()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const generateReceiptContent = () => {
    let content = `Receipt\n\n`
    content += `Date: ${new Date().toLocaleString(selectedOption.locale)}\n\n`
    content += `Customer Information:\n`
    content += `Name: ${customerInfo?.name}\n`
    content += `Email: ${customerInfo?.email}\n`
    content += `Phone: ${customerInfo?.phone}\n\n`
    content += `Items:\n`
    cart.forEach((item) => {
      content += `${item.name} x${item.quantity}: ${formatCurrency(item.price * item.quantity, selectedOption.currency, selectedOption.locale)}\n`
    })
    content += `\nTotal: ${formatCurrency(total, selectedOption.currency, selectedOption.locale)}\n`
    return content
  }

  const downloadReceipt = () => {
    const content = generateReceiptContent()
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "receipt.txt"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          {intl.formatMessage({ id: "receipt.title" })}
        </h2>
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            <strong>{intl.formatMessage({ id: "receipt.date" })}:</strong>{" "}
            {new Date().toLocaleString(selectedOption.locale)}
          </p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
            {intl.formatMessage({ id: "receipt.customerInfo" })}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>{intl.formatMessage({ id: "receipt.name" })}:</strong> {customerInfo?.name}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>{intl.formatMessage({ id: "receipt.email" })}:</strong> {customerInfo?.email}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>{intl.formatMessage({ id: "receipt.phone" })}:</strong> {customerInfo?.phone}
          </p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
            {intl.formatMessage({ id: "receipt.items" })}
          </h3>
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left text-gray-800 dark:text-white">
                  {intl.formatMessage({ id: "receipt.item" })}
                </th>
                <th className="text-right text-gray-800 dark:text-white">
                  {intl.formatMessage({ id: "receipt.price" })}
                </th>
                <th className="text-right text-gray-800 dark:text-white">
                  {intl.formatMessage({ id: "receipt.quantity" })}
                </th>
                <th className="text-right text-gray-800 dark:text-white">
                  {intl.formatMessage({ id: "receipt.subtotal" })}
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index} className="border-b dark:border-gray-700">
                  <td className="text-gray-600 dark:text-gray-300">{item.name}</td>
                  <td className="text-right text-gray-600 dark:text-gray-300">
                    {formatCurrency(item.price, selectedOption.currency, selectedOption.locale)}
                  </td>
                  <td className="text-right text-gray-600 dark:text-gray-300">{item.quantity}</td>
                  <td className="text-right text-gray-600 dark:text-gray-300">
                    {formatCurrency(item.price * item.quantity, selectedOption.currency, selectedOption.locale)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-right text-xl font-bold text-gray-800 dark:text-white">
          {intl.formatMessage({ id: "receipt.total" })}:{" "}
          {formatCurrency(total, selectedOption.currency, selectedOption.locale)}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={downloadReceipt}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center justify-center mx-auto"
          >
            <Download className="w-5 h-5 mr-2" />
            {intl.formatMessage({ id: "receipt.download" })}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default Receipt

