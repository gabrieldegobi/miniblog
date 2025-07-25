import { useAuthentication } from '../../hooks/useAuthentication'
import style from './register.module.css'

import { useState, useEffect } from 'react'



const Register = () => {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const { createUser, error: authError, loading } = useAuthentication()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    const user = {
      displayName, email, password
    }

    if (password !== confirmPassword) {
      setError('As senhas precisam ser iguais!')
      return
    }

    const res = await createUser(user)

    console.log(res)
  }


  //tratando o erro de autenticação
  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])



  return (
    <div className={style.register}>
      <h1>Cadatre-se para Postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          <span>Nome:</span>
          <input
            type="text"
            name='displayName'
            required
            placeholder='Nome do Usuário'
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label htmlFor="">
          <span>E-mail:</span>
          <input
            type="email"
            name='email'
            required
            placeholder='E-mail do Usuário'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="">
          <span>senha:</span>
          <input
            type="password"
            name='password'
            required
            placeholder='Insira sua senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor="">
          <span>Confirmação de senha:</span>
          <input
            type="password"
            name='confirmPassword'
            required
            placeholder='Confirme a sua senha'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {!loading && <button className='btn'>Cadastrar</button>}
        {loading && <button className='btn'>Cadastrar...</button>}
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default Register