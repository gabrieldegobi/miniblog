import { useEffect, useReducer, useState } from "react";

import { db } from '../firebase/config'
import { doc,deleteDoc } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null
}

const deletedReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return { loading: true, error: null }
        case 'DELETED_DOC':
            return { loading: false, error: null }
        case 'ERROR':
            return { loading: false, error: error.payload }
        default:
            return state
    }
}

export const useDeleteDocument = (docCollection) => {
    const [response, dispath] = useReducer(deletedReducer, initialState)

    //deal witj memory leak
    const [cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDispath = (action) => {
        if (!cancelled) {
            dispath(action)
        }
    }

    const deleteDocument = async (id) => {
        checkCancelBeforeDispath({
            type: 'LOADING',
        })

        try {
            const deletedDocument = await deleteDoc(doc(docCollection,id))

            checkCancelBeforeDispath({
                type: 'DELETED_DOC',
                payload: deleteDocument
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
    return { deleteDocument, response }
}