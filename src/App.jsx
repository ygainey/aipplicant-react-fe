import { useState, createContext, useEffect } from 'react'
import './App.css'
import * as authService from './services/authService'
import LandingPage from './components/LandingPage/LandingPage'
import AppPage from './components/AppPage/AppPage'

export const AuthedUserContext = createContext(null)

function App() {
  const [user, setUser] = useState(null)

  const handleAuthentication = (authenticatedUser) => {
    setUser(authenticatedUser);
    console.log('you signed in')
  };

  return(
    <AuthedUserContext.Provider value={user}>
      <div className="App">
        {user ? (
          <AppPage user={user} setUser={setUser}/>
        ) : (
          <LandingPage onAuthentication={handleAuthentication} />
        )}
      </div>
    </AuthedUserContext.Provider>
  )

}
export default App
