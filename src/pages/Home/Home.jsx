import styles from "./Home.module.css"

//Hooks
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'



const Home = () => {
  const [query, setQuery] = useState('')
  const [posts, setPosts] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className={styles.home}>
      <h1>Vejas os nossos posts mais recentes</h1>
      <form className={styles.search_form} onSubmit={handleSubmit}>
        <input type="text" placeholder="Ou busque por tags..." onChange={(e) => setQuery(e.target.value)} />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        <h1>posts...</h1>
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