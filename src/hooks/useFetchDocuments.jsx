import { use, useEffect, useState } from "react";

import {
    collection,//definir a coleção
    query,//criar uma consulta, pegar os dados
    getDocs,//buscar os documentos
    orderBy,//ordenar os documentos
    onSnapshot,//   
    where// filtrar os documentos
} from "firebase/firestore";

import { db } from "../firebase/config";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
    const [documents, setDocuments] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        async function loadData(params) {
            if (cancelled) return;
            setLoading(true);

            const collectionRef = collection(db, docCollection);
            try {
                let q;


                //pegar todos os dados pela ondem de criação decrescente

                q = await query(
                    collectionRef,
                    orderBy("createdAt", "desc")
                );

                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data()
                        }))
                    )
                })
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError("Erro ao buscar os documentos");
                setLoading(false);
            }

        }
        loadData();
    }, [docCollection, search, uid, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { documents, loading, error };
}