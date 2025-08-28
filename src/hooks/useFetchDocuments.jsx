import { useEffect, useState } from "react";

import {
    collection,//definir a coleção
    query,//criar uma consulta, pegar os dados
    getDocs,//buscar os documentos
    orderBy,//ordenar os documentos
    onSnapshot, //
    where// filtrar os documentos
} from "firebase/firestore";

import { db } from "../firebase/config";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
    const [documents, setDocuments] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {

        async function loadData(params) {
            //se estiver cancelado nos paramos aqui a fução
            if (cancelled) return;

            setLoading(true);
            //passamos o banco de dados e a coleção que vem como argumento
            const collectionRef = await collection(db, docCollection);
            try {
                let q;

                //pegar todos os dados pela ondem de criação decrescente
                //criando a busca de dados mais simples, pegando os dados pela ordem de criação decrescente

                if (search) {
                    //array-contains  -- parâmetro
                    //para fazer o filtro de busca
                    q = await query(
                        collectionRef,//pega a coleção
                        where("tagsArray", "array-contains", search),//were('onde se fara a busca','metodo','o que estou buscando')
                        //como as tags sao array, temos o acesso a um parametro do firebase
                        orderBy("createAt", "desc"))//aqui somente colocamos em ordem
                } else {
                    q = await query(
                        collectionRef,
                        orderBy("createAt", "desc"));
                }

                //mapear meus dados, sempre que for alterado, ele irá trazer esse dado novamente
                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        //o id vem separado dos dados
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

    //limpeza de memoria
    //nao vai carregando os dados desse componente quando ele carregar
    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { documents, loading, error };
}