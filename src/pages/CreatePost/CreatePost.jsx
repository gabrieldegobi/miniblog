import { useNavigate } from 'react-router-dom'
import style from './createPost.module.css'

import { useState } from 'react'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsetDocuments'


const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState('')
  const { user } = useAuthValue()

  const { insertDocument, response } = useInsertDocument('posts')

  const navegate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError('')

    //validate image URL
    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.")
      return
    }

    //cria o array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

    //checar todos os valores
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os Campos!")
    }

    //se tiver um erro retornamos vazio para nao proseguir
    

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    //Redirect to home page
    navegate("/")
  }


  return (
    <div className={style.create_post}>
      <h2>Criar Post</h2>
      <p>Escreva sobre o quei quiser e compartilhe o seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <label >
          <span>Título</span>
          <input
            type="text"
            name='Title'
            required placeholder='Pense num bom título...'
            onChange={(e) => { setTitle(e.target.value) }}
            value={title}
          />
        </label>
        <label >
          <span>URL da Imagem</span>
          <input
            type="text"
            name='Image'
            required placeholder='Insira uma imagem que represente o seu post'
            onChange={(e) => { setImage(e.target.value) }}
            value={image}
          />
        </label>
        <label >
          <span>Conteúdo:</span>
          <textarea
            name="body"
            required
            placeholder='Insira o conteudo do post'
            onChange={(e) => { setBody(e.target.value) }}
            value={body}
          ></textarea>
        </label>
        <label >
          <span>Tags</span>
          <input
            type="text"
            name='tags'
            required placeholder='Insira as tags separadas por virgula'
            onChange={(e) => { setTags(e.target.value) }}
            value={tags}
          />
        </label>
        {!response.loading && <button className='btn'>Cadastrar</button>}
        {response.loading && <button className='btn'>Cadastrar...</button>}
        {response.error && <p className='error'>{response.error}</p>}
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost