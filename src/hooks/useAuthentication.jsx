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


    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }


    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

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
            }else if(error.message.includes('invalid-email')){
                systemErrorMessage="Email-invalido"
            } else {
                systemErrorMessage = "ocorreu um erro, por favor tente mais tarde."
            }
            setLoading(false)

            setError(systemErrorMessage)
        }
    }

    useEffect(() => setCancelled(true), [])

    return {
        auth, createUser, error, loading
    }

}