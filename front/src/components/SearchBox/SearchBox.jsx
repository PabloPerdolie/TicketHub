import React, { useEffect, useState } from 'react'
import classes from './SearchBox.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { selectQuery, setQuery } from '../../redux/slices/query'
import { fetchBuses, fetchFlights, fetchTrains, setFlights, setTrains } from '../../redux/slices/routes'

const SearchBox = (props) => {

  const dispatch = useDispatch()
  const [vehicles, setVehicles] = useState([])

  const allVehicles = [fetchFlights, fetchTrains, fetchBuses]

  const addVehicle = (vehicle) => {
    if (vehicles.includes(vehicle)) {
      setVehicles(vehicles.filter(item => item !== vehicle))
    }
    else {
      setVehicles([...vehicles, vehicle])
    }
  }

  const origin = useRef()
  const destination = useRef()
  const departure_at = useRef()
  const return_at = useRef()

  const query = useSelector(selectQuery)

  const search = (event) => {
    event.preventDefault()
    if (query.origin !== origin.current.value ||
        query.destination !== destination.current.value ||
        query.departure_at !== departure_at.current.value ||
        query.return_at !== return_at.current.value ||
        !(query.vehicles.every(vehicle => vehicles.includes(vehicle)) &&
        vehicles.every(vehicle => query.vehicles.includes(vehicle)))
      ) {
        if (!vehicles.includes(fetchFlights)) {
          dispatch(setFlights([]))
        }
        if (!vehicles.includes(fetchTrains)) {
          dispatch(setTrains([]))
        }
        dispatch(setQuery({
          origin: origin.current.value,
          destination: destination.current.value,
          departure_at: departure_at.current.value,
          return_at: return_at.current.value,
          vehicles: vehicles
        }))
    }
  }


  useEffect(() => {
    if (query.vehicles.length > 0) {
      origin.current.value = query.origin
      destination.current.value = query.destination
      departure_at.current.value = query.departure_at
      return_at.current.value = query.return_at
      setVehicles(query.vehicles)
    }
  }, [query])
  

  return (
    <div className={classes.searchbox}>
      <div className={classes.vehicles}>
        <button style={{
          borderBottom: (vehicles.includes(fetchFlights) ? "5px solid #aa0000" : "5px solid white")
          }}
          onClick={() => {addVehicle(fetchFlights)}}
          >Самолеты</button>
        <button style={{
          borderBottom: (vehicles.includes(fetchTrains) ? "5px solid #aa0000" : "5px solid white")
          }}
          onClick={() => {addVehicle(fetchTrains)}}
          >Поезда</button>
      </div>
      <form className={classes.moveinf}>
        <input ref={origin} placeholder='Откуда' type='text'/>
        <input ref={destination} placeholder='Куда' type='text'/>
        <input ref={departure_at} type='date'/>
        <input ref={return_at} type='date'/>
        <button className={classes.send_query} onClick={(event) => {search(event)}}>Поиск</button>
      </form>
    </div>
  )
}

export default SearchBox