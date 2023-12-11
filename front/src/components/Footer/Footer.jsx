import React, { useEffect, useRef, useState } from 'react'
import classes from './Footer.module.css'
import { FaGithub, FaTelegram, FaVk, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  
  const obs = useRef()
  const footer = useRef()

  const [footerReached, setFooterReached] = useState(false)

  useEffect(() => {
    const callback = function(entries, obs) {
      if (entries[0].isIntersecting) {
        setFooterReached(true)
      }
      else {
        setFooterReached(false)
      }
    }
    obs.current = new IntersectionObserver(callback)
    obs.current.observe(footer.current)
  }, [])

  return (
    <footer ref={footer} className={classes.footer}>
      <div className={classes.cont}>
        <div className={classes.contacts}>
          <a href=""><FaGithub/></a>
          <a href=""><FaTelegram/></a>
          <a href=""><FaVk/></a>
          <a href=""><FaInstagram/></a>
        </div>
        <div className={classes.policy}>
          &copy; 2023, TicketHub — сервис резервирования билетов для путешествий
        </div>
      </div>
    </footer>
  )
}

export default Footer