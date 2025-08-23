import styles from "./Home.module.css"

//Hooks
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import PostDetail from "../../components/PostsDetail/PostDetail"



const Home = () => {
  const [query, setQuery] = useState('')
  const { documents: posts, loading } = useFetchDocuments("posts")

  const handleSubmit = (e) => {
    e.preventDefault()

    if(query){
      return Navigate(`/search?q=${query}`)
    }
  }

  return (
    <div className={styles.home}>
      <h1>Vejas os nossos posts mais recentes</h1>
      <form className={styles.search_form} onSubmit={handleSubmit}>
        <input type="text" placeholder="Ou busque por tags..." 
        onChange={(e) => setQuery(e.target.value)} />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        {console.log(posts)}
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
        {posts && posts.length === 0 &&
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn btn-dark">Criar primeiro post</Link>
          </div>
        }
      </div>
    </div>
  )
}

export default Home