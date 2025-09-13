import { useNavigate, useParams } from 'react-router-dom'
import style from './EditPost.module.css'

import { useEffect, useState } from 'react'
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'




const EditPost = () => {
  const { id } = useParams()
  const { document: post } = useFetchDocument('posts', id)

  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState('')
  const { user } = useAuthValue()


  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setBody(post.body)
      setImage(post.image)

      const textTags = post.tagsArray.join(', ')
      setTags(textTags)
    }
  }, [post])



  const { updateDocument, response } = useUpdateDocument('posts')

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

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }

    updateDocument(id,data)


    //Redirect to home page
    navegate("/dashboard")
  }


  return (
    <div className={style.edit_post}>
      {post && (
        <>
          <h2>Editando Post: {post.title} </h2>
          <p>Altere os dados do post como desejar</p>
          <form onSubmit={handleSubmit}>
            <label>
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
            <p className={style.preview_title}>Preview da imagem atual:</p>
            <img className={style.preview_image} src={post.image} alt={post.title} />
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
            {!response.loading && <button className='btn'>Editar</button>}
            {response.loading && <button className='btn'>Editando</button>}
            {response.error && <p className='error'>{response.error}</p>}
            {formError && <p className='error'>{formError}</p>}
          </form>
        </>
      )}
    </div>
  )
}

export default EditPost