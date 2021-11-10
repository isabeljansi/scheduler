import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";

import './styles.scss';

export default function Appointment(props){

  const { id, time, interview, interviewers, bookInterview, student, cancelInterview} = props

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true))
  }

  function cancel() {
    transition(DELETING, true);
    cancelInterview(id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true))
  }

  return(
    <article className="appointment">
      <Header time={time}
      /> 
      {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)} />)}
      {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => transition(CONFIRM)} onEdit={() => transition(EDIT)} />)}
      {mode === CREATE && (<Form interviewers={interviewers} onSave={save} onCancel={back}/>)}
      {mode === SAVING && (<Status message="Saving" />)}
      {mode === DELETING && (<Status message="Deleting" />)}
      {mode === CONFIRM && (<Confirm message="Are you sure?" onCancel={back} onConfirm={cancel} />)}
      {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onCancel={() => transition(SHOW)} onSave={save} />}
      {mode === ERROR_SAVE && <Error message="Error saving" onClose={back}/>}
      {mode === ERROR_DELETE && <Error message= 'Error deleting' onClose={() => transition(SHOW)}/>}
    </article>

  
  )
}