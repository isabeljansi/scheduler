import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day }); //used to update DayList

  const updateSpots = (appointments) => {
    return state.days.map(day => {
      let spots = 0;
      for (let id of day.appointments) {
        if (!appointments[id].interview) {
          spots++;
        }
      }
      return {...day, spots};
    })
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      console.log(all);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    }).catch((error) => {})
  }, []);

  function bookInterview(id, interview) {
    console.log("id and interview from useapplicationdata: ", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments,
      days: updateSpots(appointments)
    });
    return axios.put(`/api/appointments/${id}`, {interview})
  }

  function cancelInterview(id){
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
 
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState({
        ...state,
        appointments,
        days: updateSpots(appointments)
      })
    })
  }

  return { state, setDay, bookInterview, cancelInterview };

}