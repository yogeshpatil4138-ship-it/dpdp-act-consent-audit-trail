import ConsentList from "./pages/ConsentList"

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow px-6 py-4">
        <h1 className="text-xl font-bold text-blue-800">
          DPDP Act — Consent Audit Trail
        </h1>
      </nav>

      <main className="max-w-7xl mx-auto mt-6">
        <ConsentList />
      </main>
    </div>
  )
}

export default App