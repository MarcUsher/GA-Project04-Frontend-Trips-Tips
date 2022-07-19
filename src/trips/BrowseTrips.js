import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import TripSnippet from './TripSnippet';
import TripDetail from './TripDetail';

export default function BrowseTrips() {
  const [trips, setTrips] = useState([]);
  const [currentTrip, setCurrentTrip] = useState("");

  useEffect(() => {
    loadTripList()
  }, []);

  const loadTripList = () => {
    Axios.get("trip/index")
    .then((response) => {
      console.log(response);
      setTrips(response.data.trips)
    })
    .catch((error) => {
      console.log(error)
    })
  };

  const singleTrip = (id) => {
    Axios.get(`trip/detail/${id}`)
    .then((response) => {
        console.log("Loaded Trip information")
        console.log(response.data.trip)

        var trip = response.data.trip
        setCurrentTrip(trip)
    })
    .catch((error) => {
      console.log("Error loading trip information")
      console.log(error)
  })
  }

  const allTrips = trips.map((trip, index) => (
    <div key={index}>
      <TripSnippet {...trip} singleTrip={singleTrip} trip={currentTrip} trips={trips}/>
      {/* <TripDetail {...trip}  singleTrip={singleTrip} trip={currentTrip} trips={trips} /> */}
    </div>
  ));


  return (
    <div>
      <h1>BROWSE TRIPS</h1>
      {allTrips}
    </div>
  )
}