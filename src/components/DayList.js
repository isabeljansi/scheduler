import React from "react";
import DayListItem from "./DayListItem";


export default function DayList(props){
  // console.log(" props", props)
  // const days = props.days
  const {days} = props
  const parsedDays = days.map(day => <DayListItem 
    key={day.id} 
    name={day.name} 
    setDay={(event) => props.setDay(day.name)} 
    spots={day.spots} 
    selected={day.name === props.value}
    />
  );

  return(
    <ul>
      {parsedDays}
    </ul>
  )
}