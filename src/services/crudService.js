const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


const getProfile = async () =>{
    try {
        const res = await fetch()
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const updateProfile = async () =>{
    try {
        const res = await fetch()
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const getAllApplications = async () =>{
    try {
        const res = await fetch()
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const createApplication = async () =>{
    try {
        const res = await fetch()
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const getAnApplication = async () =>{
    try {
        const res = await fetch()
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const updateApplication = async () =>{
    try {
        const res = await fetch()
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const deleteApplication = async () =>{
    try {
        const res = await fetch()
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

export {getProfile, updateProfile, getAllApplications, createApplication, getAnApplication, updateApplication, deleteApplication}