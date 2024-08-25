const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


const getProfile = async () =>{ //done
    try {
        const res = await fetch(`${BACKEND_URL}profile/`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const updateProfile = async (profileForm) =>{ //done
    try {
        const res = await fetch(`${BACKEND_URL}profile/`, {
            method: 'PUT',
            headers: {Authorization : `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json'},
            body: JSON.stringify(profileForm)
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const getAllApplications = async () =>{ //done
    try {
        const res = await fetch(`${BACKEND_URL}application/`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const createApplication = async (appForm) =>{ //done
    try {
        const res = await fetch(`${BACKEND_URL}application/`,{
            method: 'POST',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(appForm)
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const getAnApplication = async (appID) =>{ //done
    try {
        const res = await fetch(`${BACKEND_URL}application/${appID}/`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const updateApplication = async (appID, appForm) =>{ //done
    try {
        const res = await fetch(`${BACKEND_URL}application/${appID}/`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(appForm)
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const deleteApplication = async (appID) =>{ //done
    try {
        const res = await fetch(`${BACKEND_URL}application/${appID}/`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

export {getProfile, updateProfile, getAllApplications, createApplication, getAnApplication, updateApplication, deleteApplication}