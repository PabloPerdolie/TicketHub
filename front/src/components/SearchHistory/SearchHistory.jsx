import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFlightsHist, fetchTrainsHist, selectHist } from '../../redux/slices/searchHist'
import classes from './SearchHistory.module.css'
import {Link, NavLink} from 'react-router-dom'
import { fetchFlights, fetchTrains, fetchBuses } from '../../redux/slices/routes'
import { setQuery } from '../../redux/slices/query'

const SearchHistory = () => {

  const dispatch = useDispatch()

  const checkAvailable = (trip) => {
    const now = new Date()
    const dep = new Date(trip.departure_at)

    console.log()

    if (now < dep) return <Link to="/"
      onClick={() => {
        dispatch(setQuery({
          origin: trip.origin,
          destination: trip.destination,
          departure_at: trip.departure_at,
          return_at: trip.return_at,
          vehicles: [fetchFlights, fetchTrains, fetchBuses]
      }))}}>Найти</Link>

    else return <div style={{color: "rgb(153, 153, 153)"}}>Недоступно</div>
  }

  useEffect(() => {
    dispatch(fetchFlightsHist())
    dispatch(fetchTrainsHist())
  }, [])

  const hist = useSelector(selectHist)

  return (
    <div className={classes.wrap}>
      <div className={classes.histList}>
        <div className={classes.item}>
          <div>#</div>
          <div>Откуда</div>
          <div>Куда</div>
          <div>Отправление</div>
          <div>Прибытие</div>
          <div>Ссылка</div>
        </div>
        {hist.flights.map((route, index) => 
          <div key={index} className={classes.item}>
            <div>{route.id}</div>
            <div>{route.origin}</div>
            <div>{route.destination}</div>
            <div>{route.departure_at}</div>
            <div>{route.return_at}</div>
            {checkAvailable(route)}
          </div>)}
        {hist.trains.map((route, index) => 
          <div key={index} className={classes.item}>
            <div>{route.id}</div>
            <div>{route.origin}</div>
            <div>{route.destination}</div>
            <div>{route.departure_at}</div>
            <div>{route.return_at}</div>
            {checkAvailable(route)}
          </div>)}
      </div>
    </div>
  )
}

export default SearchHistory