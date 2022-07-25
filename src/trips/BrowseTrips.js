import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import TripSnippet from './TripSnippet';

export default function BrowseTrips(props) {
  const [trips, setTrips] = useState([]);
  const [currentTrip, setCurrentTrip] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    loadTripList()
  }, []);

  const loadTripList = () => {
    Axios.get("trip/index")
    .then((response) => {
      console.log("RESPONSE DATA FOR TRIP INDEX: ", response);
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

  const editView = (id) => {
    Axios.get(`trip/edit?id=${id}`)
    .then((response) => {
      console.log("Loaded trip information for editing", response.data.trip)
      var trip = response.data.trip
      setIsEdit(true)
      setCurrentTrip(trip)
    })
    .catch((error) => {
      console.log("Error loading trip information for editing")
      console.log(error)
    })
  }

  const editTrip = (trip) => {
    Axios.put("trip/update", trip)
    .then((response) => {
      console.log("Updated trip information")
    })
    .catch((error) => {
      console.log("Error updating trip information")
      console.log(error)
    })
  }

  const allTrips = trips.map((trip, index) => (
    <div key={index}>
      <TripSnippet {...trip} profileHandler={props.profileHandler} singleTrip={singleTrip} trip={currentTrip} trips={trips} user={props.user} currentUser={props.currentUser} setCurrentTrip={setCurrentTrip} currentTrip={currentTrip} editTrip={editTrip} />
    </div>
  ));

  return (
    <div>
      <h1>BROWSE TRIPS</h1>
      {allTrips}

    </div>
  )
} 
