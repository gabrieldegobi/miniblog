import React from 'react'

import style from './NavBar.module.css'
import { NavLink } from 'react-router-dom'


const NavBar = () => {
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
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : '')}
            to={'/about'}>About</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar