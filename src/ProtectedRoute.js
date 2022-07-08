import React from "react"
import {Navigate, Route} from 'react-router-dom'

export default function ProtectedRoute({children}){
    const isAuthenticated = (() => {
        let authenticted = sessionStorage.getItem("appIdToken") && 
        sessionStorage.getItem("appExpiresIn") &&
        (+(sessionStorage.getItem("appExpiresIn")) + (60*5*1000) > Date.now())
        console.log("Authenticate",authenticted)
        if(!authenticted){
            sessionStorage.removeItem("appIdToken")
            sessionStorage.removeItem("appExpiresIn")
        }
        return authenticted
    })()
    return(
        isAuthenticated ? children : <Navigate to="/login" replace />
    )
}