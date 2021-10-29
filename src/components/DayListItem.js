import React from "react";

import "components/DayListItem.scss"

import classNames from "classnames";

export default function DayListItem(props) {

  // console.log("props daylistitem", props)
  // const setDay = () => {
  //   props.setDay(props.name);
  // }

  const formatSpots = function(spots){
    if(spots === 0) {
      return 'no spots remaining';
    }
    else if(spots === 1){
      return `${spots} spot remaining`;
    }
    else{
      return `${spots} spots remaining`;
    }
  }

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected ": props.selected,
    "day-list__item--full": props.spots === 0
  })

 
  return (
    <li 
      className={dayClass}
      onClick={props.setDay}
      selected={props.selected}
    >
    <h2 className="text--regular">{props.name}</h2>
    <h3 className="text--light">{formatSpots(props.spots)} </h3>
    {/* {props.children} */}
    </li>
  );
}





