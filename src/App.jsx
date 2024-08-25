import { useState, createContext, useEffect } from 'react'
import './App.css'
import * as authService from './services/authService'

export const AuthedUserConext = createContext(null)

function App() {
  const [user, setUser] = useState(authService.getUser())

  const handleSignOut = () =>{
    authService.signOut()
    setUser(null)
  }

  return

}
export default App
