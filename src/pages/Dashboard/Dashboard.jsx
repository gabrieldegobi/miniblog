import { Link } from 'react-router-dom'
import style from './dashboard.module.css'

import { useAuthValue } from '../../context/AuthContext'  //para pegarmos os dados do usuário
import { useFetchDocuments } from '../../hooks/useFetchDocuments' //para pegarmos os itens do usuário
import { useDeleteDocument } from '../../hooks/useDeleteDocument'

const Dashboard = () => {
    const { user } = useAuthValue() //Pegando os dados do usuário
    const uid = user.uid //Pegando o ID do usuário
    const { documents: posts, loading, error } = useFetchDocuments('posts', null, uid)

    const {deleteDocument,response} = useDeleteDocument('posts')

  

    if(loading){
        return <p>Carregando...</p>
    }
    return (
        <div className={style.dashboard}>
            <h2>Dashboard</h2>
            <p>Gerencie os seus Posts</p>

            {posts && posts.length == 0 ? (
                <div className={style.noposts}>
                    <p>Nao foi encontrados posts</p>
                    <Link to='/posts/create' className='btn'>
                        Criar primeiro post
                    </Link>
                </div>
            ) : (
                <>
                    <div className={style.post_header}>
                        <span>Título</span>
                        <span>Ações</span>
                    </div>
                    
                    {posts && posts.map((post) => <div key={post.id} className={style.post_row}>
                        <p>{post.title}</p>
                        <div>
                            <Link to={`/post/${post.id}`} className='btn btn-outline'>
                                Ver
                            </Link>
                            <Link to={`/posts/edit/${post.id}`} className='btn btn-outline'>
                                Editar
                            </Link>
                            <button onClick={() => deleteDocument(post.id)} className='btn btn-outline btn-danger'>
                                {response.loading?'Excluindo':'Excluir'}
                            </button>
                        </div>

                    </div>)}
                </>
            )}

        </div>
    )
}

export default Dashboard