import axios from 'axios'
import React, { useEffect } from 'react'
import classes from './TicketList.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectQuery } from '../../redux/slices/query'
import { selectRoutes } from '../../redux/slices/routes'
import PlaneTicketCard from '../TicketCard/PlaneTicket/PlaneTicketCard'
import TrainTicketCard from '../TicketCard/TrainTicket/TrainTicketCard'

const TicketList = () => {

    const query = useSelector(selectQuery)

    const data = useSelector(selectRoutes)

    const dispatch = useDispatch()

    useEffect(() => {
        query.vehicles.forEach((vehicle) => {
            dispatch(vehicle({
                origin: query.origin,
                destination: query.destination,
                departure_at: query.departure_at,
                return_at: query.return_at
            }))
        })
        console.log(query)
    }, [query])

  return (
    <>
        {data.flights.length > 0 || data.trains.length > 0
        ? <div className={classes.tickets}>
            {data.flights.map((ticket, index) =>
                <PlaneTicketCard key={index} 
                    origin_airport={ticket.origin_airport}
                    destination_airport={ticket.destination_airport}
                    price={ticket.price} 
                    airline={ticket.airline}
                    flight_number={ticket.flight_number} 
                    departure_at={ticket.departure_at}
                    return_at={ticket.return_at} 
                    transfers={ticket.transfers}
                    return_transfers={ticket.return_transfers} 
                    duration={ticket.duration}
                    duration_to={ticket.duration_to} 
                    duration_back={ticket.duration_back}
                    link={ticket.link}
                    IATA={ticket.IATA} 
                    origin={query.origin}
                    destination={query.destination}/>)}
            {data.trains.map((dep, index1) => dep.map((ticket, index2) =>
                <TrainTicketCard key={index1 * 1000 + index2}
                    route_num={ticket.thread.number}
                    route_title={ticket.thread.title}
                    logo={ticket.thread.logo}
                    carrier={ticket.thread.carrier}
                    origin={ticket.from.title}
                    destination={ticket.to.title}
                    sec_duration={ticket.duration}
                    departure={ticket.departure}
                    arrival={ticket.arrival}
                    dep_code={ticket.from.code}
                    arr_code={ticket.to.code}
                />)
            )}
        </div>
        :   <div></div>
        }
    </>
  )
}

export default TicketList