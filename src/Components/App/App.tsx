
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


  function loadTrips(){
    fetch("/trips", {
      method: "GET", headers: {
        'content-type': 'application/json;charset=UTF-8',
    },
    })
    .then((data) => data.json())
    .then((trips) => setTrips(trips))
  }

  useEffect(loadTrips, [])

  function createTrips(trip:Trip) {
    fetch("/trips", {
        method: "POST", headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(trip) })
    .then( data => console.log(data) )
}

function createCarInfos(carinfo:CarInfo) {
  fetch("/carinfos", {
      method: "POST", headers: {
          'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(carinfo) })
  .then( data => console.log(data) )
}

function loadCarInfos(){
  fetch("/carinfos", {
    method: "GET", headers: { 
      "content-type": "application/json;chartset=UTF-8"
    }
  })
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

  function changeDriver(x: ChangeEvent<HTMLInputElement>) {
    setDriver(x.target.value)
  }


  function updateCar(carinfo:CarInfo) {
    fetch("/carinfos/" +carinfo.car_id, {
        method: "PUT", headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({driver:carinfo.driver})
    })
    .then(data => console.log(data))
}

  function submitTrip(e: any) {
    e.preventDefault()
    let trip = { location: loc, car_id: car_id, duration: duration }
    setTrips([...trips, trip])
    createTrips(trip)
    setLoc("")
    setId("")
    setDur("")
  } 

  function submitCar(e: any) {
    e.preventDefault()
    let carinfo = {car_id: car_id, driver: driver }
    let exist = existsCarInfoById(carinfo.car_id)
    if(exist) {
    updateCar(carinfo)
    loadCarInfos()
    } else {
      setCarInfos([...carinfos, carinfo])
      createCarInfos(carinfo)
    }
    setId("")
    setDriver("")
  }

  function existsCarInfoById(id:string): Boolean {
    let value = false;
    carinfos.forEach((carinfo: CarInfo)=>{
        if (carinfo.car_id === id) {
            value = true;
        }
    })
    return value;
}

  return (
    <body className='App-body'>
      <header className='App-header'>
        <img className='logo' src={logo} alt='logo' />
    elveticar
  </header>
      <h1>
        Hi there <span className='wave'>????</span>, welcome to your dashboard
    </h1>


      <div className='wrapper'>
        <div className="wrapper">
          <div className="left">
            <h2>???? Overview of trips by location</h2>
            <div className='chart'>  <LocChart trips={trips} />  </div>
          </div>
          <div className="right">
            <h2>???? Overview of trips by car</h2>
            <div className='chart'> <CarChart trips={trips} /> </div>
          </div>
        </div>


        <div className='left'>
          <form>
            <input type='text' onChange={changeCarid} value={car_id}  ></input>
    ???? Car Identification{" "}
            <br></br>
            <input type='text' onChange={changeLocation} value={loc} ></input>
    ????Location{" "}
            <br></br>
            <input type='text' onChange={changeDuration} value={duration}></input>
    ??? Duration{" "}
            <br></br>
            <input type='submit' value='Add Trip' onClick={submitTrip}></input>
          </form>


          <h2>?????? Here you find a list of recent trips</h2>
          <nav>
            <div>
              <ul>
                {trips.map((t, i) => {
                  return (
                    <li>
                      ???? {t.car_id}: ????{t.location}: ???{t.duration}
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>
        </div>


        <div className='right'>
          <form>
            <input type='text' onChange={changeCarid} value={car_id}></input>
      ???? Car Identification{" "}
            <br></br>
            <input type='text' onChange={changeDriver} value={driver}></input>
      ???? Driver{" "}
            <br></br>
            <input type='submit' onClick={submitCar}></input>
          </form>

          <br></br>
          <h2>Here you find information about cars and drivers</h2>
          <nav>
            <div>
              <ul>
                {carinfos.map((t, i) => {
                  return (
                    <li>
                      ???? {t.car_id}: ???? {t.driver}
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>

        </div>
      </div>
      <footer id='footer' className='left'>
        Created with <span className='wave'>??????</span> in Lisbon by LMO, FSN & GS | 2615 -
  Web and Cloud Computing @ <a href='http://novasbe.pt/'>Nova SBE</a>
      </footer>
    </body>
  )
}

export default App
