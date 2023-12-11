import React, { useState } from 'react'
import classes from './LogPage.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BiErrorCircle } from 'react-icons/bi'
import Cookies from 'universal-cookie'
import Footer from '../../components/Footer/Footer'

const LogPage = () => {

    const navigate = useNavigate()

    const cookie = new Cookies()

    const [inf, setInf] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState({
        visibility: false,
        message: ""
    })

    const action = async (event) => {
        event.preventDefault()
        if (inf.password.length > 7) {
            try {
                const data = await axios.post("http://localhost:8080/login", {
                    email: inf.email,
                    password: inf.password
                })
                navigate("/")
                cookie.set("token", data.data.token)
            } catch (e) {
                setInf({...inf, password: "", conf: ""})
                console.log(e.message)
            }
        }
        else {
            setInf({...inf, password: "", conf: ""})
            if (inf.password.length < 7) setError({visibility: true, message: "Длина пароля менее 8 символов"})
            setTimeout(() => setError({message: error.message, visibility: false}), 5000)
        }
    }
  return (
    <>  
        <div></div>
        <main className={classes.main}>
            <div style={{top: error.visibility ? "20px" : "-100%"}} className={classes.err_mes}>
                <span>
                    <BiErrorCircle/>
                </span>
                {error.message}
            </div>
            <div className={classes.reg}>
                <h1>Вход</h1>
                <form>
                    <label htmlFor="email">E-mail:</label>
                    <input type="email" name='email' required value={inf.email}
                        onChange={(event) => setInf({...inf, email: event.target.value})}/>
                    <label htmlFor="pass">Пароль:</label>
                    <input type="password" name='pass' required value={inf.password}
                        onChange={(event) => setInf({...inf, password: event.target.value})}/>
                    <button onClick={(event) => {action(event)}}>Войти</button>
                </form>
            </div>
            <div className={classes.navs}>
                <Link to='/'>&laquo; Вернуться на главную</Link>
                <Link to='/register'>Желаете зарегестрироваться?&raquo;</Link>
            </div>
        </main>
        <Footer/>
    </>
  )
}

export default LogPage