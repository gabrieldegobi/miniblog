import React from 'react'

import style from './NavBar.module.css'
import { NavLink } from 'react-router-dom'

import { useAuthentication } from '../../hooks/useAuthentication'

import { useAuthValue } from '../../context/AuthContext'

const NavBar = () => {

  const { user } = useAuthValue()
  const { logout } = useAuthentication()


  return (
    <nav className={style.navbar}>
      <NavLink className={style.brand} to={'/'}>
        Mini <span>Blog</span>
      </NavLink>
      <ul className={style.links_list}>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : '')}
            to={'/'}>Home</NavLink>
        </li>


        {!user && (
          <>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? style.active : '')}
                to={'/login'}>Login</NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? style.active : '')}
                to={'/register'}>Register</NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? style.active : '')}
                to={'/posts/create'}>Novo Post</NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? style.active : '')}
                to={'/dashboard'}>Dashboard</NavLink>
            </li>
          </>
        )}


        <li>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : '')}
            to={'/about'}>About</NavLink>
        </li>
        {user && (
          <li>
            <button onClick={logout}>Sair</button>
          </li>
        )}

      </ul>

    </nav>
  )
}

export default NavBar