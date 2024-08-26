import { useState, createContext, useEffect } from 'react'
import './App.css'
import * as authService from './services/authService'
import LandingPage from './components/LandingPage/LandingPage'

export const AuthedUserConext = createContext(null)

function App() {
  const [user, setUser] = useState(null)

  const handleSignOut = () =>{
    authService.signOut()
    setUser(null)
  }
  const handleAuthentication = (authenticatedUser) => {
    setUser(authenticatedUser);
    console.log('you signed in')
  };

  return(
    <div className="App">
      {user ? (
        <div>Welcome, {user.username}!</div> // Or your authenticated app content
      ) : (
        <LandingPage onAuthentication={handleAuthentication} />
      )}
    </div>
  )

}
export default App
