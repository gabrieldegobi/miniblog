import { useEffect, useReducer, useState } from "react";

import { db } from '../firebase/config'
import { updateDoc,doc } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null
}

const updateReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return { loading: true, error: null }
        case 'UPDATED_DOC':
            return { loading: false, error: null }
        case 'ERROR':
            return { loading: false, error: error.payload }
        default:
            return state
    }
}

export const useUpdateDocument = (docCollection) => {
    const [response, dispath] = useReducer(updateReducer, initialState)

    //deal witj memory leak
    const [cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDispath = (action) => {
        if (!cancelled) {
            dispath(action)
        }
    }

    const updateDocument = async (id,data) => {
        checkCancelBeforeDispath({
            type: 'LOADING',
        })

        try {
            
            const docRef = await doc(db,docCollection,id)

            const updatedDocument = await updateDoc(docRef,data)

            checkCancelBeforeDispath({
                type: 'UPDATED_DOC',
                payload: updateDoc
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
    return { updateDocument, response }
}