import React from "react"
import { ChangeEvent, useEffect, useState } from "react"
import logo from "./helveticar.png"
import "./App.css"
import LocChart from "../LocationChart/LocationChart"
import CarChart from "../CarChart/CarChart"


interface Trip {
  location: string
  car_id: string
  duration: string
}

interface CarInfo {
  car_id: string
  driver: string
}


function App() {
  const [loc, setLoc] = useState("")
  const [car_id, setId] = useState("")
  const [duration, setDur] = useState("")
  const [trips, setTrips] = useState([] as Trip[])

  const [driver, setDriver] = useState("")
  const [carinfos, setCarInfos] = useState([] as CarInfo[])

  function loadTrips() {
    fetch("/trips.json")
      .then((data) => data.json())
      .then((trips) => setTrips(trips))
  }
  useEffect(loadTrips, [])

  function loadCarInfos() {
    fetch("/carinfos.json")
      .then((data) => data.json())
      .then((carinfos) => setCarInfos(carinfos))
  }
  useEffect(loadCarInfos, [])

  function changeLocation(x: ChangeEvent<HTMLInputElement>) {
    setLoc(x.target.value)
  }

  function changeCarid(x: ChangeEvent<HTMLInputElement>) {
    setId(x.target.value)
  }

  function changeDuration(x: ChangeEvent<HTMLInputElement>) {
    setDur(x.target.value)
  }

  function submit(e: any) {
    e.preventDefault()
    let trip = { location: loc, car_id: car_id, duration: duration }
    setTrips([...trips, trip])
    setLoc("")
    setId("")
    setDur("")
  }

  function handleToggle(i: number) {
    // Functional Javascript
    setTrips(trips.map((t, j) => (j === i ? { ...t } : t)))
  }

  return (
    <body className='App-body'>
      <header className='App-header'>
        <img className='logo' src={logo} alt='logo' />
        elveticar
      </header>
      <h1>
        Hi there <span className='wave'>👋</span>, welcome to your dashboard
      </h1>
      <div className='wrapper'>
        <div className='left'>
        <h2>✔️ Here you find a list of recent trips</h2>
        <nav>
          <div>
            <ul>
              {trips.map((t, i) => {
                return (
                  <li key={i} onClick={() => handleToggle(i)}>
                    🆔 {t.car_id}: 📍{t.location}: ⌚{t.duration}
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>
          <h2>📍 Overview of trips by location</h2>
          <div className='chart'>
            <LocChart trips={trips} />
          </div>
          <form>
            🆔 Car Identification:{" "}
            <input type='text' onChange={changeCarid} value={car_id}></input>
            📍Location:{" "}
            <input type='text' onChange={changeLocation} value={loc}></input>
            ⌚ Duration:{" "}
            <input type='text' onChange={changeDuration} value={duration}></input>
            <input type='submit' value='Add Trip' onClick={submit}></input>
          </form>
        </div>
        <div className='right'>
        <h2>Here you find infromation about cars</h2>
        <nav>
          <div>
            <ul>
              {carinfos.map((t, i) => {
                return (
                  <li key={i} onClick={() => handleToggle(i)}>
                    🆔 {t.car_id}: 👤 {t.driver}
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>
          <h2>🚗 Overview of trips by car</h2>
          <div className='chart'>
            <CarChart trips={trips} />
          </div>
        </div>
      </div>
      <footer id='footer'>
        Created with <span className='wave'>❤️</span> in Lisbon by LMO, FSN & GS | 2615 -
        Web and Cloud Computing @ <a href='http://novasbe.pt/'>Nova SBE</a>
      </footer>
    </body>
  )
}

export default App
