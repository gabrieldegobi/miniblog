import { useEffect, useReducer, useState } from "react";

import { db } from '../firebase/config'
import { addDoc, collection, Timestamp } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null
}

const insertReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return { loading: true, error: null }
        case 'INSERTED_DOC':
            return { loading: false, error: null }
        case 'ERROR':
            return { loading: false, error: error.payload }
        default:
            return state
    }
}

export const useInsertDocument = (docCollection) => {
    const [response, dispath] = useReducer(insertReducer, initialState)

    //deal witj memory leak
    const [cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDispath = (action) => {
        if (!cancelled) {
            dispath(action)
        }
    }

    const insertDocument = async (document) => {
        checkCancelBeforeDispath({
            type: 'LOADING',
        })

        try {
            const newDocument = { ...document, createAt: Timestamp.now() }
            const isertedDocument = await addDoc(
                collection(db, docCollection),
                newDocument
            )

            checkCancelBeforeDispath({
                type: 'INSERTED_DOC',
                payload: isertedDocument
            })

        } catch (error) {
            checkCancelBeforeDispath({
                type: 'ERROR',
                payload: error.message
            })
        }
    }

    /*useEffect(() => {
        return () => setCancelled(true)
    }, [])
*/
    return { insertDocument, response }
}