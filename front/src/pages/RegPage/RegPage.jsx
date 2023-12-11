import React, { useEffect, useRef, useState } from 'react'
import classes from './RegPage.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BiErrorCircle } from "react-icons/bi";
import Cookies from 'universal-cookie'
import Footer from '../../components/Footer/Footer';

const RegPage = () => {

    const navigate = useNavigate()

    const cookie = new Cookies()

    const [inf, setInf] = useState({
        username: "",
        email: "",
        password: "",
        conf: ""
    })

    const [error, setError] = useState({
        visibility: false,
        message: ""
    })

    const action = async (event) => {
        event.preventDefault()
        if (inf.password === inf.conf && inf.password.length > 7) {
            try {
                const data = await axios.post("http://localhost:8080/registration", {
                    username: inf.username,
                    email: inf.email,
                    password: inf.password
                })
                cookie.set("token", data.data.token)
                navigate("/")
            } catch (e) {
                if (e.code === "ERR_BAD_REQUEST") {
                    console.log(e.message) 
                    setInf({...inf, password: "", conf: ""})
                    setError({visibility: true, message: "Пользователь уже зарегестрирован"})
                    setTimeout(() => setError({message: error.message, visibility: false}), 5000)
                }
            }
        }
        else {
            setInf({...inf, password: "", conf: ""})
            if (inf.password.length < 7) setError({visibility: true, message: "Длина пароля менее 8 символов"})
            else if (inf.password !== inf.conf) setError({visibility: true, message: "Пароли не совпадают"})
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
                <h1>Регистрация</h1>
                <form>
                    <label htmlFor="usrname">Имя пользователя:</label>
                    <input type="text" name='usrname' required value={inf.username}
                        onChange={(event) => setInf({...inf, username: event.target.value})}/>
                    <label htmlFor="email">E-mail:</label>
                    <input type="email" name='email' required value={inf.email}
                        onChange={(event) => setInf({...inf, email: event.target.value})}/>
                    <label htmlFor="pass">Пароль:</label>
                    <input type="password" name='pass' required value={inf.password}
                        onChange={(event) => setInf({...inf, password: event.target.value})}/>
                    <label htmlFor="pass_confirm">Повторите пароль:</label>
                    <input value={inf.conf} type="password" name='pass_confirm' required
                        onChange={(event) => setInf({...inf, conf: event.target.value})}/>
                    <button onClick={(event) => {action(event)}}>Зарегестрироваться</button>
                </form>
            </div>
            <div className={classes.navs}>
                <Link to='/'>&laquo; Вернуться на главную</Link>
                <Link to='/login'>Уже есть аккаунт?&raquo;</Link>
            </div>
        </main>
        <Footer/>
    </>
  )
}

export default RegPage