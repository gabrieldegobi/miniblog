import { useEffect, useState } from "react";

import {
    doc,getDoc
} from "firebase/firestore";

import { db } from "../firebase/config";

export const useFetchDocument = (docCollection) => {
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

            

        }
        loadDocument();
    }, [docCollection, search, uid, cancelled]);

    //limpeza de memoria
    //nao vai carregando os dados desse componente quando ele carregar
    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { document, loading, error };
}