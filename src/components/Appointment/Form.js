import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


export default function Form(props){
  console.log("props form:" ,props)

  const {interviewers, onSave, onCancel } = props;

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  console.log("name", student)

  //to reset the form
  const reset = function() {
    setStudent("");
    setInterviewer(null);
  };

  //cancel a form
  const cancel = function() {
    reset();
    onCancel();
  };

  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()} >
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            /*
              This must be a controlled component
              your code goes here
            */
            value={student} 
            onChange={(event) => setStudent(event.target.value)}

          />
        </form>
        <InterviewerList 
          /* your code goes here */

          interviewers={interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}

        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          
          <Button danger onClick={(event) => cancel()}>Cancel</Button>
          
          <Button danger onClick={() => onSave(student, interviewer)}>Save</Button>
          
        </section>
      </section>
    </main>
  )
}