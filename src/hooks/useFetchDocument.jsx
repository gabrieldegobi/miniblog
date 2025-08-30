import { useEffect, useState } from "react";

import {
    doc,getDoc
} from "firebase/firestore";

import { db } from "../firebase/config";

export const useFetchDocument = (docCollection,id) => {
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {

        async function loadDocument(params) {
            //se estiver cancelado nos paramos aqui a fução
            if (cancelled) return;

            setLoading(true);

            try {
                //pegar uma referencia do documento
                const docRef = await doc(db,docCollection,id)
                //achamos a referencia agora temos que pegar um snap
                const docSnap = await getDoc(docRef)

                setDocument(docSnap.data())
                
                setLoading(false)
            } catch (error) {
                setError(erro.message)
                setLoading(false)
            }

        }
        loadDocument();
    }, [docCollection, id]);

    //limpeza de memoria
    //nao vai carregando os dados desse componente quando ele carregar
    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { document, loading, error };
}