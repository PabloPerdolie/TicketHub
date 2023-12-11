import React from 'react'
import Header from '../../components/Header/Header'
import SearchHistory from '../../components/SearchHistory/SearchHistory'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import classes from './UserPage.module.css'
import Footer from '../../components/Footer/Footer';

const UserPage = () => {
  return (
    <>
      <Header/>
      <main className={classes.main}>
        <ProfileCard/>
        <SearchHistory/>
      </main>
      <Footer/>
    </>
  )
}

export default UserPage