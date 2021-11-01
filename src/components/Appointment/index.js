import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

import useVisualMode from "hooks/useVisualMode";

import './styles.scss';




export default function Appointment(props){

  const { time, interview } = props

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  // Set the interviewers prop to an empty array. We will implement this properly in a future activity.
  const interviewers = [];

const { mode, transition, back } = useVisualMode(
  interview ? SHOW : EMPTY
);

  return(
    <article className="appointment">
      <Header time={time}
      /> 

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (<Show student={interview.student} interviewer={interview.interviewer }/>)}
      {mode === CREATE && (<Form interviewers={interviewers} onCancel={back}/>)}

      {/* {interview ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty /> } */}
      
    </article>

  
  )
}


//  {/* // <Show />  <Empty /> */
//   {time ? `Appointment at ${time}` : "No Appointments" }  }
 

