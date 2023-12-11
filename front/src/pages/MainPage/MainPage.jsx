import React from 'react'
import classes from './MainPage.module.css'
import Header from '../../components/Header/Header'
import SearchBox from '../../components/SearchBox/SearchBox'
import TicketList from '../../components/TicketsList/TicketList'
import Footer from '../../components/Footer/Footer'

const MainPage = () => {

  return (
    <>
      <Header/>
      <main className={classes.main}>
          <h1>Зарезервируйте билет прямо сейчас</h1>
          <p>Ты думаешь, мы просто сервис резервирования билетов? Мы - мастера билетологии! :(</p>
          <SearchBox/>
          <TicketList/>
      </main>
      <Footer/>
    </>
  )
}

export default MainPage