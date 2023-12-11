import React from 'react'
import classes from './PlaneTicketCard.module.css'
import moment from 'moment'
import { MdFlightTakeoff, MdFlightLand } from 'react-icons/md';

const PlaneTicketCard = ({origin_airport, destination_airport, price, airline,
    flight_number, departure_at, return_at, transfers, return_transfers,
    duration, duration_to, duration_back, link, IATA, origin, destination
}) => {

    const dep_to = new Date(departure_at)
    const arr_to = moment(dep_to).add(duration_to, 'm').toDate()
    const arr_from = new Date(return_at)
    const dep_from = moment(arr_from).add(-duration_back, 'm').toDate()

    const weekdays = ["Вск", "Пн", "Вт", "Ср", "Чт","Пт", "Сб"]

    const leadZeroes = (num) => {
        return ("0" + num).slice(-2)
    }

    const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"]

  return (
    <div className={classes.card}>
        <div className={classes.info}>
            <div><img src={`http://pics.avs.io/200/30/${IATA}.png`}/></div>
            <div><h3>Стоимость: {price} &#8381;</h3></div>
            <a href={`https://aviasales.ru${link}`} target='_blank'>Оформить</a>
        </div>
        <div>
            <div className={classes.trip}>
                <div className={classes.date_time}>
                    <h3>{leadZeroes(dep_to.getHours())}:{leadZeroes(dep_to.getMinutes())}</h3>
                    <p>{origin}</p>
                    <p>{dep_to.getDate()} {months[dep_to.getMonth()]}, {weekdays[dep_to.getDay()]}</p>
                </div>
                <div className={classes.flight}>
                    <MdFlightTakeoff/>
                    <span>{Math.trunc(duration_to/60)}ч. {duration_to%60}мин.</span>
                    <MdFlightLand/>
                    <div className={classes.flight_line}></div>
                    <span>{origin_airport}</span>
                    <span>{destination_airport}</span>
                </div>
                <div className={classes.date_time}>
                    <h3>{(leadZeroes((arr_to.getHours())%24))}:{leadZeroes((arr_to.getMinutes())%60)}</h3>
                    <p>{destination}</p>
                    <p>{arr_to.getDate()} {months[arr_to.getMonth()]}, {weekdays[arr_to.getDay()]}</p>
                </div>
            </div>
            <hr />
            <div className={classes.trip}>
                <div className={classes.date_time}>
                    <h3>{leadZeroes(dep_from.getHours())}:{leadZeroes(dep_from.getMinutes())}</h3>
                    <p>{destination}</p>
                    <p>{dep_from.getDate()} {months[dep_from.getMonth()]}, {weekdays[dep_from.getDay()]}</p>
                </div>
                <div className={classes.flight}>
                    <MdFlightTakeoff/>
                    <span>{Math.trunc(duration_back/60)}ч. {duration_back%60}мин.</span>
                    <MdFlightLand/>
                    <div className={classes.flight_line}/>
                    <span>{destination_airport}</span>
                    <span>{origin_airport}</span>
                </div>
                <div className={classes.date_time}>
                    <h3>{(leadZeroes((arr_from.getHours())%24))}:{leadZeroes((arr_from.getMinutes())%60)}</h3>
                    <p>{origin}</p>
                    <p>{arr_from.getDate()} {months[arr_from.getMonth()]}, {weekdays[arr_from.getDay()]}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PlaneTicketCard