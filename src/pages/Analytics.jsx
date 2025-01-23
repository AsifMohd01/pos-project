import React from "react"
import { motion } from "framer-motion"
import { useIntl } from "react-intl"
import { useCart } from "../context/CartContext"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const Analytics = () => {
  const intl = useIntl()
  const { analytics, cart } = useCart()

  const chartData = cart.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    revenue: item.price * item.quantity,
  }))

  return (
    <motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        {intl.formatMessage({ id: "analytics.title" })}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
            {intl.formatMessage({ id: "analytics.totalRevenue" })}
          </h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">${analytics.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
            {intl.formatMessage({ id: "analytics.servicesSold" })}
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{analytics.servicesSold}</p>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          {intl.formatMessage({ id: "analytics.salesByService" })}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="quantity"
              fill="#8884d8"
              name={intl.formatMessage({ id: "analytics.quantity" })}
            />
            <Bar
              yAxisId="right"
              dataKey="revenue"
              fill="#82ca9d"
              name={intl.formatMessage({ id: "analytics.revenue" })}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default Analytics

