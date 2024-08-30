import { useState, createContext, useEffect } from 'react'
import './App.css'
import * as authService from './services/authService'
import * as crudService from './services/crudService'
import { useNavigate } from 'react-router-dom'
import PopoutForm from './components/PopoutForm/PopoutForm'
import SignInForm from './components/SignInForm/SignInForm'
import SignUpForm from './components/SignUpForm/SignUpForm'
import NavBar from './components/NavBar/NavBar'
import LandingPageBody from './components/LandingPageBody/LangingPageBody'
import AuthNavbar from './components/AuthNavbar/AuthNavbar'
import Board from './components/Board/Board'

export const AuthedUserContext = createContext(null)

function App() {
  const [user, setUser] = useState(authService.getUser())
  //const [user, setUser] = useState(null)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [applications, setApplications] = useState([])
  const [filter, setFilter] = useState('All')


  useEffect(() => {
    if (user) {
      fetchApplications()
    }
  }, [user])

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const apps = await crudService.getAllApplications()
        setApplications(apps)
      } catch (error) {
        console.error('Failed to fetch applications:', error)
      }
    }
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    const apps = await crudService.getAllApplications()
    setApplications(apps)
  }

  const handleAddApplication = async (applicationData) => {
    const createdApplication = await crudService.createApplication(applicationData)
    setApplications(prevApplications => [...prevApplications, createdApplication])
    return createdApplication
  }

  const handleUpdateApplication = async (updatedApplication) => {
    const updated = await crudService.updateApplication(updatedApplication.id, updatedApplication);
    setApplications(prevApplications =>
      prevApplications.map(app =>
        app.id === updated.id ? updated : app
      )
    )
    return updated
  }

  const handleDeleteApplication = async (id) => {
    await crudService.deleteApplication(id)
    setApplications(prevApplications =>
      prevApplications.filter(app => app.id !== id)
    )
  }

  const handleSignOut = () => {
    authService.signOut()
    setUser(null)
  }

  const addApplication = (newApplication) => {
    setApplications(prevApplications => [...prevApplications, newApplication]);
  }

  // const filteredApplications = applications.filter(app =>
  //   filter === 'All' || app.status.toLowerCase() === filter.toLowerCase()
  // )

  return (
    <AuthedUserContext.Provider value={user}>
      <div className="App">
        {user ? (
          <div className="flex bg-gray-900 text-white h-screen">
            <AuthNavbar
              onFilterChange={setFilter}
              onSignOut={handleSignOut}
              userName={user.username}
            />
            <Board
              // applications={filteredApplications}
              onAddApplication={handleAddApplication}
              onUpdateApplication={handleUpdateApplication}
              onDeleteApplication={handleDeleteApplication}
              applications={applications}
              addApplication={addApplication}
            />
          </div>
        ) : (
          <div className="min-h-screen bg-gray-900">
            <NavBar
              onSignInClick={() => setIsSignInOpen(true)}
              onSignUpClick={() => setIsSignUpOpen(true)}
            />
            <LandingPageBody onSignUpClick={() => setIsSignUpOpen(true)} />
            <PopoutForm isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} title="Sign In">
              <SignInForm setUser={setUser} setIsSignInOpen={setIsSignInOpen} />
            </PopoutForm>
            <PopoutForm isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} title="Sign Up">
              <SignUpForm setUser={setUser} setIsSignUpOpen={setIsSignUpOpen} />
            </PopoutForm>
          </div>
        )}
      </div>
    </AuthedUserContext.Provider>
  )

}
export default App
