import { useState } from 'react'
import NavBar from '../NavBar/NavBar'
import SignInForm from '../SignInForm/SignInForm'
import SignUpForm from '../SignUpForm/SignUpForm'
import LandingPageBody from '../LandingPageBody/LangingPageBody'
import PopoutForm from '../PopoutForm/PopoutForm'

const LandingPage = ({ onAuthentication }) => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const handleSignIn = (user) => {
    if (user) {
      onAuthentication(user);  // This calls the function from App.jsx
      setIsSignInOpen(false);
    }
  };

  const handleSignUp = (response) => {
    if (response && response.token) {
      const user = JSON.parse(atob(response.token.split('.')[1]));
      onAuthentication(user);  // This calls the function from App.jsx
      setIsSignUpOpen(false);
    } else {
      console.error('Sign up successful but no token received');
      // You might want to handle this case, perhaps by showing an error message
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar 
        onSignInClick={() => setIsSignInOpen(true)} 
        onSignUpClick={() => setIsSignUpOpen(true)} 
      />
      <LandingPageBody />
      <PopoutForm isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} title="Sign In">
        <SignInForm onSignIn={handleSignIn} />
      </PopoutForm>
      <PopoutForm isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} title="Sign Up">
        <SignUpForm onSignUp={handleSignUp} />
      </PopoutForm>
    </div>
  );
};

export default LandingPage;