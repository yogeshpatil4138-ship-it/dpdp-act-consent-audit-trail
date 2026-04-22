import { useEffect, useState } from "react"
import api from "../services/api"

function ConsentList() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // fetch all consent records when page loads
  useEffect(() => {
    api.get("/consent-records")
      .then((res) => {
        setRecords(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to fetch records:", err)
        setError("Could not load consent records.")
        setLoading(false)
      })
  }, [])

  // loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading records...</p>
      </div>
    )
  }

  // error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    )
  }

  // empty state
  if (records.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400 text-lg">No consent records found.</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Consent Records
      </h1>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Principal Name</th>
              <th className="px-4 py-3">Fiduciary</th>
              <th className="px-4 py-3">Purpose</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created At</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr
                key={record.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">{record.id}</td>
                <td className="px-4 py-3">{record.dataPrincipalName}</td>
                <td className="px-4 py-3">{record.dataFiduciaryName}</td>
                <td className="px-4 py-3">{record.purpose}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${record.consentStatus === "GRANTED" ? "bg-green-100 text-green-700" : ""}
                    ${record.consentStatus === "REVOKED" ? "bg-red-100 text-red-700" : ""}
                    ${record.consentStatus === "PENDING" ? "bg-yellow-100 text-yellow-700" : ""}
                    ${record.consentStatus === "EXPIRED" ? "bg-gray-100 text-gray-600" : ""}
                  `}>
                    {record.consentStatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {new Date(record.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ConsentList