import React, { useEffect, useState } from 'react'
import classes from './Header.module.css'
import { FaUserAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Cookie from 'universal-cookie'

const Header = () => {
  
  const cookie = new Cookie()

  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    if (cookie.get("token")) setAuthed(true)
    else setAuthed(false)
  }, [cookie.get("token")])

  return (
    <header className={classes.header}>
        <Link to='/'><h2>TicketHub</h2></Link>
        <div className={classes.acc}>
            <span>
                <FaUserAlt/>
            </span>
            {!authed
            ?  <span>
                <Link to='/login'>Вход</Link>
                <Link to='/register'>Регистрация</Link>
              </span>
            : <span>
                <Link to='/account'>Профиль</Link>
                <span onClick={() => {
                  cookie.remove("token")
                  setAuthed(false)
                }}><Link to='/login'>Выйти</Link></span>
              </span>
            }
        </div>
    </header>
  )
}

export default Header