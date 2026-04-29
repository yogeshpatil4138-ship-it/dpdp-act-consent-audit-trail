import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // check if user is already logged in from a previous session
    const token = localStorage.getItem("token")
    const username = localStorage.getItem("username")
    return token ? { username } : null
  })

  const login = (token, username) => {
    // save to localStorage so login persists on page refresh
    localStorage.setItem("token", token)
    localStorage.setItem("username", username)
    setUser({ username })
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// custom hook so any component can access auth state easily
export function useAuth() {
  return useContext(AuthContext)
}