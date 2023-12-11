import React, { useEffect, useState } from 'react'
import classes from './ProfileCard.module.css'
import { FaUserAlt } from "react-icons/fa";
import Cookies from 'universal-cookie';
import axios from 'axios';

const ProfileCard = () => {
    
    const cookie = new Cookies()

    const [data, setData] = useState({
        id: null,
        username: "",
        email: "",
        password: "",
        role: ""
    })

    const fetchUserInfo = async () => {
        const resp = await axios.get('http://localhost:8080/get_person',
        {
            headers: {
                "Authorization": "Bearer " + cookie.get("token")
            }
        })
        setData(resp.data)
    }

    useEffect(() => {
        fetchUserInfo()
    }, [])

    return (
    <div className={classes.profile}>
        <FaUserAlt/>
        <div className={classes.info}>
            <h2>{data.username}</h2>
            <p>E-mail: {data.email}</p>
        </div>
    </div>
  )
}

export default ProfileCard