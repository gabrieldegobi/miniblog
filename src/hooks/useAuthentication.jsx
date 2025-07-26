import { db } from '../firebase/config'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'
import { data } from 'react-router-dom'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)


    //cleanup
    //deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()
    console.log(auth)

    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }


    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError()

        try {
            //criando usuário
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )


            //atualizando nome de usuário
            await updateProfile(user, {
                displayName: data.displayName
            })
            setLoading(false)
            return user

        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)


            //tratando erros para mostar ao usuário
            let systemErrorMessage

            if (error.message.includes('password')) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres"
            } else if (error.message.includes('email-already')) {
                systemErrorMessage = "Email já cadastrado."
            } else if (error.message.includes('invalid-email')) {
                systemErrorMessage = "Email-invalido"
            } else {
                systemErrorMessage = "ocorreu um erro, por favor tente mais tarde."
            }
            setLoading(false)

            setError(systemErrorMessage)
        }
    }

    //logout  -  sign out
    const logout = () => {
        checkIfIsCancelled()
        signOut(auth)
    }

    //login  - sign in

    const login = async (data) => {
        checkIfIsCancelled()
        setLoading(true)
        setError(false)

        try {
            await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password)
            setLoading(false)

        } catch (error) {

            let systemErrorMessage

            if (error.message.includes('auth/invalid-credential')) {
                systemErrorMessage = "Credencial invalida, verifique O E-mail e Senha."
            }
            setError(systemErrorMessage)
            setLoading(false)

        }


    }

    useEffect(() => setCancelled(true), [])

    return {
        auth, createUser, error, loading, logout, login
    }

}