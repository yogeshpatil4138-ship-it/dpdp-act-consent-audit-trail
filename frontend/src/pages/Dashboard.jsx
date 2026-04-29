import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from "recharts"
import api from "../services/api"

function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/consent-records/stats")
      .then((res) => {
        setStats(res.data)
        setLoading(false)
      })
      .catch(() => {
        // use dummy data if backend not ready yet
        setStats({
          total: 0,
          granted: 0,
          revoked: 0,
          pending: 0,
          expired: 0
        })
        setLoading(false)
      })
  }, [])

  const chartData = stats ? [
    { name: "Granted", value: stats.granted, color: "#16a34a" },
    { name: "Pending", value: stats.pending, color: "#ca8a04" },
    { name: "Revoked", value: stats.revoked, color: "#dc2626" },
    { name: "Expired", value: stats.expired, color: "#6b7280" },
  ] : []

  const kpiCards = stats ? [
    {
      label: "Total Records",
      value: stats.total,
      color: "text-blue-700",
      bg: "bg-blue-50",
      border: "border-blue-200"
    },
    {
      label: "Granted",
      value: stats.granted,
      color: "text-green-700",
      bg: "bg-green-50",
      border: "border-green-200"
    },
    {
      label: "Revoked",
      value: stats.revoked,
      color: "text-red-700",
      bg: "bg-red-50",
      border: "border-red-200"
    },
    {
      label: "Pending",
      value: stats.pending,
      color: "text-yellow-700",
      bg: "bg-yellow-50",
      border: "border-yellow-200"
    },
  ] : []

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={() => navigate("/")}
          className="text-sm text-blue-700 hover:underline"
        >
          View All Records →
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4">
        {kpiCards.map((card) => (
          <div
            key={card.label}
            className={`${card.bg} ${card.border} border rounded-lg p-5`}
          >
            <p className="text-sm text-gray-500 mb-1">{card.label}</p>
            <p className={`text-3xl font-bold ${card.color}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-base font-semibold text-gray-700 mb-4">
          Consent Status Breakdown
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 13 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 13 }} />
            <Tooltip />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Dashboard