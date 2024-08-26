const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

// const getUser = () => {
//     const token = localStorage.getItem('token')
//     if (!token) return null
//     const user = JSON.parse(atob(token.split('.')[1]))
//     return user
// }

const signUp = async (formData) =>{
    try {
        const res = await fetch(`${BACKEND_URL}auth/sign-up/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })
        const resBody = await res.json()
        if (resBody.error){throw new Error(resBody.error)}
        localStorage.setItem('token', resBody.access)
        return resBody
    } catch (error) {
        throw new Error({error: error.message })
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
        if (resBody.access){
            localStorage.setItem('token', resBody.access)
            const user = JSON.parse(atob(resBody.access.split('.')[1]))
            return user
        }
    } catch (error) {
        throw new Error({ error: error.message })
    }
}

const getUser = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const parts = token.split('.');
        if (parts.length !== 3) throw new Error('Invalid token format'); 

        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        
        // Add padding if necessary
        const base64Padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');

        const decodedPayload = decodeURIComponent(
            atob(base64Padded)
                .split('')
                .map((c) => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );

        const user = JSON.parse(decodedPayload);
        return user;
    } catch (e) {
        console.error('Invalid token or decoding error:', e.message);
        return null;
    }
};

// const signUp = async (formData) => {
//     try {
//         const res = await fetch(`${BACKEND_URL}auth/sign-up/`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(formData),
//         });

//         const resBody = await res.json();
//         if (resBody.error) throw new Error(resBody.error);
//         if (!resBody.token) throw new Error('No token received from server during sign-up');

//         localStorage.setItem('token', resBody.token);
//         return resBody;
//     } catch (error) {
//         console.error('Sign-up error:', error.message);
//         throw error;
//     }
// };

// const signIn = async (user) => {
//     try {
//         const res = await fetch(`${BACKEND_URL}auth/sign-in/`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(user),
//         });

//         const resBody = await res.json();
//         if (!res.ok) throw new Error(resBody.error || 'Sign-in failed.');

//         if (resBody.token) {
//             localStorage.setItem('token', resBody.token);

//             const parts = resBody.token.split('.');
//             if (parts.length !== 3) throw new Error('Invalid token format received from server.');

//             const base64Url = parts[1];
//             const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//             const decodedPayload = decodeURIComponent(
//                 atob(base64)
//                     .split('')
//                     .map((c) => {
//                         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//                     })
//                     .join('')
//             );

//             const user = JSON.parse(decodedPayload);
//             return user;
//         } else {
//             throw new Error('No token received from the server. Please try again.');
//         }
//     } catch (error) {
//         console.error('Sign-in error:', error.message);
//         throw error;
//     }
// };

const signOut = () =>{
    localStorage.removeItem('token')
}

export {getUser, signOut, signUp, signIn}