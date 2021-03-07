import React from "react"
import { ChangeEvent, useEffect, useState } from "react"
import logo from "./helveticar.png"
import "./App.css"
import Map from "../Map/Map.js"
import Chart from "../Chart/Chart"


interface Trip {
  location: string
  car_id: string
}


function App() {
  const [loc, setLoc] = useState("")
  const [car_id, setId] = useState("")
  const [trips, setTrips] = useState([] as Trip[])

  function loadTrips() {
    fetch("/trips.json")
      .then((data) => data.json())
      .then((trips) => setTrips(trips))
  }
  useEffect(loadTrips, [])

  function changeLocation(x: ChangeEvent<HTMLInputElement>) {
    setLoc(x.target.value)
  }

  function changeCarid(x: ChangeEvent<HTMLInputElement>) {
    setId(x.target.value)
  }

  function submit(e: any) {
    e.preventDefault()
    let trip = { location: loc, car_id: car_id }
    setTrips([...trips, trip])
    setLoc("")
    setId("")
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
      <h2>✔️ Here you find a list of recent trips</h2>
      <nav>
        <div>
          <ul>
            {trips.map((t, i) => {
              return (
                <li key={i} onClick={() => handleToggle(i)}>
                  🆔 {t.car_id}: 📍{t.location}
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
      <div className='wrapper'>
        <div className='left'>
          <h2>🗺️ Map</h2>
          <div className='map'>
            <Map />
          </div>
        </div>
        <div className='right'>
          <h2>📊 Overview of trips</h2>
          <div className='chart'>
            <Chart trips={trips} />
          </div>
          <form>
            🆔 Car Identification:{" "}
            <input type='text' onChange={changeCarid} value={car_id}></input>
            📍Location:{" "}
            <input type='text' onChange={changeLocation} value={loc}></input>
            <input type='submit' value='Add Trip' onClick={submit}></input>
          </form>
        </div>
      </div>
      <footer id='footer'>
        Created with <span className='wave'>❤️</span> in Lisbon by LMO | 2615 -
        Web and Cloud Computing @ <a href='http://novasbe.pt/'>Nova SBE</a>
      </footer>
    </body>
  )
}

export default App
