import React from 'react'
import classes from './TrainTicketCard.module.css'
import { TbTrain } from 'react-icons/tb'

const TrainTicketCard = ({route_num, route_title, origin, logo, carrier,
    destination, sec_duration, departure, arrival, dep_code, arr_code
}) => {

    const dep = new Date(departure)
    const arr = new Date(arrival)

    const weekdays = ["Вск", "Пн", "Вт", "Ср", "Чт","Пт", "Сб"]

    const leadZeroes = (num) => {
        return ("0" + num).slice(-2)
    }

    const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"]

  return (
    <div className={classes.card}>
        <div className={classes.info}>
            <img src="https://yastat.net/s3/rasp/media/data/company/logo/logo.gif" height="30px"/>
            <a href={`https://rzd.ru`} target='_blank'>Оформить</a>
        </div>
        <div>
            <div className={classes.trip}>
                <div className={classes.date_time}>
                    <h3>{leadZeroes(dep.getHours())}:{leadZeroes(dep.getMinutes())}</h3>
                    <p>{origin}</p>
                    <p>{dep.getDate()} {months[dep.getMonth()]}, {weekdays[dep.getDay()]}</p>
                </div>
                <div className={classes.thread}>
                    {route_num} {route_title}
                </div>
                <div className={classes.ride}>
                    <TbTrain/>
                    <span>{Math.trunc(sec_duration/3600)}ч. {sec_duration/60%60}мин.</span>
                    <TbTrain/>
                    <div className={classes.flight_line}></div>
                    <div>{dep_code}</div>
                    <div>{arr_code}</div>
                </div>
                <div className={classes.date_time}>
                    <h3>{(leadZeroes(arr.getHours()))}:{leadZeroes(arr.getMinutes())}</h3>
                    <p>{destination}</p>
                    <p>{arr.getDate()} {months[arr.getMonth()]}, {weekdays[arr.getDay()]}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TrainTicketCard