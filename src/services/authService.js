const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const getUser = () => {
    const token = localStorage.getItem('token')
    if (!token) return null
    const user = JSON.parse(atob(token.split('.')[1]))
    return user
}

const signUp = async (formData) =>{
    try {
        const res = await fetch(`${BACKEND_URL}auth/sign-up/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })
        const resBody = await res.json()
        
        if (resBody.error){throw new Error(resBody.error)}
        localStorage.setItem('token', resBody.token)
        return resBody
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error(error.message || 'An unexpected error occurred. Please try again.')
    }
}

const signIn = async (user) =>{
    try {
        const res = await fetch(`${BACKEND_URL}auth/sign-in/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })

        const resBody = await res.json()

        if (resBody.error){throw new Error(resBody.error)}
        
        if (resBody.token){
            localStorage.setItem('token', resBody.token)
            const user = JSON.parse(atob(resBody.token.split('.')[1]))
            return user
        }else{
            throw new Error('No token received from the server. Please try again.')
        }
    } catch (error) {
        if (error instanceof Error) {
            throw error
        }
        throw new Error(error.message || 'An unexpected error occurred. Please try again.')
    }
}

const signOut = () =>{
    localStorage.removeItem('token')
}

export {getUser, signOut, signUp, signIn}