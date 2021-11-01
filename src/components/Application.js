import React, {useState, useEffect }from "react";

import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";

import InterviewerListItem from "./InterviewerListItem";

import 'components/Appointment';
import Appointment from "components/Appointment";

import { getAppointmentsForDay, getInterview } from "helpers/selectors";



export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day }); //used to update DayList

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
    });
  }, []);

  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

  // const parsedAppointments = appointments.map(appointment => <Appointment 
  //   key={appointment.id} 
  //   id={appointment.id} 
  //   time={appointment.time} 
  //   interview={appointment.interview} 
  // />
  // )

  return (
    <main className="layout">
      <section className="sidebar">
      <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList 
          days={state.days} 
          value={state.day} 
          // onChange={state.setDay} 
          setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        
        <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}
