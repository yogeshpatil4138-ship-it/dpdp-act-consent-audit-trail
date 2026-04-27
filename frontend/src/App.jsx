import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import ConsentList from "./pages/ConsentList"
import ConsentForm from "./pages/ConsentForm"
import ConsentDetail from "./pages/ConsentDetail"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"

function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1
        className="text-xl font-bold text-blue-800 cursor-pointer"
        onClick={() => navigate("/")}
      >
        DPDP Act — Consent Audit Trail
      </h1>
      <div className="flex items-center gap-4">
        {user && (
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-gray-600 hover:text-blue-700 font-medium"
          >
            Dashboard
          </button>
        )}
        {user && (
          <span className="text-sm text-gray-500">
            Welcome, {user.username}
          </span>
        )}
        {user && (
          <button
            onClick={() => navigate("/create")}
            className="bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-800"
          >
            + New Record
          </button>
        )}
        {user && (
          <button
            onClick={handleLogout}
            className="border px-4 py-2 rounded text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="max-w-7xl mx-auto mt-6">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <ConsentList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <ConsentForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit/:id"
                element={
                  <ProtectedRoute>
                    <ConsentForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/detail/:id"
                element={
                  <ProtectedRoute>
                    <ConsentDetail />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App