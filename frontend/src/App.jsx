import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import ConsentList from "./pages/ConsentList"
import ConsentForm from "./pages/ConsentForm"

function Navbar() {
  const navigate = useNavigate()
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1
        className="text-xl font-bold text-blue-800 cursor-pointer"
        onClick={() => navigate("/")}
      >
        DPDP Act — Consent Audit Trail
      </h1>
      <button
        onClick={() => navigate("/create")}
        className="bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-800"
      >
        + New Record
      </button>
    </nav>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto mt-6">
          <Routes>
            <Route path="/" element={<ConsentList />} />
            <Route path="/create" element={<ConsentForm />} />
            <Route path="/edit/:id" element={<ConsentForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App