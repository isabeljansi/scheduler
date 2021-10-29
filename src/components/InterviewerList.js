import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import 'components/InterviewerList.scss'


export default function InterviewerList(props){
 
  console.log("props interviewerlist: ",props);
  const {interviewers, interviewer, setInterviewer} = props


  
  const parsedInterviewers = interviewers.map(item => <InterviewerListItem 
    key={item.id} 
    // id={interviewer.id}
    avatar={item.avatar}
    name={item.name} 
    setInterviewer={(event) => setInterviewer(item.id)}
    selected={item.id === interviewer}
    />
  );

  

  return(

    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      
          <ul className="interviewers__list">
            {parsedInterviewers}
          </ul>
  
    </section>



  )
}