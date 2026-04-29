import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function ProtectedRoute({ children }) {
  const { user } = useAuth()

  // if user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // if logged in, render the actual page
  return children
}

export default ProtectedRoute